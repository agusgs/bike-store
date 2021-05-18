require "test_helper"

class CustomizationSerializerTest < ActiveSupport::TestCase
  def assert_is_serialized_correctly(customization, serialized)
    assert_equal serialized[:id], customization.id
    assert serialized[:token].present?
    assert_equal serialized[:name], customization.name
    assert_equal serialized[:price], customization.price_in_cents
    assert_equal serialized[:option_type], customization.option_type
    assert_equal serialized[:customizations].count, customization.children.count
    serialized[:customizations].each do |serialized_customization|
      assert_is_serialized_correctly(customization.children.find(serialized_customization[:id]), serialized_customization)
    end
  end

  test "serializes the customizations correctly" do
    customizations = Customization.all
    serialized_customizations = CustomizationSerializer.new(customizations).serialize

    serialized_customizations.each do |serialized|
      assert_is_serialized_correctly(customizations.find(serialized[:id]), serialized)
    end
  end
  private
end
