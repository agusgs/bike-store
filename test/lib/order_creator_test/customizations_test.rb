require "test_helper"

class CustomizationsTest < ActiveSupport::TestCase
  class WithANoneExistentCustomizationInTheFirstLevel < ActiveSupport::TestCase
    setup do
      product = products(:awesome_bike)
      customizable_area = product.customizable_areas.first
      @non_existent_id = Customization.last.id + 1
      @request = ActionController::Parameters.new({
        client_data:{
          client_name: "name", client_lastname: "last name", client_email: "email@example.com"
        },
        product_id: product.id,
        selected_customizations: [
          {
            id: customizable_area.id,
            selected_customizations: [
              {
                id: @non_existent_id
              }
            ]
          },
        ]
      })
    end

    test 'fails with not found error' do
      error = assert_raises(ActiveRecord::RecordNotFound) do
        OrderCreator.new(@request).execute
      end
      assert_equal(error.model, 'Customization')
      assert_equal(error.id, @non_existent_id)
    end
  end

  class WithANoneExistentCustomizationInADeeperLevel < ActiveSupport::TestCase
    setup do
      product = products(:awesome_bike)
      customizable_area = product.customizable_areas.first
      customization = customizable_area.customizations.first
      @non_existent_id = Customization.last.id + 1
      @request = ActionController::Parameters.new({
        client_data:{
          client_name: "name", client_lastname: "last name", client_email: "email@example.com"
        },
        product_id: product.id,
        selected_customizations: [
          {
            id: customizable_area.id,
            selected_customizations: [
              {
                id: customization.id,
                selected_customizations: [
                  {
                    id: customization.customizations.first.id,
                    selected_customizations: [
                      {
                        id: @non_existent_id
                      }
                    ]
                  }
                ]
              }
            ]
          },
        ]
      })
    end

    test 'fails with not found error' do
      error = assert_raises(ActiveRecord::RecordNotFound) do
        OrderCreator.new(@request).execute
      end
      assert_equal(error.model, 'Customization')
      assert_equal(error.id, @non_existent_id)
    end
  end

  class WithAChildCustomizationThatDoesNotBelongsToCustomizableArea < ActiveSupport::TestCase
    setup do
      product = products(:awesome_bike)
      customizable_area = product.customizable_areas.first
      @non_existent_id = product.customizable_areas.second.customizations.first.id

      @request = ActionController::Parameters.new({
        client_data:{
          client_name: "name", client_lastname: "last name", client_email: "email@example.com"
        },
        product_id: product.id,
        selected_customizations: [
          {
            id: customizable_area.id,
            selected_customizations: [
              {
                id: @non_existent_id
              }
            ]
          },
        ]
      })
    end

    test 'fails with not found error' do
      error = assert_raises(ActiveRecord::RecordNotFound) do
        OrderCreator.new(@request).execute
      end
      assert_equal(error.model, 'Customization')
      assert_equal(error.id, @non_existent_id)
    end
  end

  class WithAChildCustomizationThatDoesNotBelongsToParentCustomization < ActiveSupport::TestCase
    setup do
      product = products(:awesome_bike)
      customizable_area = product.customizable_areas.first
      customization = customizable_area.customizations.first

      @non_existent_id = Customization.where.not(id: customization.customizations)

      @request = ActionController::Parameters.new({
        client_data:{
          client_name: "name", client_lastname: "last name", client_email: "email@example.com"
        },
        product_id: product.id,
        selected_customizations: [
          {
            id: customizable_area.id,
            selected_customizations: [
              {
                id: customization.id,
                selected_customizations: [
                  {
                    id: @non_existent_id
                  }
                ]
              }
            ]
          },
        ]
      })
    end

    test 'fails with not found error' do
      error = assert_raises(ActiveRecord::RecordNotFound) do
        OrderCreator.new(@request).execute
      end
      assert_equal(error.model, 'Customization')
    end
  end
end