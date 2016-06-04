require 'test_helper'

class AlimonyTest < ActiveSupport::TestCase
  def setup
    @alimony = alimonies(:one)
  end

  test "should require a description" do
    @alimony.description = nil
    assert_not @alimony.save
  end

  test "should require a payment" do
    @alimony.payment = nil
    assert_not @alimony.save
  end

  test "should successfully save when valid" do
    assert @alimony.save
  end
end
