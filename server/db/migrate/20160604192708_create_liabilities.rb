class CreateLiabilities < ActiveRecord::Migration[5.0]
  def change
    create_table :liabilities do |t|
      t.text :description
      t.decimal :balance

      t.timestamps
    end
  end
end
