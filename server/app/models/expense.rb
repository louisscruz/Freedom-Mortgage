class Expense < ApplicationRecord
  belongs_to :applicant
  validates_presence_of :amount, :kind
  validate :correct_kind

  private

  def correct_kind
    unless kind.blank?
      kinds = ["rental"]
      errors.add(:kind, "invalid expense kind") unless kinds.any? { |x| kind == x }
    end
  end
end
