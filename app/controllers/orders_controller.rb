class OrdersController < ApplicationController
  def create
    order = OrderCreator.new(params).execute
    render json: { number: order.id }
  end

  def index
    render json: OrderSerializer.serialize(Order.all)
  end
end
