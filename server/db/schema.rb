# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160516150719) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "applicants", force: :cascade do |t|
    t.string "first_name"
    t.string "middle_name"
    t.string "last_name"
    t.string "phone"
    t.string "email"
    t.date   "birthdate"
    t.string "ssn"
    t.string "marital_status"
  end

  create_table "applications", force: :cascade do |t|
    t.string  "loan_type"
    t.decimal "loan_amount"
    t.integer "borrower_id"
    t.integer "coborrower_id"
    t.index ["borrower_id"], name: "index_applications_on_borrower_id", using: :btree
    t.index ["coborrower_id"], name: "index_applications_on_coborrower_id", using: :btree
  end

end
