class CustomizationsController < ApplicationController
  def create
    name = params.require(:name)
    type = params.require(:type)
    price = params.permit(:price)[:price] || 0

    render json: Customization.create!(name: name, option_type: type, price_in_cents: price)
  end
end
