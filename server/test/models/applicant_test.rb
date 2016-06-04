require 'test_helper'

class ApplicantTest < ActiveSupport::TestCase
  def setup
    @applicant = applicants(:louis)
  end

  test "should require first name" do
    @applicant.first_name = nil
    assert_not @applicant.save
  end

  test "should not require middle name" do
    @applicant.middle_name = nil
    assert @applicant.save
  end

  test "should require last name" do
    @applicant.last_name = nil
    assert_not @applicant.save
  end

  test "should require phone" do
    @applicant.phone = nil
    assert_not @applicant.save
  end

  test "should require email" do
    @applicant.email = nil
    assert_not @applicant.save
  end

  test "should require birthdate" do
    @applicant.birthdate = nil
    assert_not @applicant.save
  end

  test "should require ssn" do
    @applicant.ssn = nil
    assert_not @applicant.save
  end

  test "should not require marital status" do
    @applicant.marital_status = nil
    assert @applicant.save
  end

  test "should not allow more than three cars" do
    fourth_car = Car.create(description: "text", value: 19.99, applicant: @applicant)
    assert_not @applicant.save
    fourth_car.destroy
    @applicant.reload
    assert @applicant.save
  end

  test "should not allow more than four assets" do
    fifth_asset = Asset.create(description: "text", value: 99.99, applicant: @applicant)
    assert_not @applicant.save
    fifth_asset.destroy
    @applicant.reload
    assert @applicant.save
  end

  test "should not allow more than eight liabilities" do
    ninth_liability = Liability.create(description: "text", balance: 99.99, applicant: @applicant)
    assert_not @applicant.save
    ninth_liability.destroy
    @applicant.reload
    assert @applicant.save
  end

  test "should not allow more than three alimonies" do
    fourth_alimony = Alimony.create(description: "text", payment: 9.99, applicant: @applicant)
    assert_not @applicant.save
    fourth_alimony.destroy
    @applicant.reload
    assert @applicant.save
  end

  test "should require a declarations group" do
    @applicant.declarations_group = nil
    assert_not @applicant.save
  end

  test "should require an opportunity group" do
    @applicant.opportunity_group = nil
    assert_not @applicant.save
  end

  test "should successfully save valid applicant" do
    assert @applicant.save
  end
end
