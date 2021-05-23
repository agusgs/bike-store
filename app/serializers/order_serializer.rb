class OrderSerializer
  attr_reader :orders, :deep

  def self.serialize(orders, deep: false)
    if orders.is_a?(Array) || orders.is_a?(ActiveRecord::Relation)
      new(orders, deep).serialize
    else
      new([orders], deep).serialize.first
    end

  end

  def initialize(orders, deep)
    @orders = orders
    @deep = deep
  end

  def serialize
    orders.map do |order|
      serialized = {
        id: order.id,
        client_name: order.client_name,
        client_lastname: order.client_lastname,
        client_email: order.client_email,
        status: order.status,
        total: order.total,
        product: {
          id: order.product.id,
          name: order.product.name,
          price: order.product.price_in_cents
        }
      }

      if deep
        serialized[:order_customized_areas] = OrderCustomizedAreaSerializer.serialize(order.order_customized_areas, deep: deep)
      end

      serialized
    end
  end
end