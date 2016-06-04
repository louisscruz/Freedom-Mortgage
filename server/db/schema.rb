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

ActiveRecord::Schema.define(version: 20160604182152) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string   "street_address",   null: false
    t.string   "city",             null: false
    t.string   "state",            null: false
    t.integer  "zip",              null: false
    t.string   "addressable_type"
    t.integer  "addressable_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["addressable_type", "addressable_id"], name: "index_addresses_on_addressable_type_and_addressable_id", using: :btree
  end

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

  create_table "assets", force: :cascade do |t|
    t.text     "description",  null: false
    t.decimal  "value",        null: false
    t.integer  "applicant_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["applicant_id"], name: "index_assets_on_applicant_id", using: :btree
  end

  create_table "cars", force: :cascade do |t|
    t.text     "description",  null: false
    t.decimal  "value",        null: false
    t.integer  "applicant_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["applicant_id"], name: "index_cars_on_applicant_id", using: :btree
  end

  create_table "declarations_groups", force: :cascade do |t|
    t.boolean  "a",            null: false
    t.boolean  "b",            null: false
    t.boolean  "c",            null: false
    t.boolean  "d",            null: false
    t.boolean  "e",            null: false
    t.boolean  "f",            null: false
    t.boolean  "g",            null: false
    t.boolean  "h",            null: false
    t.boolean  "i",            null: false
    t.boolean  "j",            null: false
    t.boolean  "k",            null: false
    t.boolean  "l",            null: false
    t.boolean  "m",            null: false
    t.boolean  "m1"
    t.boolean  "m2"
    t.text     "explanations"
    t.integer  "applicant_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["applicant_id"], name: "index_declarations_groups_on_applicant_id", using: :btree
  end

  create_table "jobs", force: :cascade do |t|
    t.boolean  "self_employed",  null: false
    t.string   "company",        null: false
    t.string   "phone",          null: false
    t.integer  "years",          null: false
    t.integer  "months",         null: false
    t.integer  "years_in_field", null: false
    t.integer  "applicant_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["applicant_id"], name: "index_jobs_on_applicant_id", using: :btree
  end

  create_table "opportunity_groups", force: :cascade do |t|
    t.boolean  "decline",      null: false
    t.string   "ethnicity"
    t.string   "race"
    t.string   "sex"
    t.integer  "applicant_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["applicant_id"], name: "index_opportunity_groups_on_applicant_id", using: :btree
  end

end
