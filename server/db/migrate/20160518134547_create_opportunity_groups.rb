class CreateOpportunityGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :opportunity_groups do |t|
      t.boolean :decline, null: false
      t.string :ethnicity
      t.string :race
      t.string :sex
      t.belongs_to :applicant, index: true

      t.timestamps
    end
  end
end
