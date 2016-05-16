require 'test_helper'

class AddressTest < ActiveSupport::TestCase
  def setup
    @address = addresses(:one)
  end

  test "should require street address" do
    @address.street_address = nil
    assert_not @address.save
  end

  test "should require city" do
    @address.city = nil
    assert_not @address.save
  end

  test "should require state" do
    @address.state = nil
    assert_not @address.save
  end

  test "should require zip" do
    @address.zip = nil
    assert_not @address.save
  end

  test "should successfully save valid address" do
    assert @address.save
  end
end
