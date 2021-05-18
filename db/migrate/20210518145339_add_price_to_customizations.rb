class AddPriceToCustomizations < ActiveRecord::Migration[6.1]
  def change
    add_column :customizations, :price_in_cents, :integer, null: false, default: 0
  end
end
