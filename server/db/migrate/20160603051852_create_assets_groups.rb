class CreateAssetsGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :assets_groups do |t|
      t.text :description, null: false
      t.decimal :value, null: false

      t.timestamps
    end
  end
end
