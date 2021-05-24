require "test_helper"

class OrderCustomizedAreaSerializerTest < ActiveSupport::TestCase
  test "serializes correctly with deep flag off" do
    Random.stub :uuid, "asd" do
      OrderCustomizedAreaSerializer.serialize(OrderCustomizedArea.all).each do |serialized|
        order_customized_area = OrderCustomizedArea.find(serialized[:id])

        assert_equal serialized[:id], order_customized_area.id
        assert_equal serialized[:customizable_area], CustomizableAreaSerializer.serialize(order_customized_area.customizable_area)
        assert_nil serialized[:order_customizations]
      end
    end
  end

  test "serializes correctly with deep flag on" do
    Random.stub :uuid, "asd" do
      OrderCustomizedAreaSerializer.serialize(OrderCustomizedArea.all, deep: true).each do |serialized|
        order_customized_area = OrderCustomizedArea.find(serialized[:id])

        assert_equal serialized[:id], order_customized_area.id
        assert_equal serialized[:customizable_area], CustomizableAreaSerializer.serialize(order_customized_area.customizable_area)
        assert_equal serialized[:order_customizations], OrderCustomizationSerializer.serialize(order_customized_area.order_customizations, deep: true)
      end
    end
  end
end
