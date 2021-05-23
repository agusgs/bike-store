class OrderCustomizedAreaSerializer
  attr_reader :order_customized_areas, :deep

  def self.serialize(order_customized_areas, deep = false)
    new(order_customized_areas, deep).serialize
  end

  def initialize(order_customized_areas, deep)
    @order_customized_areas = order_customized_areas
    @deep = deep
  end

  def serialize
    order_customized_areas.map do |order_customized_area|
      serialized = {
        id: order_customized_area.id,
        customizable_area: CustomizableAreaSerializer.serialize(order_customized_area.customizable_area)
      }

      if deep
        serialized[:order_customizations] = OrderCustomizationSerializer.serialize(order_customized_area.order_customizations, deep: deep)
      end

      serialized
    end
  end
end