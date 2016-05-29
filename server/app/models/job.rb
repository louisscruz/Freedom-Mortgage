class Job < ApplicationRecord
  belongs_to :applicant, optional: true
  has_one :address, as: :addressable, required: true
  validates_presence_of :company, :phone, :years, :months, :years_in_field
  validate :history_exists

  accepts_nested_attributes_for :address

  private

  def history_exists
    errors.add(:months, "history must be greater than 0 months") if self.years == 0 && self.months = 0
  end
end
