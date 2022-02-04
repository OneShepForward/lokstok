class CreateParts < ActiveRecord::Migration[7.0]
  def change
    create_table :parts do |t|
      t.text :description
      t.string :manufacturer
      t.string :part_number
      t.string :category
      t.float :price

      t.timestamps
    end
  end
end
