class OrderCustomization < ApplicationRecord
  belongs_to :customization
  belongs_to :parent, class_name: 'OrderCustomization', optional: true
  has_one :order_customized_area_customization
  has_many :children, :class_name => 'OrderCustomization', :foreign_key => 'parent_id'

  validates_presence_of :customization

  def total
    customization.price_in_cents + children.map { |child| child.total }.sum
  end
end
