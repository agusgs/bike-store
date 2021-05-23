class OrdersController < ApplicationController
  def create
    order = OrderCreator.new(params).execute
    render json: { number: order.id }
  end

  def index
    render json: OrderSerializer.serialize(Order.all.order(:status).order(id: :desc))
  end

  def show
    order_id = params.require(:id)
    render json: OrderSerializer.serialize(Order.find(order_id), deep: true)
  end

  def update
    order_id = params.require(:id)
    status = params.require(:status)
    order = Order.find(order_id)
    order.update!(status: status)

    render json: OrderSerializer.serialize(order)
  end
end
