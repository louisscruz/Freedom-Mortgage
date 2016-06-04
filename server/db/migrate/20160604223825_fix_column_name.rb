class FixColumnName < ActiveRecord::Migration[5.0]
  def change
    rename_column :incomes, :type, :kind
  end
end
