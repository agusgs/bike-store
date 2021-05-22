class Product < ApplicationRecord
  scope :available, -> { where(available: true)}
  scope :unavailable, -> { where(available: false)}
  has_many :customizable_areas

  validates_presence_of :name
  validates_presence_of :available, allow_blank: true
  validates_presence_of :price_in_cents
end
