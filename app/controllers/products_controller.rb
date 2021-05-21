class ProductsController < ApplicationController
  def index
    available = params.permit(:available)[:available]

    products = Product.all
    products = available.present? ? products.where(available: available) : products

    render json: ::ProductSerializer.serialize(products)
  end

  def create
    available = params.require(:available)
    name = params.require(:name)
    price = params.require(:price).round

    render json: ::ProductSerializer.serialize(Product.create!(name: name, available: available, price_in_cents: price))
  end
end
