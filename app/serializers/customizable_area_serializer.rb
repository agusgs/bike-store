class CustomizableAreaSerializer
  def self.serialize(customizable_areas, deep=false)
    if customizable_areas.is_a?(ActiveRecord::Relation)
      new(customizable_areas.eager_load(available_customizations: :customization), deep).serialize
    else
      new([customizable_areas], deep).serialize.first
    end
  end

  def initialize(customizable_areas, deep)
    @customizable_areas = customizable_areas
    @deep = deep
  end

  attr_reader :customizable_areas, :deep

  def serialize
    customizable_areas.map do |customizable_area|
      serialized = {
        id: customizable_area.id,
        token: customizable_area.id,
        name: customizable_area.name,
      }

      if deep
        serialized[:customizations] = CustomizationSerializer.serialize(customizable_area.customizations, deep: deep)
      end

      serialized
    end
  end
end