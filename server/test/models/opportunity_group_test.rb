require 'test_helper'

class OpportunityGroupTest < ActiveSupport::TestCase
  def setup
    @opportunity_group = opportunity_groups(:one)
  end

  test "should not require ethnicity if decline is true" do
    @opportunity_group.decline = true
    @opportunity_group.ethnicity = nil
    assert @opportunity_group.save
  end

  test "should not require race if decline is true" do
    @opportunity_group.decline = true
    @opportunity_group.race = nil
    assert @opportunity_group.save
  end

  test "should not require sex if decline is true" do
    @opportunity_group.decline = true
    @opportunity_group.ethnicity = nil
    assert @opportunity_group.save
  end

  test "should require ethnicity if decline is false" do
    @opportunity_group.ethnicity = nil
    assert_not @opportunity_group.save
  end

  test "should require race if decline is false" do
    @opportunity_group.race = nil
    assert_not @opportunity_group.save
  end

  test "should require sex if decline is false" do
    @opportunity_group.sex = nil
    assert_not @opportunity_group.save
  end

  test "should successfully save valid opportunity_group" do
    assert @opportunity_group.save
  end
end
