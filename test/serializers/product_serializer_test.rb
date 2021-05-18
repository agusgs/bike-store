require "test_helper"

class ProductSerializerTest < ActiveSupport::TestCase
  test "serializes the products areas correctly" do
    products = Product.all
    serialized_products = ProductSerializer.new(products).serialize

    serialized_products.each do |serialized|
      product = products.find(serialized[:id])
      assert_equal serialized[:id], product.id
      assert_equal serialized[:name], product.name
      assert_equal serialized[:price], product.price_in_cents
    end
  end
end
