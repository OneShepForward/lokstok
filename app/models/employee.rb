class Employee < ApplicationRecord
    has_secure_password

    validates :name, uniqueness: true
end
