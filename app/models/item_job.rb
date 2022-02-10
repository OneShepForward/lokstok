class ItemJob < ApplicationRecord
  belongs_to :item
  belongs_to :job
end
