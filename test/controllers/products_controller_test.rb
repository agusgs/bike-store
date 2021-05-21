require "test_helper"

class ProductsControllerTest < ActionDispatch::IntegrationTest
  test 'get all products' do
    get '/products'
    assert_success_index_response Product.all
  end

  test 'get only available products' do
    get '/products?available=true'
    assert_success_index_response(Product.available)
  end

  test 'get only unavailable products' do
    get '/products?available=false'
    assert_success_index_response(Product.unavailable)
  end

  test 'create a product' do
    name = "thingy"
    price = 10
    available = true

    post '/products', params: { name: name, available: available, price: price }, as: :json
    created_product = Product.find(response.parsed_body["id"])

    assert_response :success
    assert_equal name, created_product.name
    assert_equal price, created_product.price_in_cents
    assert_equal available, created_product.available
  end

  test "can't create a product without name" do
    before_post_product_count = Product.count
    post '/products', params: {available: true, price: 10 }, as: :json

    assert_response :bad_request
    assert_equal before_post_product_count, Product.count
  end

  test "can't create a product without price" do
    before_post_product_count = Product.count
    post '/products', params: {name: "thingy", available: true }, as: :json

    assert_response :bad_request
    assert_equal before_post_product_count, Product.count
  end

  test "can't create a product without availability" do
    before_post_product_count = Product.count
    post '/products', params: {name: "thingy", price: 20}, as: :json

    assert_response :bad_request
    assert_equal before_post_product_count, Product.count
  end

  private

  def assert_success_index_response(products)
    products_response = response.parsed_body

    assert_response :success
    assert_equal products.count, products_response.count
    assert_equal products.order(:id).ids, products_response.map { |product| product["id"] }.sort
  end

end
