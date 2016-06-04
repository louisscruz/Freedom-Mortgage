class Alimony < ApplicationRecord
  belongs_to :applicant
  validates_presence_of :description, :payment
end
