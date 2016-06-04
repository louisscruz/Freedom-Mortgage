class Liability < ApplicationRecord
  belongs_to :applicant
  validates_presence_of :description, :balance
end
