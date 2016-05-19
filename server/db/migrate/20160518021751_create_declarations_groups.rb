class CreateDeclarationsGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :declarations_groups do |t|
      t.boolean :a, null: false
      t.boolean :b, null: false
      t.boolean :c, null: false
      t.boolean :d, null: false
      t.boolean :e, null: false
      t.boolean :f, null: false
      t.boolean :g, null: false
      t.boolean :h, null: false
      t.boolean :i, null: false
      t.boolean :j, null: false
      t.boolean :k, null: false
      t.boolean :l, null: false
      t.boolean :m, null: false
      t.boolean :m1
      t.boolean :m2
      t.text :explanations
      t.belongs_to :applicant, index: true

      t.timestamps
    end
  end
end
