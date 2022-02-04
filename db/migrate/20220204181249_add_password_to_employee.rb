class AddPasswordToEmployee < ActiveRecord::Migration[7.0]
  def change
    change_table :employees do |t|
    t.string :password_digest
    end
  end
end
