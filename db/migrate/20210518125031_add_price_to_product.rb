class AddPriceToProduct < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :price_in_cents, :integer, null:false, default:0
  end
end
