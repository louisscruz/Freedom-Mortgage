class Car < ApplicationRecord
  validates_presence_of :description, :value
end
