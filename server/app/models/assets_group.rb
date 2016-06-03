class AssetsGroup < ApplicationRecord
  has_many :cars
  validates_presence_of :description, :value
end
