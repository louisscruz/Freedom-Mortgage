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

  test "should successfully save valid application" do
    assert @app.save
  end
end
