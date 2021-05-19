#PRODUCTS
awesome_bike = Product.create!({ name: "Awesome Bike", available: true, price_in_cents: 12312 })
mountain_bike = Product.create!({ name: "Mountain Bike", available: true, price_in_cents: 23435 })
Product.create!({ name: "Old Bike", available: false })

#CUSTOMIZATIONS
red = Customization.create!(name: "Color red", option_type: Customization::OPTION)
blue = Customization.create!(name: "Color lue", option_type: Customization::OPTION)
green = Customization.create!(name: "Color green", option_type: Customization::OPTION)

background_color = Customization.create!(name: "Background color", children: [green, red], option_type: Customization::OPTION)
pattern_color = Customization.create!(name: "Pattern color", children: [red], option_type: Customization::OPTION)
with_pattern = Customization.create!(name: "With spotted pattern", children: [background_color, pattern_color], option_type: Customization::CONTAINER, price_in_cents: 1700)

wheel_size_12 = Customization.create!(name: "Size: 12", children: [red, blue], option_type: Customization::OPTION, price_in_cents: 1200)
wheel_size_20 = Customization.create!(name: "Size: 20", children: [red, green, blue], option_type: Customization::OPTION, price_in_cents: 2000)
wheel_size_17 = Customization.create!(name: "Size: 17", children: [green, with_pattern], option_type: Customization::OPTION, price_in_cents: 1800)

plastic_mudguard = Customization.create!(name: "Plastic", option_type: Customization::OPTION, price_in_cents: 900)
metal_mudguard = Customization.create!(name: "Metal", children: [red, green], option_type: Customization::OPTION, price_in_cents: 2100)

with_suspension = Customization.create!(name: "With Suspension", option_type: Customization::OPTION, price_in_cents: 3000)

#CUSTOMIZABLE AREAS
ab_wheels = CustomizableArea.create!(name: "Wheels", product: awesome_bike, customizations: [wheel_size_12, wheel_size_20])
ab_mudguard = CustomizableArea.create!(name: "Mudguards", product: awesome_bike, customizations: [plastic_mudguard, metal_mudguard])
mb_wheels = CustomizableArea.create!(name: "Wheels", product: mountain_bike, customizations: [wheel_size_17, wheel_size_20])
mb_mudguards = CustomizableArea.create!(name: "Mudguards", product: mountain_bike, customizations: [plastic_mudguard])
mb_suspension = CustomizableArea.create!(name: "Suspension", product: mountain_bike, customizations: [with_suspension])