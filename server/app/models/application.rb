class Application < ApplicationRecord
  belongs_to :borrower, class_name: 'Applicant'
  belongs_to :coborrower, class_name: 'Applicant', optional: true
  validate :require_borrower_marital_status


  accepts_nested_attributes_for :borrower
  accepts_nested_attributes_for :coborrower

  def require_borrower_marital_status
    if borrower.present? && borrower.marital_status == nil
      errors.add(:borrower, "must have a marital status")
    end
  end
end
