class Address < ApplicationRecord
  belongs_to :addressable, polymorphic: true, optional: true
  validates_presence_of :street_address, :city, :state, :zip
end
