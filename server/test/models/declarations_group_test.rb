require 'test_helper'

class DeclarationsGroupTest < ActiveSupport::TestCase
  def setup
    @declarations_group = declarations_groups(:one)
  end

  ('a'..'l').to_a.each do |x|
    test "should required #{x}" do
      @declarations_group[x] = nil
      assert_not @declarations_group.save
    end
  end
end
