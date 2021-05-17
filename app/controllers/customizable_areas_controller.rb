class CustomizableAreasController < ApplicationController
  def index
    product_id = params.require(:product_id)
    render json: CustomizableArea.where(product_id: product_id)
  end
end
