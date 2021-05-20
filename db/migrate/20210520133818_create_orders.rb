class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.references :product, null: false, foreign_key: true
      t.string :client_name, null: false
      t.string :client_lastname, null: false
      t.string :client_email, null: false
      t.string :status, null: false

      t.timestamps
    end
  end
end
