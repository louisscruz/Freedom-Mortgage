class Application < ApplicationRecord
  before_save :assign_addresses!
  belongs_to :borrower, class_name: "Applicant"
  belongs_to :coborrower, class_name: "Applicant", optional: true
  has_one :address, as: :addressable
  validate :require_borrower_marital_status, :require_borrower_address, :require_borrower_jobs

  accepts_nested_attributes_for :borrower, :coborrower, :address

  private

  def require_borrower_marital_status
    if borrower.present? && borrower.marital_status == nil
      errors.add(:borrower, "must have a marital status")
    end
  end

  def require_borrower_address
    if borrower.present? && borrower.address == nil
      errors.add(:borrower, "must have an address")
    end
  end

  def assign_addresses!
    assign_application_address!
    assign_coborrower_address!
  end

  def assign_application_address!
    if loan_type == "refinance" && !address.present?
      copy_address!(borrower.address, self)
    end
  end

  def assign_coborrower_address!
    if coborrower.present? && !coborrower.address.present?
      copy_address!(borrower.address, coborrower)
    end
  end

  def copy_address!(address, parent)
    street_address = address.street_address
    city = address.city
    state = address.state
    zip = address.zip
    parent.address = Address.new(street_address: street_address, city: city, state: state, zip: zip, addressable: parent)
  end

  def require_borrower_jobs
    if borrower && borrower.jobs == []
      errors.add(:borrower, "must have jobs")
    end
  end

end