class Asset < ApplicationRecord
  belongs_to :applicant
  validates_presence_of :description, :value
end
