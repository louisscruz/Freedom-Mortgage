class CreateApplication < ActiveRecord::Migration[5.0]
  def change
    create_table :applications do |t|
      t.string :loan_type
      t.string :loan_amount
      t.decimal :loan_amount
    end
  end
end
