require "test_helper"

class OrdersControllerTest < ActionDispatch::IntegrationTest
  test "post to orders create order" do
    order_customization_count = Order.count
    params = {
      product_id: products(:awesome_bike).id,
      client_data: {
        client_name: "a",
        client_lastname: "b",
        client_email: "a@b.com"
      }
    }

    assert_changes -> { Order.count }, from: order_customization_count, to: order_customization_count + 1 do
      post '/orders', params: params
    end
  end

  test "post to orders successfully" do
    params = {
      product_id: products(:awesome_bike).id,
      client_data: {
        client_name: "a",
        client_lastname: "b",
        client_email: "a@b.com"
      }
    }

    post '/orders', params: params
    assert_response :success
  end

  test 'show fails if order not exist' do
    get "/orders/#{Order.all.order(id: :desc).first.id + 1}"
    assert_response :not_found
  end

  test 'show returns an order' do
    get "/orders/#{Order.first.id}"
    assert_response :success
    assert_equal OrderSerializer.serialize(Order.first, deep: true), response.parsed_body.deep_symbolize_keys
  end

  test 'update fails if order not exist' do
    put "/orders/#{Order.all.order(id: :desc).first.id + 1}", params:{ status: 'thing'}
    assert_response :not_found
  end

  test 'update fails if status is missing' do
    put "/orders/#{Order.first.id}"
    assert_response :bad_request
  end

  test 'update fails with non existent status' do
    put "/orders/#{Order.first.id}", params: {status: "thing"}
    assert_response :bad_request
  end

  test 'update fails updates status' do
    order = Order.first

    assert_equal order.status, Order::PLACED
    put "/orders/#{order.id}", params: { status: Order::FULFILLED}
    assert_response :success
    assert_equal order.reload.status, Order::FULFILLED
  end
end
