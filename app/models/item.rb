class Item < ApplicationRecord
  belongs_to :part
  belongs_to :employee, optional: true
  
  has_many :item_jobs
  has_many :jobs, through: :item_jobs
end
