class OrderCustomizedArea < ApplicationRecord
  belongs_to :order
  belongs_to :customizable_area
  has_many :order_customized_area_customizations
  has_many :order_customizations, through: :order_customized_area_customizations

  validates_presence_of :customizable_area

  def total
    order_customizations.map(&:total).sum
  end
end
