class CustomizableArea < ApplicationRecord
  belongs_to :product
  has_many :available_customizations
  has_many :customizations, through: :available_customizations
end
