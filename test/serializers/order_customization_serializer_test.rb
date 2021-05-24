require "test_helper"

class OrderCustomizationSerializerTest < ActiveSupport::TestCase
  test "serializes correctly with deep flag off" do
    Random.stub :uuid, "asd" do
      OrderCustomizationSerializer.serialize(OrderCustomization.all).each do |serialized|
        order_customized_area = OrderCustomization.find(serialized[:id])

        assert_equal serialized[:id], order_customized_area.id
        assert_equal serialized[:customization], CustomizationSerializer.serialize(order_customized_area.customization)
        assert_nil serialized[:customizations]
      end
    end
  end

  test "serializes correctly with deep flag on" do
    Random.stub :uuid, "asd" do
      OrderCustomizationSerializer.serialize(OrderCustomization.all, deep: true).each do |serialized|
        order_customized_area = OrderCustomization.find(serialized[:id])

        assert_equal serialized[:id], order_customized_area.id
        assert_equal serialized[:customization], CustomizationSerializer.serialize(order_customized_area.customization)
        assert_equal serialized[:customizations], OrderCustomizedAreaSerializer.serialize(order_customized_area.children, deep: true)
      end
    end
  end
end
