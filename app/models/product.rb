class Product < ApplicationRecord
  scope :available, -> { where(available: true)}
end
