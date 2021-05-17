class Customization < ApplicationRecord
  OPTION = 'option'
  CONTAINER = 'container'
  TYPES = [OPTION, CONTAINER]

  has_many :dependant_customizations
  has_many :children, through: :dependant_customizations

  validates :option_type, presence: true
  validates :option_type, inclusion: TYPES
end
