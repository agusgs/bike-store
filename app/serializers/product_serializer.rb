class ProductSerializer
  attr_reader :products, :deep

  def self.serialize(products, deep=false)
    if products.is_a?(Array) || products.is_a?(ActiveRecord::Relation)
      new(products, deep).serialize
    else
      new([products], deep).serialize.first
    end
  end

  def initialize(products, deep)
    @products = products
    @deep = deep
  end

  def serialize
    products.map do |product|
      mapped = {
        id: product.id,
        name: product.name,
        price: product.price_in_cents,
        available: product.available
      }

      if deep
        mapped[:customizable_areas] = CustomizableAreaSerializer.serialize(product.customizable_areas, deep)
      end

      mapped
    end
  end
end