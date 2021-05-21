require "test_helper"

class AvailableCustomizationsControllerTest < ActionDispatch::IntegrationTest
  test 'can not create an available customization without customization' do
    before_available_customizations_count = AvailableCustomization.count
    post '/available_customizations', params: { customizable_area_id: customizable_areas(:wheels).id }, as: :json

    assert_response :bad_request
    assert_equal before_available_customizations_count, AvailableCustomization.count
  end

  test 'can not create an available customization without customizable area' do
    before_available_customizations_count = AvailableCustomization.count
    post '/available_customizations', params: { customization_id: customizations(:metal_mudguard).id }, as: :json

    assert_response :bad_request
    assert_equal before_available_customizations_count, AvailableCustomization.count
  end

  test 'can not create an available customization with a non existent customization' do
    before_available_customizations_count = AvailableCustomization.count
    params = {
      customizable_area_id: CustomizableArea.order(:id).last.id + 1,
      customization_id: customizations(:metal_mudguard)
    }
    post '/available_customizations', params: params, as: :json

    assert_response :bad_request
    assert_equal before_available_customizations_count, AvailableCustomization.count
  end

  test 'can not create an available customization with a non existent customizable area' do
    before_available_customizations_count = AvailableCustomization.count
    params = {
      customizable_area_id: customizable_areas(:wheels),
      customization_id: Customization.order(:id).last.id + 1
    }
    post '/available_customizations', params: params, as: :json

    assert_response :bad_request
    assert_equal before_available_customizations_count, AvailableCustomization.count
  end

  test 'can not create an available customization with repeated combination of customization and customizable area' do
    customizable_area = customizable_areas(:wheels)
    customization = customizable_area.customizations.first
    before_available_customizations_count = AvailableCustomization.count

    params = {
      customization_id: customization.id,
      customizable_area_id: customizable_area.id
    }
    post '/available_customizations', params: params, as: :json


    assert_response :bad_request
    assert_equal before_available_customizations_count, AvailableCustomization.count
  end

  test 'creates an available customization area' do
    customization = customizations(:metal_mudguard)
    customizable_area = customizable_areas(:wheels)

    params = {
      customization_id: customization.id,
      customizable_area_id: customizable_area.id
    }
    post '/available_customizations', params: params, as: :json

    assert_response :success
    created_available_customization = AvailableCustomization.find(response.parsed_body["id"])
    assert_equal customization, created_available_customization.customization
    assert_equal customizable_area, created_available_customization.customizable_area
  end
end