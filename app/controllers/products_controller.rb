class ProductsController < ApplicationController
  def index
    available = params.permit(:available)[:available]

    products = Product.all
    products = available.present? ? products.where(available: available) : products

    render json: ::ProductSerializer.new(products).serialize
  end
end
