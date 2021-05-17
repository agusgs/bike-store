class AvailableCustomization < ApplicationRecord
  belongs_to :customizable_area
  belongs_to :customization
end
