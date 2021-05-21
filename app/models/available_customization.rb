class AvailableCustomization < ApplicationRecord
  belongs_to :customizable_area
  belongs_to :customization

  validates_uniqueness_of :customizable_area_id, :scope => :customization_id

end
