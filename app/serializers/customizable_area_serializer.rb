class CustomizableAreaSerializer
  def initialize(customizable_areas)
    @customizable_areas = customizable_areas.eager_load(available_customizations: :customization)
  end

  attr_reader :customizable_areas

  def serialize
    customizable_areas.map do |customizable_area|
      {
        id: customizable_area.id,
        token: Random.uuid,
        name: customizable_area.name,
        customizations: CustomizationSerializer.new(customizable_area.customizations).serialize
      }
    end
  end
end