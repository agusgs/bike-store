require "test_helper"

class OrderCustomizationTest < ActiveSupport::TestCase
  test "total is the price of the customization if there is no children" do
    order_customization = order_customizations(:three)
    assert_equal order_customization.customization.price_in_cents, order_customization.total
  end
  test "total is the price of the customization plus the price of the children" do
    order_customization = order_customizations(:three)
    expected_price = order_customization.customization.price_in_cents + order_customization.children.map(&:total).sum
    assert_equal expected_price, order_customization.total
  end
end
