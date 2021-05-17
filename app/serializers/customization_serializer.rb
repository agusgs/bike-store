class CustomizationSerializer
  def initialize(customizations)
    @customizations = customizations.preload(:children)
  end
  attr_reader :customizations, :prefix

  def serialize
    customizations.map do |customization|
      {
        id: customization.id,
        token: Random.uuid,
        name: customization.name,
        option_type: customization.option_type,
        customizations: CustomizationSerializer.new(customization.children).serialize
      }
    end
  end
end