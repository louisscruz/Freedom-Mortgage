class CreateExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :expenses do |t|
      t.decimal :amount, null: false
      t.string :kind, null: false
      t.belongs_to :applicant, index: true

      t.timestamps
    end
  end
end
