class CreateItemsJobs < ActiveRecord::Migration[7.0]
  def change
    create_table :items_jobs, id: false do |t|
      t.belongs_to :item
      t.belongs_to :job

      t.timestamps
    end
  end
end
