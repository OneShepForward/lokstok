class Client < ApplicationRecord

    validates :name, uniqueness: true
end
