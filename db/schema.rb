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

ActiveRecord::Schema.define(version: 2021_05_22_032801) do

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
    t.bigint "parent_id"
    t.index ["parent_id"], name: "index_customizations_on_parent_id"
  end

  create_table "order_customizations", force: :cascade do |t|
    t.bigint "customization_id", null: false
    t.bigint "parent_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["customization_id"], name: "index_order_customizations_on_customization_id"
    t.index ["parent_id"], name: "index_order_customizations_on_parent_id"
  end

  create_table "order_customized_area_customizations", force: :cascade do |t|
    t.bigint "order_customized_area_id", null: false
    t.bigint "order_customization_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["order_customization_id"], name: "idx_order_customized_area_customizations_on_oc_id"
    t.index ["order_customized_area_id", "order_customization_id"], name: "idx_order_customized_area_customizations_on_oc_id_and_oca_id", unique: true
    t.index ["order_customized_area_id"], name: "idx_order_customized_area_customizations_on_oca_id"
  end

  create_table "order_customized_areas", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.bigint "customizable_area_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["customizable_area_id"], name: "index_order_customized_areas_on_customizable_area_id"
    t.index ["order_id"], name: "index_order_customized_areas_on_order_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.string "client_name", null: false
    t.string "client_lastname", null: false
    t.string "client_email", null: false
    t.string "status", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["product_id"], name: "index_orders_on_product_id"
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
  add_foreign_key "customizations", "customizations", column: "parent_id"
  add_foreign_key "order_customizations", "customizations"
  add_foreign_key "order_customizations", "order_customizations", column: "parent_id"
  add_foreign_key "order_customized_area_customizations", "order_customizations"
  add_foreign_key "order_customized_area_customizations", "order_customized_areas"
  add_foreign_key "order_customized_areas", "customizable_areas"
  add_foreign_key "order_customized_areas", "orders"
  add_foreign_key "orders", "products"
end
