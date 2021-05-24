class CustomizationsController < ApplicationController
  def create
    name = params.require(:name)
    type = params.require(:type)
    price = params[:price] || 0
    parent = params[:parent_id]

    customization = Customization.create!(name: name, option_type: type, price_in_cents: price, parent_id: parent)
    render json: CustomizationSerializer.serialize(customization)
  end

  def update
    customization_id = params.require(:id)
    option_type = params.require(:option_type)
    customization = Customization.find(customization_id)
    customization.update!(option_type: option_type)
    render json: CustomizationSerializer.serialize(customization)
  end
end
