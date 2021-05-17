class CustomizableAreasController < ApplicationController
  def index
    product_id = params.require(:product_id)
    render json: ::CustomizableAreaSerializer.new(CustomizableArea.where(product_id: product_id)).serialize
  end
end
