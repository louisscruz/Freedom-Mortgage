require 'test_helper'

class DeclarationsGroupTest < ActiveSupport::TestCase
  def setup
    @declarations_group = declarations_groups(:one)
  end

  test "should save valid declarations_group" do
    assert @declarations_group.save
  end
end
