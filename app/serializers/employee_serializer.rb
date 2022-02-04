class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :name, :position, :admin
end
