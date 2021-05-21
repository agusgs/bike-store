class Product < ApplicationRecord
  scope :available, -> { where(available: true)}
  scope :unavailable, -> { where(available: false)}
  has_many :customizable_areas
end
