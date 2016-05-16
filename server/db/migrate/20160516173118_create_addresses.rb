class CreateAddresses < ActiveRecord::Migration[5.0]
  def change
    create_table :addresses do |t|
      t.string :street_address, :null => false
      t.string :city, :null => false
      t.string :state, :null => false
      t.integer :zip, :null => false
      t.references :addressable, polymorphic: true, index: true

      t.timestamps
    end
  end
end
