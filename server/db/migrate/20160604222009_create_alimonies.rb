class CreateAlimonies < ActiveRecord::Migration[5.0]
  def change
    create_table :alimonies do |t|
      t.text :description, null: false
      t.decimal :payment, null: false
      t.belongs_to :applicant, index: true

      t.timestamps
    end
  end
end
