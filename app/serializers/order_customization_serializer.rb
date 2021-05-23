class OrderCustomizationSerializer
  attr_reader :order_customizations, :deep

  def self.serialize(order_customizations, deep=false)
    new(order_customizations, deep).serialize
  end

  def initialize(order_customizations, deep)
    @order_customizations = order_customizations
    @deep = deep
  end

  def serialize
    order_customizations.map do |order_customization|
      serialized = {
        id: order_customization.id,
        customization: CustomizationSerializer.serialize(order_customization.customization),
      }
      if deep
        serialized[:customizations] = OrderCustomizationSerializer.serialize(order_customization.children, deep: deep)
      end

      serialized
    end
  end
end