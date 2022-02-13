class ItemSerializer < ActiveModel::Serializer
  attributes :id, :bin, :active
  has_one :part
  has_one :employee

  def part_info
    object.part
  end
end
