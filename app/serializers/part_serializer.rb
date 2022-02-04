class PartSerializer < ActiveModel::Serializer
  attributes :id, :description, :manufacturer, :part_number, :category, :price
end
