class ProductsController < ApplicationController
  def index
    available = params.permit(:available)[:available]

    products = Product.all.order(available: :desc).order(id: :desc)
    products = available.present? ? products.where(available: available) : products

    render json: ::ProductSerializer.serialize(products)
  end

  def create
    available = params.require(:available)
    name = params.require(:name)
    price = params.require(:price).round

    render json: ::ProductSerializer.serialize(Product.create!(name: name, available: available, price_in_cents: price))
  end

  def show
    product_id = params.require(:id)
    render json: ::ProductSerializer.serialize(Product.find(product_id), deep: true)
  end

  def update
    product_id = params.require(:id)
    available = params.require(:available)
    render json: ::Product.find(product_id).update!(available: available)
  end
end
