class OrderCustomizationSerializer
  attr_reader :order_customizations

  def self.serialize(order_customizations)
    new(order_customizations).serialize
  end

  def initialize(order_customizations)
    @order_customizations = order_customizations
  end

  def serialize
    order_customizations.map do |order_customization|
      {
        id: order_customization.id,
        customization: {
          id: order_customization.customization.id,
          name: order_customization.customization.name,
          price: order_customization.customization.price_in_cents,
        },
        customizations: OrderCustomizationSerializer.serialize(order_customization.children)
      }
    end
  end
end