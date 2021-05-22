require "test_helper"

class RequestParametersTest < ActiveSupport::TestCase
  test 'fails if product id is missing' do
    request = ActionController::Parameters.new(
      {
        client_data: {
          client_name: "name", client_lastname: "last name", client_email: "email@example.com"
        },
      })

    error = assert_raises(ActionController::ParameterMissing) do
      OrderCreator.new(request).execute
    end
    assert_equal(error.param, :product_id)
  end

  test 'fails if client_name is missing' do
    request = ActionController::Parameters.new(
      {
        client_data: {
          client_lastname: "last name", client_email: "email@example.com"
        },
        product_id: Product.first
      })

    error = assert_raises(ActionController::ParameterMissing) do
      OrderCreator.new(request).execute
    end
    assert_equal(error.param, :client_name)
  end

  test 'fails if last name is missing' do
    request = ActionController::Parameters.new(
      {
        client_data: {
          client_name: "name", client_email: "email@example.com"
        },
        product_id: Product.first
      })

    error = assert_raises(ActionController::ParameterMissing) do
      OrderCreator.new(request).execute
    end
    assert_equal(error.param, :client_lastname)
  end

  test 'fails if email is missing' do
    request = ActionController::Parameters.new(
      {
        client_data: {
          client_name: "name", client_lastname: "last name"
        },
        product_id: Product.first
      })

    error = assert_raises(ActionController::ParameterMissing) do
      OrderCreator.new(request).execute
    end
    assert_equal(error.param, :client_email)
  end

  test 'fail with missing id in customizations' do
    request = ActionController::Parameters.new(
      {
        client_data: { client_name: "name", client_email: "asda@asd.com", client_lastname: "last name" },
        product_id: Product.first,
        selected_customizations: [
          {}
        ]
      })

    error = assert_raises(ActionController::ParameterMissing) do
      OrderCreator.new(request).execute
    end
    assert_equal(error.param, :id)
  end

  test 'fail with missing id in nested customizations' do
    product = products(:awesome_bike)
    wheels = customizable_areas(:wheels)
    wheel_size = customizations(:wheel_17)
    request = ActionController::Parameters.new(
      {
        client_data: { client_name: "name", client_email: "asda@asd.com", client_lastname: "last name" },
        product_id: product,
        selected_customizations: [
          {id: wheels.id, selected_customizations: [{ id: wheel_size.id, selected_customizations: [{}]}]}
        ]
      })

    error = assert_raises(ActionController::ParameterMissing) do
      OrderCreator.new(request).execute
    end
    assert_equal(error.param, :id)
  end
end
