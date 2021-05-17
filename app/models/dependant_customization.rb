class DependantCustomization < ApplicationRecord
  belongs_to :customization
  belongs_to :child, class_name: 'Customization'
end
