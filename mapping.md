#For loan_type, have two fields, purchase (1190) and refinance (1193)

:loan_type,
:loan_amount, 11
borrower_attributes: [
  :first_name, 100
  :middle_name, 117
  :last_name, 101
  :birthdate, 118
  :phone,106
  :email, 112
  :ssn, 108
  :marital_status,
  address_attributes: [
    :street_address, 102
    :city, 103
    :state, 104
    :zip 105
    (:country 115)
  ],
  jobs_attributes: [
    :self_employed,
    :company,
    :phone,
    :years,
    :months,
    :years_in_field,
    address_attributes: [
      :street_address,
      :city,
      :state,
      :zip
    ]
  ],
  # For incomes, loop through each income and map it according to the appropriate kind: []
  incomes_attributes: [
    :amount,
    :kind
  ],
  expenses_attributes: [
    :amount,
    :kind
  ],
  assets_attributes: [
    :description,
    :value
  ],
  cars_attributes: [
    :description,
    :value
  ],
  liabilities_attributes: [
    :description,
    :balance
  ],
  alimonies_attributes: [
    :description,
    :payment
  ],
  declarations_group_attributes: [
    :a, :b, :c, :d, :e, :f, :g, :h, :i, :j, :k, :l, :m, :m1, :m2, :explanations
  ],
  opportunity_group_attributes: [
    :decline,
    :ethnicity,
    :race,
    :sex
  ]
],
coborrower_attributes: [
  :first_name,
  :middle_name,
  :last_name,
  :birthdate,
  :phone,
  :email,
  :ssn,
  address_attributes: [
    :street_address,
    :city,
    :state,
    :zip
  ],
  jobs_attributes: [
    :self_employed,
    :company,
    :phone,
    :years,
    :months,
    :years_in_field,
    address_attributes: [
      :street_address,
      :city,
      :state,
      :zip
    ]
  ],
  incomes_attributes: [
    :amount,
    :kind
  ],
  expenses_attributes: [
    :amount,
    :kind
  ],
  assets_attributes: [
    :description,
    :value
  ],
  cars_attributes: [
    :description,
    :value
  ],
  liabilities_attributes: [
    :description,
    :balance
  ],
  alimonies_attributes: [
    :description,
    :payment
  ],
  declarations_group_attributes: [
    :a, :b, :c, :d, :e, :f, :g, :h, :i, :j, :k, :l, :m, :m1, :m2, :explanations
  ],
  opportunity_group_attributes: [
    :decline,
    :ethnicity,
    :race,
    :sex
  ]
]
