require "test_helper"
require 'minitest/autorun'

class OrderTest < ActiveSupport::TestCase
  test "the total is the product price if there is no customizations" do
    order = orders(:without_customizations)
    assert_equal order.total, order.product.price_in_cents
  end

  test "the total is the sum of the customizations plus the product price" do
    order = orders(:with_one_customization)
    product_price = order.product.price_in_cents

    assert_equal order.total, product_price + order.order_customized_areas.map(&:total).sum
  end
end
