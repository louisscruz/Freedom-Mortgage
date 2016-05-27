require 'test_helper'

class ApplicationTest < ActiveSupport::TestCase
  def setup
    @app = applications(:one)
  end

  test "should require a borrower" do
    @app.borrower_id = nil
    assert_not @app.save
  end

  test "should require a borrower marital status" do
    @app.borrower.marital_status = nil
    assert_not @app.save
  end

  test "should require borrower address" do
    @app.borrower.address = nil
    assert_not @app.save
  end

  test "should copy address from borrower if no address" do
    @app.loan_type = "refinance"
    assert @app.save
    assert_equal @app.borrower.address.street_address, @app.address.street_address
  end

  test "should copy address from borrower to coborrower if no address" do
    assert @app.save
    assert_equal @app.borrower.address.street_address, @app.coborrower.address.street_address
  end

  test "should require borrower jobs" do
    @app.borrower.jobs = []
    assert_not @app.save
  end

  test "should successfully save valid application" do
    assert @app.save
  end
end
