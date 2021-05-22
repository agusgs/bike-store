class CustomizationsController < ApplicationController
  def create
    name = params.require(:name)
    type = params.require(:type)
    price = params[:price] || 0
    parent = params[:parent_id]

    render json: Customization.create!(name: name, option_type: type, price_in_cents: price, parent_id: parent)
  end
end
