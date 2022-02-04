class CreateJoinTableItemJob < ActiveRecord::Migration[7.0]
  def change
    create_join_table :items, :jobs do |t|
      t.index [:item_id, :job_id]
      t.index [:job_id, :item_id]
    end
  end
end
