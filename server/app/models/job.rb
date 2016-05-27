class Job < ApplicationRecord
  belongs_to :applicant, optional: true
  has_one :address, as: :addressable
  validates_presence_of :self_employed, :company, :phone, :years, :months, :years_in_field

  accepts_nested_attributes_for :address
end
