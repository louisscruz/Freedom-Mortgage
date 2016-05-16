class CreateApplicant < ActiveRecord::Migration[5.0]
  def change
    create_table :applicants do |t|
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.string :phone
      t.string :email
      t.date :birthdate
      t.string :ssn
      t.string :marital_status
    end
  end
end
