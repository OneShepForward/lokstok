class JobSerializer < ActiveModel::Serializer
  attributes :id, :name, :job_is_active
  has_one :client
  has_one :employee

  has_many :items
end
