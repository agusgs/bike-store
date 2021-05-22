class OrderCreator

  attr_reader :order_request

  def initialize(order_request)
    @order_request = order_request.permit!
  end

  def execute
    ActiveRecord::Base.transaction do
      product = Product.find_by!(id: order_request.require(:product_id), available: true)
      client_data = order_request.require(:client_data)
      order = Order.new(
        product: product,
        client_name: client_data.require(:client_name),
        client_lastname: client_data.require(:client_lastname),
        client_email: client_data.require(:client_email),
        status: Order::PLACED
      )
      order.order_customized_areas = customized_areas(order_request[:selected_customizations], product, order)
      order.save!
      order
    end
  end

  private
  def sub_customizations(parent, customization_request, &find_customization)
    selected_sub_customizations = customization_request[:selected_customizations]
    if selected_sub_customizations.present?
      selected_sub_customizations.map do |selected_sub_customization|
        customization = find_customization.call(selected_sub_customization.require(:id))
        order_customization = OrderCustomization.new(
          parent: parent,
          customization: customization,
        )
        order_customization.children = sub_customizations(order_customization, selected_sub_customization) { |id| customization.customizations.find(id) }
        order_customization
      end
    else
      []
    end
  end

  def customized_areas(selected_customizations, product, order)
    if selected_customizations
      selected_customizations.map do |selected_customization|
        customizable_area = product.customizable_areas.find(selected_customization.require(:id))

        order_customized_area = OrderCustomizedArea.new(customizable_area: customizable_area, order: order)
        order_customized_area.order_customizations = sub_customizations(nil, selected_customization) { |id| customizable_area.customizations.find(id) }
        order_customized_area
      end
    else
      []
    end
  end
end
