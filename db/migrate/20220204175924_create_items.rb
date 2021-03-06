class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :bin
      t.boolean :active
      t.references :part, null: false, foreign_key: true
      t.belongs_to :employee, optional: true

      t.timestamps
    end
  end
end
