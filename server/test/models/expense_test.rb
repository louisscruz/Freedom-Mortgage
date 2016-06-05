require 'test_helper'

class ExpenseTest < ActiveSupport::TestCase
  def setup
    @expense = expenses(:one)
  end

  test "should require amount" do
    @expense.amount = nil
    assert_not @expense.save
  end

  test "should require kind" do
    @expense.kind = nil
    assert_not @expense.save
  end

  test "should only allow correct kinds" do
    @expense.kind = "incorrect_kind"
    assert_not @expense.save
  end

  test "should successfully save when valid" do
    assert @expense.save
  end
end
