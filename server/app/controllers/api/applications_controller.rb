class Api::ApplicationsController < ApplicationController

  def index
    @applications = Application.all

    render json: @applications
  end

  def show

  end

  def create
    @application = Application.new(application_params)

    if @application.save
      AppMailer.new_application(@application).deliver_now
      render json: @application, status: :created
    else
      p @application.errors
      render json: @application.errors, status: :unprocessable_entity
    end
  end

  private

  def application_params
    params.require(:application).permit(
      :loan_type,
      :loan_amount,
      borrower_attributes: [
        :first_name,
        :middle_name,
        :last_name,
        :birthdate,
        :phone,
        :email,
        :ssn,
        :marital_status,
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
        expense_attributes: [
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
        expense_attributes: [
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
    )
  end
end
