require "test_helper"

class OrderCustomizedAreaTest < ActiveSupport::TestCase
  test "total is 0 if no customizations present" do
    assert_equal 0, order_customized_areas(:without_customizations).total
  end

  test "total is the sum of customizations" do
    customized_area = order_customized_areas(:one)
    assert_equal customized_area.order_customizations.map(&:total).sum, customized_area.total
  end
end
