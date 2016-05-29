class OpportunityGroup < ApplicationRecord
  belongs_to :applicant
  validate :info_presence

  private

  def info_presence
    unless decline
      errors.add(:ethnicity, "ethnicity must be present") unless ethnicity.present?
      errors.add(:race, "race must be present") unless race.present?
      errors.add(:sex, "sex must be present") unless sex.present?
    end
  end

end
