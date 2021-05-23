class CustomizationSerializer
  def self.serialize(customizations, deep = false)
    if customizations.is_a?(Array) || customizations.is_a?(ActiveRecord::Relation)
      new(customizations.eager_load(customizations: :customizations), deep).serialize
    else
      new([customizations], deep).serialize.first
    end

  end

  def initialize(customizations, deep)
    @customizations = customizations
    @deep = deep
  end

  attr_reader :customizations, :deep

  def serialize
    customizations.map do |customization|
      serialized = {
        id: customization.id,
        token: customization.id,
        name: customization.name,
        option_type: customization.option_type,
        price: customization.price_in_cents,
      }
      if deep
        serialized[:customizations] = CustomizationSerializer.serialize(customization.customizations, deep)
      end
      serialized
    end
  end
end