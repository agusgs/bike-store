class CustomizationSerializer
  def initialize(customizations)
    @customizations = customizations.eager_load(dependant_customizations: :child)
  end

  attr_reader :customizations, :prefix

  def serialize
    customizations.map do |customization|
      {
        id: customization.id,
        token: Random.uuid,
        name: customization.name,
        option_type: customization.option_type,
        price: customization.price_in_cents,
        customizations: CustomizationSerializer.new(customization.children).serialize
      }
    end
  end
end