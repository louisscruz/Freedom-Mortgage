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

  test "should successfully save valid applicant" do
    assert @applicant.save
  end
end
