require 'test_helper'

class IncomeTest < ActiveSupport::TestCase
  def setup
    @income = incomes(:one)
  end

  test "should require value" do
    @income.amount = nil
    assert_not @income.save
  end

  test "should require kind" do
    @income.kind = nil
    assert_not @income.save
  end

  test "should validate the kinds of incomes" do
    @income.kind = "something_wrong"
    assert_not @income.save
    kinds = ["income", "overtime", "bonuses", "commissions", "interest", "rental", "other"]
    kinds.each do |x|
      @income.kind = x
      assert @income.save
    end
  end

  test "should successfully save when valid" do
    assert @income.save
  end
end
