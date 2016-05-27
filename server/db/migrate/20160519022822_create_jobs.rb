class CreateJobs < ActiveRecord::Migration[5.0]
  def change
    create_table :jobs do |t|
      t.boolean :self_employed, null: false
      t.string :company, null: false
      t.string :phone, null: false
      t.integer :years, null: false
      t.integer :months, null: false
      t.integer :years_in_field, null: false
      t.belongs_to :applicant, index:true

      t.timestamps
    end
  end
end
