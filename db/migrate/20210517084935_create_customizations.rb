class CreateCustomizations < ActiveRecord::Migration[6.1]
  def change
    create_table :customizations do |t|
      t.string :name
      t.references :customizable_area, null: true, foreign_key: true
      t.timestamps
    end
  end
end
