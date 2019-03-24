require "test_helper"

class MortgagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @mortgage = mortgages(:townes)
  end

  test "should render requested Mortgate json" do
    get mortgage_url(@mortgage)
    assert_response :success

    expected_json = {
      borrower: "Frederick Watson",
      property: "Townes Home",
      address: "12, rue Sainte-Anne Québec, QC",
      amount: 500_000.0,
      installments: 360,
      installment_amount: 1388.0
    }.to_json

    assert_equal expected_json, @response.body
  end
end
