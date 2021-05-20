class OrderCustomizedAreaCustomization < ApplicationRecord
  belongs_to :order_customized_area
  belongs_to :order_customization

  validates_presence_of :order_customized_area
  validates_presence_of :order_customization
end
