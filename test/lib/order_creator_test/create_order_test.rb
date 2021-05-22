require "test_helper"

class CreateOrderTest < ActiveSupport::TestCase
  setup do
    @product = products(:awesome_bike)
    @wheels = customizable_areas(:wheels)
    @mudguards = customizable_areas(:mudguards)
    @wheel_17 = customizations(:wheel_17)
    @with_pattern = customizations(:with_pattern)
    @background_color = customizations(:background_color)
    @pattern_color = customizations(:pattern_color)
    @blue = customizations(:background_color_blue)
    @green = customizations(:pattern_color_green)
    @metal_mudguard = customizations(:metal_mudguard)

    @request = {
      client_data:{
        client_name: "name", client_lastname: "last name", client_email: "email@example.com"
      },
      product_id: @product.id,
      selected_customizations: [
        {
          id: @wheels.id,
          selected_customizations: [
            {
              id: @wheel_17.id,
              selected_customizations: [
                {
                  id: @with_pattern.id,
                  selected_customizations: [
                    { id: @background_color.id, selected_customizations: [{ id: @blue.id }] },
                    { id: @pattern_color.id, selected_customizations: [{ id: @green.id }] },
                  ]
                }
              ]
            }
          ]
        },
        { id: @mudguards.id, selected_customizations: [{ id: @metal_mudguard.id }] }
      ]
    }
  end

  test "creates the order" do
    order = OrderCreator.new(@request).execute
    assert order.persisted?
    assert_equal order.product.id, @product.id
  end

  test "creates the customized areas" do
    customized_areas = [@wheels, @mudguards]
    order_customization_count = OrderCustomizedArea.count
    assert_changes -> { OrderCustomizedArea.count }, from: order_customization_count, to: order_customization_count + customized_areas.count do
      OrderCreator.new(@request).execute
    end

    assert_equal OrderCustomizedArea.find_by(customizable_area: @wheels).order, Order.last
    assert_equal OrderCustomizedArea.find_by(customizable_area: @mudguards).order, Order.last
  end

  def assert_order_customization_created(integer, order_customization_wheel_17, order_customization_with_pattern)
    assert_equal order_customization_with_pattern.parent, order_customization_wheel_17
    assert_equal order_customization_with_pattern.children.size, integer
  end

  test "creates the order customizations" do
    customizations = [@wheel_17, @with_pattern, @pattern_color, @background_color, @blue, @green, @metal_mudguard]
    order_customization_count = OrderCustomization.count
    assert_changes -> { OrderCustomization.count }, from: order_customization_count, to: order_customization_count + customizations.count do
      OrderCreator.new(@request).execute
    end

    oc_wheel_17 = OrderCustomization.find_by(customization: @wheel_17)
    assert_order_customization_created(1, nil, oc_wheel_17)

    oc_with_pattern = OrderCustomization.find_by(customization: @with_pattern)
    assert_order_customization_created(2, oc_wheel_17, oc_with_pattern)

    oc_patter_color = OrderCustomization.find_by(customization: @pattern_color)
    assert_order_customization_created(1, oc_with_pattern, oc_patter_color)

    ac_background_color = OrderCustomization.find_by(customization: @background_color)
    assert_order_customization_created(1, oc_with_pattern, ac_background_color)

    ac_blue = OrderCustomization.find_by(customization: @blue)
    assert_order_customization_created(0, ac_background_color, ac_blue)

    ac_green = OrderCustomization.find_by(customization: @green)
    assert_order_customization_created(0, oc_patter_color, ac_green)

    ac_metal_mudguard = OrderCustomization.find_by(customization: @metal_mudguard)
    assert_order_customization_created(0, nil, ac_metal_mudguard)
  end
end
