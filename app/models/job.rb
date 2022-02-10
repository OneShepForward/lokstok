class Job < ApplicationRecord
  belongs_to :client
  belongs_to :employee, optional: true

  has_many :item_jobs
  has_many :items, through: :item_jobs
end
