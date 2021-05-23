require "test_helper"

class ProductSerializerTest < ActiveSupport::TestCase
  test "serializes correctly with deep flag off" do
    products = Product.all
    serialized_products = ProductSerializer.serialize(products)

    serialized_products.each do |serialized|
      product = products.find(serialized[:id])
      assert_equal serialized[:id], product.id
      assert_equal serialized[:name], product.name
      assert_equal serialized[:price], product.price_in_cents
      assert_equal serialized[:available], product.available
      assert serialized[:customizable_areas].nil?
    end
  end

  test "serializes correctly with deep flag on" do
    products = Product.all
    serialized_products = ProductSerializer.serialize(products, deep: true)

    serialized_products.each do |serialized|
      product = products.find(serialized[:id])
      assert_equal serialized[:id], product.id
      assert_equal serialized[:name], product.name
      assert_equal serialized[:price], product.price_in_cents
      assert_equal serialized[:available], product.available
      assert_not serialized[:customizable_areas].nil?
      assert_equal serialized[:customizable_areas], CustomizableAreaSerializer.serialize(product.customizable_areas, deep: true)
    end
  end
end
