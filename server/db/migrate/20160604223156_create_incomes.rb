class CreateIncomes < ActiveRecord::Migration[5.0]
  def change
    create_table :incomes do |t|
      t.decimal :amount, null: false
      t.string :type, null: false
      t.belongs_to :applicant, index: true

      t.timestamps
    end
  end
end
