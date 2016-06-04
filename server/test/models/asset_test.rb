require 'test_helper'

class AssetTest < ActiveSupport::TestCase
  def setup
    @asset = assets(:one)
  end

  test "should require a description" do
    @asset.description = nil
    assert_not @asset.save
  end

  test "should require a value" do
    @asset.value = nil
    assert_not @asset.save
  end

  test "should successfully save when valid" do
    assert @asset.save
  end
end
