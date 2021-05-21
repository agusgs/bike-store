class AvailableCustomizationsController < ApplicationController
  def create
    customizable_area_id = params.require(:customizable_area_id)
    customization_id = params.require(:customization_id)
    render json: AvailableCustomization.create!(customization_id: customization_id, customizable_area_id: customizable_area_id)
  end
end
