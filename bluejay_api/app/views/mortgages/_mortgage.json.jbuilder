json.extract! mortgage, :id, :borrower :property :address :image_url :credit_amount :installment_amount :installments_number :installments_left :interest_percentage :total_amount
json.url mortgage_url(mortgage, format: :json)
