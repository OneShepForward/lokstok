class CreateItemJobs < ActiveRecord::Migration[7.0]
  def change
    create_table :item_jobs do |t|
      t.belongs_to :item, null: false, foreign_key: true
      t.belongs_to :job, null: false, foreign_key: true

      t.timestamps
    end
  end
end
