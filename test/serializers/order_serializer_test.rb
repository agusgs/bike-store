require "test_helper"

class OrderSerializerTest < ActiveSupport::TestCase
  test "serializes correctly with deep flag off" do
    OrderSerializer.serialize(Order.all).each do |serialized|
      order = Order.all.find(serialized[:id])

      assert_equal serialized[:id], order.id
      assert_equal serialized[:client_name], order.client_name
      assert_equal serialized[:client_lastname], order.client_lastname
      assert_equal serialized[:client_email], order.client_email
      assert_equal serialized[:status], order.status
      assert_equal serialized[:total], order.total
      assert_equal serialized[:product], ProductSerializer.serialize(order.product)
      assert_nil serialized[:order_customized_areas]
    end
  end

  test "serializes correctly with deep flag on" do
    OrderSerializer.serialize(Order.all, deep: true).each do |serialized|
      order = Order.all.find(serialized[:id])

      assert_equal serialized[:id], order.id
      assert_equal serialized[:client_name], order.client_name
      assert_equal serialized[:client_lastname], order.client_lastname
      assert_equal serialized[:client_email], order.client_email
      assert_equal serialized[:status], order.status
      assert_equal serialized[:total], order.total
      assert_equal serialized[:product], ProductSerializer.serialize(order.product)
      assert_not_nil serialized[:order_customized_areas]
      assert_equal serialized[:order_customized_areas], OrderCustomizedAreaSerializer.serialize(order.order_customized_areas, deep: true)
    end
  end
end
