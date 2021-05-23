require "test_helper"

class CustomizableAreaSerializerTest < ActiveSupport::TestCase
  test "serializes correctly with deep flag off" do
    CustomizableAreaSerializer.serialize(CustomizableArea.all).each do |serialized|
      customizable_area = CustomizableArea.find(serialized[:id])

      assert_equal serialized[:id], customizable_area.id
      assert_equal serialized[:name], customizable_area.name
      assert_nil serialized[:customizations]
    end
  end

  test "serializes correctly with deep flag on" do
    CustomizableAreaSerializer.serialize(CustomizableArea.all, deep: true).each do |serialized|
      customizable_area = CustomizableArea.find(serialized[:id])

      assert_equal serialized[:id], customizable_area.id
      assert_equal serialized[:name], customizable_area.name
      assert_equal serialized[:customizations], CustomizationSerializer.serialize(customizable_area.customizations, deep: true)
    end
  end
end
