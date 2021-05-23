class OrderSerializer
  attr_reader :orders

  def self.serialize(orders)
    new(orders).serialize
  end

  def initialize(orders)
    @orders = orders
  end

  def serialize
    orders.map do |order|
      {
        id: order.id,
        client_name: order.client_name,
        client_lastname: order.client_lastname,
        client_email: order.client_email,
        status: order.status,
        total: order.total
      }
    end

  end
end