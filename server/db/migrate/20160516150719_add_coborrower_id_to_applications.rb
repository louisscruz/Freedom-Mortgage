class AddCoborrowerIdToApplications < ActiveRecord::Migration[5.0]
  def change
    add_column :applications, :coborrower_id, :integer
    add_index :applications, :coborrower_id
  end
end
