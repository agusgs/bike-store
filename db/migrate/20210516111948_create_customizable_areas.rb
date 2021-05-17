class CreateCustomizableAreas < ActiveRecord::Migration[6.1]
  def change
    create_table :customizable_areas do |t|
      t.string :name
      t.references :product, null: false, foreign_key: true

      t.timestamps
    end
  end
end
