class CreateCars < ActiveRecord::Migration[5.0]
  def change
    create_table :cars do |t|
      t.text :description, null: false
      t.decimal :value, null: false
      t.belongs_to :applicant, index: true

      t.timestamps
    end
  end
end
