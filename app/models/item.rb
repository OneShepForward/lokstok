class Item < ApplicationRecord
  belongs_to :part
  belongs_to :employee, optional: true
end
