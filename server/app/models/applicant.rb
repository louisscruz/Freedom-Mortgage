class Applicant < ApplicationRecord
  has_many :applications
  validates_presence_of :first_name, :last_name, :phone, :email, :birthdate, :ssn
end
