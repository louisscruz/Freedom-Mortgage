class Applicant < ApplicationRecord
  has_many :applications
  has_one :address, as: :addressable
  has_many :jobs
  has_many :assets
  has_many :cars
  has_many :liabilities
  has_many :alimonies
  has_one :declarations_group, required: true, dependent: :destroy
  has_one :opportunity_group, required: true, dependent: :destroy
  validates_presence_of :first_name, :last_name, :phone, :email, :birthdate, :ssn
  validate :three_car_max, :four_asset_max, :eight_liability_max, :three_alimony_max

  accepts_nested_attributes_for :address, :jobs, :assets, :cars

  private

  def three_car_max
    unless cars.blank?
      errors.add(:cars, "more than three cars entered") if cars.size > 3
    end
  end

  def four_asset_max
    unless assets.blank?
      errors.add(:assets, "more than four assets entered") if assets.size > 4
    end
  end

  def eight_liability_max
    unless liabilities.blank?
      errors.add(:liabilities, "more than eight liabilities entered") if liabilities.size > 8
    end
  end

  def three_alimony_max
    unless alimonies.blank?
      errors.add(:alimonies, "more than three alimonies entered") if alimonies.size > 3
    end
  end
end
