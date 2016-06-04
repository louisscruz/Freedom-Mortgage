require 'test_helper'

class LiabilityTest < ActiveSupport::TestCase
  def setup
    @liability = liabilities(:one)
  end

  test "should require a description" do
    @liability.description = nil
    assert_not @liability.save
  end

  test "should require a value" do
    @liability.balance = nil
    assert_not @liability.save
  end

  test "should successfully save when valid" do
    assert @liability.save
  end
end
