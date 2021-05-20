class CreateOrderCustomizations < ActiveRecord::Migration[6.1]
  def change
    create_table :order_customizations do |t|
      t.references :customization, null: false, foreign_key: true
      t.references :parent, null: true, foreign_key: { to_table: :order_customizations }

      t.timestamps
    end
  end
end
