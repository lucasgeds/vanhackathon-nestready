# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#

Mortgage.create(
  borrower: "Frederick Townes",
  property: "Townes's Home",
  address: "12, rue Sainte-Anne Québec, QC",
  credit_amount: 500_000.0,
  installment_amount: 1750.0,
  installments_number: 360,
  installments_left: 300,
  interest_percentage: 0.26,
  total_amount: 630_000.0
)
