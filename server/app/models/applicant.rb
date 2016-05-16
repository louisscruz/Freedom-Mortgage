class Applicant < ApplicationRecord
  has_many :applications
  has_one :address, as: :addressable
  validates_presence_of :first_name, :last_name, :phone, :email, :birthdate, :ssn
  accepts_nested_attributes_for :address
end
