require 'test_helper'

class JobTest < ActiveSupport::TestCase
  def setup
    @job = jobs(:freedom_mortgage)
  end

  test "should require self_employed" do
    @job.self_employed = nil
    assert_not @job.save
  end

  test "should require company" do
    @job.company = nil
    assert_not @job.save
  end

  test "should require phone" do
    @job.phone = nil
    assert_not @job.save
  end

  test "should require address" do
    @job.address = nil
    assert_not @job.save
  end

  test "should require years" do
    @job.years = nil
    assert_not @job.save
  end

  test "should require months" do
    @job.months = nil
    assert_not @job.save
  end

  test "should require history to be greater than zero" do
  end

  test "should require years_in_field" do
    @job.years_in_field = nil
    assert_not @job.save
  end

  test "should save when valid" do
    p @job
    assert @job.save
  end
end
