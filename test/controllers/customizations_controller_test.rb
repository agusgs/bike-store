require "test_helper"

class CustomizationControllerTest < ActionDispatch::IntegrationTest
  test 'can not create a customization without a name' do
    before_post_customizations_count = Customization.count
    post '/customizations', params: { price: 10, option_type: Customization::OPTION }, as: :json

    assert_response :bad_request
    assert_equal before_post_customizations_count, Customization.count
  end

  test 'can not create a customization without a type' do
    before_post_customizations_count = Customization.count
    post '/customizations', params: { name: "thingy", price: 10 }, as: :json

    assert_response :bad_request
    assert_equal before_post_customizations_count, Customization.count
  end

  test 'can not create a customization with an invalid type' do
    before_post_customizations_count = Customization.count
    post '/customizations', params: { name: "thingy", type: "other thingy" }, as: :json

    assert_response :bad_request
    assert_equal before_post_customizations_count, Customization.count
  end

  test 'creates a customization with price' do
    name = "thingy"
    type = Customization::OPTION
    price = 10

    post '/customizations', params: { name: name, type: type, price: price }, as: :json

    customization = Customization.find(response.parsed_body["id"])
    assert_response :success
    assert_equal name, customization.name
    assert_equal type, customization.option_type
    assert_equal price, customization.price_in_cents
  end

  test 'creates a customization without price' do
    name = "thingy"
    type = Customization::OPTION

    post '/customizations', params: { name: name, type: type }, as: :json

    customization = Customization.find(response.parsed_body["id"])
    assert_response :success
    assert_equal name, customization.name
    assert_equal type, customization.option_type
    assert_equal 0, customization.price_in_cents
  end
end
