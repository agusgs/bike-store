class CreateAvailableCustomizations < ActiveRecord::Migration[6.1]
  def change
    create_table :available_customizations do |t|
      t.references :customizable_area, null: false, foreign_key: true
      t.references :customization, null: false, foreign_key: true
      t.timestamps
    end
    add_index(:available_customizations, [:customizable_area_id, :customization_id], name: 'idx_available_customization_on_caid_and_cid', unique: true)
  end
end
