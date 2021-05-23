class CustomizableAreasController < ApplicationController
  def index
    product_id = params.permit(:product_id)[:product_id]
    customizable_areas = CustomizableArea.all
    customizable_areas = product_id.present? ? customizable_areas.where(product_id: product_id) : customizable_areas

    render json: ::CustomizableAreaSerializer.serialize(customizable_areas, deep:true)
  end

  def create
    name = params.require(:name)
    product_id = params.require(:product_id)
    render json: CustomizableArea.create!(name: name, product_id: product_id)
  end
end
