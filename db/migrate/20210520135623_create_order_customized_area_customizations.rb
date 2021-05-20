class CreateOrderCustomizedAreaCustomizations < ActiveRecord::Migration[6.1]
  def change
    create_table :order_customized_area_customizations do |t|
      t.references :order_customized_area, null: false, foreign_key: true, index: {name: "idx_order_customized_area_customizations_on_oca_id"}
      t.references :order_customization, null: false, foreign_key: true, index: {name: "idx_order_customized_area_customizations_on_oc_id"}

      t.timestamps
    end
    add_index(:order_customized_area_customizations, [:order_customized_area_id, :order_customization_id], name: 'idx_order_customized_area_customizations_on_oc_id_and_oca_id', unique: true)
  end
end
