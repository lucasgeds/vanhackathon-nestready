class CreateMortgages < ActiveRecord::Migration[5.2]
  def change
    create_table :mortgages do |t|
      t.string  :borrower
      t.string  :property
      t.string  :address
      t.string  :image_url
      t.float   :credit_amount
      t.float   :installment_amount
      t.integer :installments_number
      t.integer :installments_left
      t.float   :interest_percentage
      t.float   :total_amount

      t.timestamps
    end
  end
end
