class Customization < ApplicationRecord
  OPTION = 'option'.freeze
  CONTAINER = 'container'.freeze
  OPTION_TYPES = [OPTION, CONTAINER].freeze

  has_many :dependant_customizations
  has_many :children, through: :dependant_customizations

  belongs_to :parent, class_name: 'Customization', optional: true
  has_many :customizations, :class_name => 'Customization', :foreign_key => 'parent_id'

  validates_presence_of :name
  validates_presence_of :option_type
  validates :option_type, inclusion: OPTION_TYPES
end
