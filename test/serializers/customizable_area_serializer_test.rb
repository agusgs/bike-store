require "test_helper"

class CustomizableAreaSerializerTest < ActiveSupport::TestCase
  test "serializes the customizable areas correctly" do
    customizable_areas = CustomizableArea.all
    serialized_customization_areas = CustomizableAreaSerializer.new(customizable_areas).serialize

    serialized_customization_areas.each do |serialized|
      customizable_area = customizable_areas.find(serialized[:id])
      assert_equal serialized[:id], customizable_area.id
      assert serialized[:token].present?
      assert_equal serialized[:name], customizable_area.name
      assert_equal serialized[:customizations].count, customizable_area.customizations.count
    end
  end
end
