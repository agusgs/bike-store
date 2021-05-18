# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_18_145339) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "available_customizations", force: :cascade do |t|
    t.bigint "customizable_area_id", null: false
    t.bigint "customization_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["customizable_area_id", "customization_id"], name: "idx_available_customization_on_caid_and_cid", unique: true
    t.index ["customizable_area_id"], name: "index_available_customizations_on_customizable_area_id"
    t.index ["customization_id"], name: "index_available_customizations_on_customization_id"
  end

  create_table "customizable_areas", force: :cascade do |t|
    t.string "name"
    t.bigint "product_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["product_id"], name: "index_customizable_areas_on_product_id"
  end

  create_table "customizations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "option_type", default: "option", null: false
    t.integer "price_in_cents", default: 0, null: false
  end

  create_table "dependant_customizations", force: :cascade do |t|
    t.bigint "customization_id", null: false
    t.bigint "child_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["child_id"], name: "index_dependant_customizations_on_child_id"
    t.index ["customization_id", "child_id"], name: "index_dependant_customizations_on_customization_id_and_child_id", unique: true
    t.index ["customization_id"], name: "index_dependant_customizations_on_customization_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.boolean "available"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "price_in_cents", default: 0, null: false
  end

  add_foreign_key "available_customizations", "customizable_areas"
  add_foreign_key "available_customizations", "customizations"
  add_foreign_key "customizable_areas", "products"
  add_foreign_key "dependant_customizations", "customizations"
  add_foreign_key "dependant_customizations", "customizations", column: "child_id"
end
