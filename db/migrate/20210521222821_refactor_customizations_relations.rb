class RefactorCustomizationsRelations < ActiveRecord::Migration[6.1]
  def change
    add_reference :customizations, :parent, null: true, foreign_key: { to_table: :customizations }
  end
end
