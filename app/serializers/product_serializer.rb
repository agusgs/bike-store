class ProductSerializer
  attr_reader :products

  def initialize(products)
    @products = products
  end

  def serialize
    products.map do |product|
      {
        id: product.id,
        name: product.name,
        price: product.price_in_cents
      }
    end
  end
end