class CreateJobs < ActiveRecord::Migration[7.0]
  def change
    create_table :jobs do |t|
      t.string :name
      t.references :client, null: false, foreign_key: true
      t.references :employee, null: false, foreign_key: true
      t.boolean :job_is_active

      t.timestamps
    end
  end
end
