class CreateOrderCustomizedAreas < ActiveRecord::Migration[6.1]
  def change
    create_table :order_customized_areas do |t|
      t.references :order, null: false, foreign_key: true
      t.references :customizable_area, null: false, foreign_key: true

      t.timestamps
    end
  end
end
