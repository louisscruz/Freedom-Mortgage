require 'test_helper'

class OpportunityGroupTest < ActiveSupport::TestCase
  def setup
    @opportunity_group = opportunity_groups(:one)
  end

  test "should require decline value" do
    @opportunity_group.decline = nil
    assert_not @opportunity_group.save
  end
end
