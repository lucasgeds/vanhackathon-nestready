require 'test_helper'

class MortgagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @mortgage = mortgages(:townes)
  end

  test "should show mortgage" do
    get mortgage_url(@mortgage)
    assert_response :success
  end
end
