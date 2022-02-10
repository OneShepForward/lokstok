class Item < ApplicationRecord
  belongs_to :part
  belongs_to :employee, optional: true

  has_and_belongs_to_many :jobs
end
