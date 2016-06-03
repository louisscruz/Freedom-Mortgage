require 'test_helper'

class AssetsGroupTest < ActiveSupport::TestCase
  def setup
    @asset_group = assets_groups(:one)
  end

  test "should require that assets have descriptions" do
    @asset_group.description = nil
    assert_not @asset_group.save
  end

  test "should require that assets have value" do
    @asset_group.value = nil
    assert_not @asset_group.save
  end

  test "should successfully save valid asset group" do
    assert @asset_group.save
  end
end
