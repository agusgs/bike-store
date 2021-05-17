class CreateDependantCustomizations < ActiveRecord::Migration[6.1]
  def change
    create_table :dependant_customizations do |t|
      t.references :customization, null: false, foreign_key: true
      t.references :child, null: false, foreign_key: { to_table: :customizations }
      t.timestamps
    end
    add_index(:dependant_customizations, [:customization_id, :child_id], unique: true)
  end
end
