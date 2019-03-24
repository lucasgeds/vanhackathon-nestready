require 'test_helper'

class MortgagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @mortgage = mortgages(:townes)
  end

  test "should show mortgage" do
    get mortgage_url(@mortgage)
    assert_response :success
  end

  test "should show mortgage json" do
    get "/mortgages/#{@mortgage.id}.json"
    assert_response :success
    assert_equal(
      @mortgage.to_json,
      @response.body
    )
  end
end
