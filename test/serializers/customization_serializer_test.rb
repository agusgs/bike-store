require "test_helper"

class CustomizationSerializerTest < ActiveSupport::TestCase
  test "serializes correctly with deep flag off" do
    CustomizationSerializer.serialize(Customization.all).each do |serialized|
      customization = Customization.find(serialized[:id])

      assert_equal serialized[:id], customization.id
      assert serialized[:token].present?
      assert_equal serialized[:name], customization.name
      assert_equal serialized[:price], customization.price_in_cents
      assert_equal serialized[:option_type], customization.option_type
      assert_nil serialized[:customizations]
    end
  end

  test "serializes correctly with deep flag on" do
    Random.stub :uuid, "asd" do
      CustomizationSerializer.serialize(Customization.all, deep: true).each do |serialized|
        customization = Customization.find(serialized[:id])

        assert_equal serialized[:id], customization.id
        assert serialized[:token].present?
        assert_equal serialized[:name], customization.name
        assert_equal serialized[:price], customization.price_in_cents
        assert_equal serialized[:option_type], customization.option_type
        assert_equal serialized[:customizations], CustomizationSerializer.serialize(customization.customizations, deep: true)
      end
    end
  end
end
