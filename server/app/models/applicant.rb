class Applicant < ApplicationRecord
  has_many :applications
  has_one :address, as: :addressable
  has_many :jobs
  has_many :assets
  has_many :cars
  has_one :declarations_group, required: true, dependent: :destroy
  has_one :opportunity_group, required: true, dependent: :destroy
  validates_presence_of :first_name, :last_name, :phone, :email, :birthdate, :ssn
  validate :three_car_max

  accepts_nested_attributes_for :address, :jobs, :assets

  private

  def three_car_max
    unless cars.blank?
      errors.add(:cars, "more than three cars entered") if cars.size > 3
    end
  end
end
