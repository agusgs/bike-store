require "test_helper"

class CustomizableAreaTest < ActiveSupport::TestCase
  class WithANoneExistentCustomizableArea < ActiveSupport::TestCase
    setup do
      @request = {
        client_data:{
          client_name: "name", client_lastname: "last name", client_email: "email@example.com"
        },
        product_id: products(:awesome_bike).id,
        selected_customizations: [
          {
            id: CustomizableArea.last.id + 1,
            selected_customizations: {}
          }
        ]
      }
    end

    test 'fails with not found error' do
      error = assert_raises(ActiveRecord::RecordNotFound) do
        OrderCreator.new(@request).execute
      end
      assert_equal(error.model, 'CustomizableArea')
    end
  end

  class WhenTheCustomizableAareaDoesNotBelongsToTheProduct < ActiveSupport::TestCase
    setup do
      @request = {
        client_data:{
          client_name: "name", client_lastname: "last name", client_email: "email@example.com"
        },
        product_id: products(:awesome_bike).id,
        selected_customizations: [
          {
            id: products(:mountain_bike).customizable_areas.first.id,
            selected_customizations: {}
          }
        ]
      }
    end

    test 'fails with not found error' do
      error = assert_raises(ActiveRecord::RecordNotFound) do
        OrderCreator.new(@request).execute
      end
      assert_equal(error.model, 'CustomizableArea')
    end
  end
end