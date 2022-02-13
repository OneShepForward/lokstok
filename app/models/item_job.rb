class ItemJob < ApplicationRecord
  belongs_to :item
  belongs_to :job

  validates :item_id, uniqueness: true
end
