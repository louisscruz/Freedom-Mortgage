class DeclarationsGroup < ApplicationRecord
  belongs_to :applicant, optional: true
end
