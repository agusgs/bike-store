class AddTypeToCustomizations < ActiveRecord::Migration[6.1]
  def change
    add_column(:customizations, :option_type, :string, null: false, default: Customization::OPTION)
  end
end
