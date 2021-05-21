class Customization < ApplicationRecord
  OPTION = 'option'.freeze
  CONTAINER = 'container'.freeze
  TYPES = [OPTION, CONTAINER].freeze

  has_many :dependant_customizations
  has_many :children, through: :dependant_customizations

  validates_presence_of :name
  validates_presence_of :option_type
  validates :option_type, inclusion: TYPES

end
