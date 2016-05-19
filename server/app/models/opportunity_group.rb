class OpportunityGroup < ApplicationRecord
  belongs_to :applicant
  validates_presence_of :decline
end
