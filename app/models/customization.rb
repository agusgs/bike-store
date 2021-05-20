class Customization < ApplicationRecord
  OPTION = 'option'.freeze
  CONTAINER = 'container'.freeze
  TYPES = [OPTION, CONTAINER].freeze

  has_many :dependant_customizations
  has_many :children, through: :dependant_customizations

  validates :option_type, presence: true
  validates :option_type, inclusion: TYPES
end
