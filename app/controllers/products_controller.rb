class ProductsController < ApplicationController
  def index
    render json: ::ProductSerializer.new(Product.available).serialize
  end
end
