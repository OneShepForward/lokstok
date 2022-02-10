class Job < ApplicationRecord
  belongs_to :client
  belongs_to :employee

  has_and_belongs_to_many :items
end
