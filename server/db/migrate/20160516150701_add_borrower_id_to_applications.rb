class AddBorrowerIdToApplications < ActiveRecord::Migration[5.0]
  def change
    add_column :applications, :borrower_id, :integer
    add_index :applications, :borrower_id
  end
end
