class ItemPartsSerializer < ActiveModel::Serializer
  attributes :id, :bin, :active
  has_one :part
  has_one :employee
end
