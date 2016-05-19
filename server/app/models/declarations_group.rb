class DeclarationsGroup < ApplicationRecord
  belongs_to :applicant
  validates_presence_of :a, :b, :c, :d, :e, :f, :g, :h, :i, :j, :k, :l
end
