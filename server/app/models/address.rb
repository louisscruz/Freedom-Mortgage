class Address < ApplicationRecord
  validates_presence_of :street_address, :city, :state, :zip
  belongs_to :addressable, polymorphic: true
end
