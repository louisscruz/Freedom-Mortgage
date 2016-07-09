class Application < ApplicationRecord
  before_save :assign_addresses!
  after_save :send_email!
  belongs_to :borrower, class_name: "Applicant"
  belongs_to :coborrower, class_name: "Applicant", optional: true
  has_one :address, as: :addressable
  validate :require_borrower_marital_status, :require_borrower_address, :require_borrower_jobs

  accepts_nested_attributes_for :borrower, :coborrower, :address

  def to_csv
    CSV.generate do |csv|
      full_application = {
        :purchase => self.try(:loan_type) == "purchase" ? 1 : 0,
        :no_cash_refinance => self.try(:loan_type) == "refinance" ? 1 : 0,
        :borrower_first_name => self.try(:borrower).try(:first_name),
        :borrower_middle_name => self.try(:borrower).try(:middle_name),
        :borrower_last_name => self.try(:borrower).try(:last_name),
        :borrower_dob => self.try(:borrower).try(:birthdate),
        :borrower_phone => self.try(:borrower).try(:phone),
        :borrower_email => self.try(:borrower).try(:email),
        :borrower_ssn => self.try(:borrower).try(:ssn),
        :borrower_married => self.try(:borrower).try(:marital_status) == "married" ? 1 : 0,
        :borrower_unmarried => self.try(:borrower).try(:marital_status) == "unmarried" ? 1 : 0,
        :borrower_separated => self.try(:borrower).try(:marital_status) == "separated" ? 1 : 0,
        :borrower_address_street => self.try(:borrower).try(:address).try(:street_address),
        :borrower_address_city => self.try(:borrower).try(:address).try(:city),
        :borrower_address_state => self.try(:borrower).try(:address).try(:state),
        :borrower_address_zip => self.try(:borrower).try(:address).try(:zip),
        :borrower_address_country => self.try(:borrower).try(:address) ? "USA" : nil,
        :borrower_current_job_self_employed => self.try(:borrower).try(:jobs)[0] ? self.try(:borrower).try(:jobs)[0].try(:self_employed) ? 1 : 0 : nil,
        :borrower_current_job_company => self.try(:borrower).try(:jobs)[0].try(:company),
        :borrower_current_job_address_street => self.try(:borrower).try(:jobs)[0].try(:address).try(:street),
        :borrower_current_job_address_city => self.try(:borrower).try(:jobs)[0].try(:address).try(:city),
        :borrower_current_job_address_state => self.try(:borrower).try(:jobs)[0].try(:address).try(:state),
        :borrower_current_job_address_zip => self.try(:borrower).try(:jobs)[0].try(:address).try(:zip),
        :borrower_current_job_address_country => self.try(:borrower).try(:jobs)[0] ? "USA" : nil,
        :borrower_first_job_self_employed => self.try(:borrower).try(:jobs)[1] ? self.try(:borrower).try(:jobs)[1].try(:self_employed) ? 1 : 0 : nil,
        :borrower_first_job_company => self.try(:borrower).try(:jobs)[1].try(:company),
        :borrower_first_job_address_street => self.try(:borrower).try(:jobs)[1].try(:address).try(:street),
        :borrower_first_job_address_city => self.try(:borrower).try(:jobs)[1].try(:address).try(:city),
        :borrower_first_job_address_state => self.try(:borrower).try(:jobs)[1].try(:address).try(:state),
        :borrower_first_job_address_zip => self.try(:borrower).try(:jobs)[1].try(:address).try(:zip),
        :borrower_first_job_address_country => self.try(:borrower).try(:jobs)[1] ? "USA" : nil,
        :borrower_second_job_self_employed => self.try(:borrower).try(:jobs)[2] ? self.try(:borrower).try(:jobs)[2].try(:self_employed) ? 1 : 0 : nil,
        :borrower_second_job_company => self.try(:borrower).try(:jobs)[2].try(:company),
        :borrower_second_job_address_street => self.try(:borrower).try(:jobs)[2].try(:address).try(:street),
        :borrower_second_job_address_city => self.try(:borrower).try(:jobs)[2].try(:address).try(:city),
        :borrower_second_job_address_state => self.try(:borrower).try(:jobs)[2].try(:address).try(:state),
        :borrower_second_job_address_zip => self.try(:borrower).try(:jobs)[2].try(:address).try(:zip),
        :borrower_second_job_address_country => self.try(:borrower).try(:jobs)[2] ? "USA" : nil,
        :borrower_third_job_self_employed => self.try(:borrower).try(:jobs)[3] ? self.try(:borrower).try(:jobs)[3].try(:self_employed) ? 1 : 0 : nil,
        :borrower_third_job_company => self.try(:borrower).try(:jobs)[3].try(:company),
        :borrower_third_job_address_street => self.try(:borrower).try(:jobs)[3].try(:address).try(:street),
        :borrower_third_job_address_city => self.try(:borrower).try(:jobs)[3].try(:address).try(:city),
        :borrower_third_job_address_state => self.try(:borrower).try(:jobs)[3].try(:address).try(:state),
        :borrower_third_job_address_zip => self.try(:borrower).try(:jobs)[3].try(:address).try(:zip),
        :borrower_third_job_address_country => self.try(:borrower).try(:jobs)[3] ? "USA" : nil,
        :borrower_fourth_job_self_employed => self.try(:borrower).try(:jobs)[4] ? self.try(:borrower).try(:jobs)[4].try(:self_employed) ? 1 : 0 : nil,
        :borrower_fourth_job_company => self.try(:borrower).try(:jobs)[4].try(:company),
        :borrower_fourth_job_address_street => self.try(:borrower).try(:jobs)[4].try(:address).try(:street),
        :borrower_fourth_job_address_city => self.try(:borrower).try(:jobs)[4].try(:address).try(:city),
        :borrower_fourth_job_address_state => self.try(:borrower).try(:jobs)[4].try(:address).try(:state),
        :borrower_fourth_job_address_zip => self.try(:borrower).try(:jobs)[4].try(:address).try(:zip),
        :borrower_fourth_job_address_country => self.try(:borrower).try(:jobs)[4] ? "USA" : nil,
        :borrower_fifth_job_self_employed => self.try(:borrower).try(:jobs)[5] ? self.try(:borrower).try(:jobs)[5].try(:self_employed) ? 1 : 0 : nil,
        :borrower_fifth_job_company => self.try(:borrower).try(:jobs)[5].try(:company),
        :borrower_fifth_job_address_street => self.try(:borrower).try(:jobs)[5].try(:address).try(:street),
        :borrower_fifth_job_address_city => self.try(:borrower).try(:jobs)[5].try(:address).try(:city),
        :borrower_fifth_job_address_state => self.try(:borrower).try(:jobs)[5].try(:address).try(:state),
        :borrower_fifth_job_address_zip => self.try(:borrower).try(:jobs)[5].try(:address).try(:zip),
        :borrower_fifth_job_address_country => self.try(:borrower).try(:jobs)[5] ? "USA" : nil,
        :borrower_sixth_job_self_employed => self.try(:borrower).try(:jobs)[6] ? self.try(:borrower).try(:jobs)[6].try(:self_employed) ? 1 : 0 : nil,
        :borrower_sixth_job_company => self.try(:borrower).try(:jobs)[6].try(:company),
        :borrower_sixth_job_address_street => self.try(:borrower).try(:jobs)[6].try(:address).try(:street),
        :borrower_sixth_job_address_city => self.try(:borrower).try(:jobs)[6].try(:address).try(:city),
        :borrower_sixth_job_address_state => self.try(:borrower).try(:jobs)[6].try(:address).try(:state),
        :borrower_sixth_job_address_zip => self.try(:borrower).try(:jobs)[6].try(:address).try(:zip),
        :borrower_sixth_job_address_country => self.try(:borrower).try(:jobs)[6] ? "USA" : nil,
        :borrower_seventh_job_self_employed => self.try(:borrower).try(:jobs)[7] ? self.try(:borrower).try(:jobs)[7].try(:self_employed) ? 1 : 0 : nil,
        :borrower_seventh_job_company => self.try(:borrower).try(:jobs)[7].try(:company),
        :borrower_seventh_job_address_street => self.try(:borrower).try(:jobs)[7].try(:address).try(:street),
        :borrower_seventh_job_address_city => self.try(:borrower).try(:jobs)[7].try(:address).try(:city),
        :borrower_seventh_job_address_state => self.try(:borrower).try(:jobs)[7].try(:address).try(:state),
        :borrower_seventh_job_address_zip => self.try(:borrower).try(:jobs)[7].try(:address).try(:zip),
        :borrower_seventh_job_address_country => self.try(:borrower).try(:jobs)[7] ? "USA" : nil,
        :borrower_base_income => self.try(:borrower).try(:incomes).find { |x| x.kind == "income" }
      }
      csv << full_application.values
    end
  end

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
    if borrower.present? && borrower.jobs == []
      errors.add(:borrower, "must have jobs")
    end
  end

  def send_email!
    #p "WHOA"
  end

end
