class Income < ApplicationRecord
  belongs_to :applicant
  validates_presence_of :amount, :kind
  validate :correct_kind

  private

  def correct_kind
    unless kind.blank?
      kinds = ["income", "overtime", "bonuses", "commissions", "interest", "rental", "other"]
      errors.add(:kind, "invalid kind of income") unless kinds.any? { |x| kind == x }
    end
  end
end
