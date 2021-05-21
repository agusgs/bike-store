require "test_helper"

class CustomizableAreasControllerTest < ActionDispatch::IntegrationTest
  test 'get customizable areas filtering by product' do
    get '/customizable_areas', params: { product_id: products(:awesome_bike).id }
    expected = CustomizableArea.where(product_id: products(:awesome_bike).id).ids.sort
    actual = response.parsed_body.map { |customizable_area| customizable_area["id"] }.sort

    assert_response :success
    assert_equal expected, actual
  end

  test 'get customizable areas' do
    get '/customizable_areas'
    expected = CustomizableArea.all.ids.sort
    actual = response.parsed_body.map { |customizable_area| customizable_area["id"] }.sort

    assert_response :success
    assert_equal expected, actual
  end

  test 'can not create a customizable area without a product' do
    before_post_customizable_area_count = CustomizableArea.count
    post '/customizable_areas', params: { name: "thingy" }, as: :json

    assert_response :bad_request
    assert_equal before_post_customizable_area_count, CustomizableArea.count
  end

  test 'can not create a customizable area without a name' do
    before_post_customizable_area_count = CustomizableArea.count
    post '/customizable_areas', params: { product_id: products(:awesome_bike).id }, as: :json

    assert_response :bad_request
    assert_equal before_post_customizable_area_count, CustomizableArea.count
  end

  test 'creates a customizable area' do
    name = "thingy"
    product = products(:awesome_bike)

    post '/customizable_areas', params: { product_id: product.id, name: name }, as: :json

    assert_response :success
    created_customizable_area = product.customizable_areas.find(response.parsed_body["id"])
    assert_equal name, created_customizable_area.name
  end
end
