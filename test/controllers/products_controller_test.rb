require "test_helper"

class ProductsControllerTest < ActionDispatch::IntegrationTest
  test 'get all products' do
    get '/products/index'
    assert_success_index_response Product.all
  end

  test 'get only available products' do
    get '/products/index?available=true'
    assert_success_index_response(Product.available)
  end

  test 'get only unavailable products' do
    get '/products/index?available=false'
    assert_response :success
    assert_success_index_response(Product.unavailable)
  end

  private

  def assert_success_index_response(products)
    products_response = response.parsed_body
    assert_equal products.count, response.parsed_body.count
    assert_response :success
    assert_equal products.order(:id).map(&:id), products_response.map { |product| product["id"] }.sort
  end

end
