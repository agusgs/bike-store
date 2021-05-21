class OrderCreator

  attr_reader :order_request

  def initialize(order_request)
    @order_request = order_request
  end

  def execute
    ActiveRecord::Base.transaction do
      product = Product.find_by!(id: order_request[:product_id], available: true)
      order = Order.new(
        product: product,
        client_name: order_request[:client_data][:client_name],
        client_lastname: order_request[:client_data][:client_lastname],
        client_email: order_request[:client_data][:client_email],
        status: Order::PLACED
      )
      order.order_customized_areas = customized_areas(order_request[:selected_customizations], product, order)
      order.save!
      order
    end
  end

  private
  def sub_customizations(parent, customization_request, &block)
    selected_sub_customizations = customization_request[:selected_customizations]
    if selected_sub_customizations.present?
      selected_sub_customizations.map do |selected_sub_customization|
        customization = block.call(selected_sub_customization[:id])
        order_customization = OrderCustomization.new(
          parent: parent,
          customization: customization,
        )
        order_customization.children = sub_customizations(order_customization, selected_sub_customization) { |id| customization.children.find(id) }
        order_customization.save!
        order_customization
      end
    else
      []
    end
  end

  def customized_areas(selected_customizations, product, order)
    if selected_customizations
      selected_customizations.map do |selected_customization|
        customizable_area = product.customizable_areas.find(selected_customization[:id])
        order_customized_area = OrderCustomizedArea.new(customizable_area: customizable_area, order: order)
        order_customized_area.order_customizations = sub_customizations(nil, selected_customization) { |id| customizable_area.customizations.find(id) }
        order_customized_area.save!
        order_customized_area
      end
    else
      []
    end
  end
end
