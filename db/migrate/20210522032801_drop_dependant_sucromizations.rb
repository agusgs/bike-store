class DropDependantSucromizations < ActiveRecord::Migration[6.1]
  def change
    drop_table :dependant_customizations
  end
end
