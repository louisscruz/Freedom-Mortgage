class CreateLiabilities < ActiveRecord::Migration[5.0]
  def change
    create_table :liabilities do |t|
      t.text :description, null: false
      t.decimal :balance, null: false
      t.belongs_to :applicant, index: true

      t.timestamps
    end
  end
end
