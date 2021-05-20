class Product < ApplicationRecord
  scope :available, -> { where(available: true)}
  has_many :customizable_areas
end
