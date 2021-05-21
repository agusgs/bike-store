require "test_helper"

class ProductTest < ActiveSupport::TestCase
  class NoneExistentProduct < ActiveSupport::TestCase
    setup do
      @request = {
        client_data:{
          client_name: "name", client_lastname: "last name", client_email: "email@example.com"
        },
        product_id: Product.all.order(:id).last.id + 1
      }
    end

    test 'when the product does not exists, fails with not found error' do
      error = assert_raises(ActiveRecord::RecordNotFound) do
        OrderCreator.new(@request).execute
      end
      assert_equal(error.model, 'Product')
    end
  end

  class UnavailableProduct < ActiveSupport::TestCase
    setup do
      @request = {
        client_data:{
          client_name: "name", client_lastname: "last name", client_email: "email@example.com"
        },
        product_id: products(:old_bike)
      }
    end

    test 'when the product does not exists, fails with not found error' do
      error = assert_raises(ActiveRecord::RecordNotFound) do
        OrderCreator.new(@request).execute
      end
      assert_equal(error.model, 'Product')
    end
  end
end
