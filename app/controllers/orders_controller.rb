class OrdersController < ApplicationController
  def create
    order = OrderCreator.new(params).execute
    render json: { number: order.id }
  end
end
