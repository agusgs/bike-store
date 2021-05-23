class Order < ApplicationRecord
  PLACED = "PLACED".freeze
  FULFILLED = "FULFILLED".freeze

  belongs_to :product
  has_many :order_customized_areas

  validates_presence_of :client_name
  validates_presence_of :client_lastname
  validates_presence_of :client_email
  validates_presence_of :product
  validates_inclusion_of :status, in: [PLACED, FULFILLED]

  validates :client_email, format: { with: URI::MailTo::EMAIL_REGEXP }

  def total
    product.price_in_cents + order_customized_areas.map{ |order_customized_area| order_customized_area.total }.sum
  end
end
