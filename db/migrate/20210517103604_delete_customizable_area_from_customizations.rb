class DeleteCustomizableAreaFromCustomizations < ActiveRecord::Migration[6.1]
  def change
    remove_column(:customizations, :customizable_area_id)
  end
  def down
    add_reference(:customizations, :customizable_area, null:true, foreign_key: true)
  end
end
