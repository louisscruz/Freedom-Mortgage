require 'test_helper'

class CarTest < ActiveSupport::TestCase
  def setup
    @car = cars(:one)
  end

  test "should require a description" do
    @car.description = nil
    assert_not @car.save
  end

  test "should require a value" do
    @car.value = nil
    assert_not @car.save
  end

  test "should successfully save when valid" do
    assert @car.save
  end
end
