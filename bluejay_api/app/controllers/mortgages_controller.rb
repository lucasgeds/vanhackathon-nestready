class MortgagesController < ApplicationController
  def show
    render json: {
      borrower: "Frederick Watson",
      property: "Townes Home",
      address: "12, rue Sainte-Anne Québec, QC",
      amount: 500_000.0,
      installments: 360,
      installment_amount: 1388.0
    }
  end
end
