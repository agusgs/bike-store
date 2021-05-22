class ProductSerializer
  attr_reader :products

  def self.serialize(products)
    if products.is_a?(Array) || products.is_a?(ActiveRecord::Relation)
      new(products).serialize
    else
      new([products]).serialize[0]
    end
  end

  def initialize(products)
    @products = products
  end

  def serialize
    products.map do |product|
      {
        id: product.id,
        name: product.name,
        price: product.price_in_cents,
        available: product.available
      }
    end
  end
end