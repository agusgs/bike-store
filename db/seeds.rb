#Awesome bike
awesome_bike = Product.create!({ name: "Awesome Bike", available: true, price_in_cents: 12312 })

red = Customization.create!(name: "Red", option_type: Customization::OPTION)
blue = Customization.create!(name: "Blue", option_type: Customization::OPTION)
rim_color = Customization.create!(name: "Rim color", customizations: [red, blue], option_type: Customization::OPTION)
wheel_size_12 = Customization.create!(name: "Size: 12", customizations: [rim_color], option_type: Customization::CONTAINER, price_in_cents: 1200)

red = Customization.create!(name: "Red", option_type: Customization::OPTION)
blue = Customization.create!(name: "Blue", option_type: Customization::OPTION)
rim_color = Customization.create!(name: "Rim color", customizations: [red, blue], option_type: Customization::OPTION)
wheel_size_15 = Customization.create!(name: "Size: 15", customizations: [rim_color], option_type: Customization::CONTAINER, price_in_cents: 1800)

red = Customization.create!(name: "Red", option_type: Customization::OPTION)
blue = Customization.create!(name: "Bue", option_type: Customization::OPTION)
green = Customization.create!(name: "Green", option_type: Customization::OPTION)
rim_color = Customization.create!(name: "Rim color", customizations: [red, blue, green], option_type: Customization::OPTION)
wheel_size_20 = Customization.create!(name: "Size: 20", customizations: [rim_color], option_type: Customization::CONTAINER, price_in_cents: 2000)

CustomizableArea.create!(name: "Wheels", product: awesome_bike, customizations: [wheel_size_12, wheel_size_20, wheel_size_15])

plastic_mudguard = Customization.create!(name: "Plastic", option_type: Customization::OPTION, price_in_cents: 900)

red = Customization.create!(name: "Color red", option_type: Customization::OPTION)
green = Customization.create!(name: "Color green", option_type: Customization::OPTION)
metal_mudguard = Customization.create!(name: "Metal", customizations: [red, green], option_type: Customization::OPTION, price_in_cents: 2100)

CustomizableArea.create!(name: "Mudguards", product: awesome_bike, customizations: [plastic_mudguard, metal_mudguard])

#Mountain Bike
mountain_bike = Product.create!({ name: "Mountain Bike", available: true, price_in_cents: 23435 })

red = Customization.create!(name: "Red", option_type: Customization::OPTION)
green = Customization.create!(name: "Green", option_type: Customization::OPTION)
background_color = Customization.create!(name: "Background color", customizations: [green, red], option_type: Customization::OPTION)

red = Customization.create!(name: "Red", option_type: Customization::OPTION)
pattern_color = Customization.create!(name: "Pattern color", customizations: [red], option_type: Customization::OPTION)

with_pattern = Customization.create!(name: "With spotted pattern", customizations: [background_color, pattern_color], option_type: Customization::CONTAINER, price_in_cents: 1700)

green = Customization.create!(name: "Green", option_type: Customization::OPTION)
rim_color = Customization.create!(name: "Rim color", customizations: [green, with_pattern], option_type: Customization::OPTION)
wheel_size_17 = Customization.create!(name: "Size: 17", customizations: [rim_color], option_type: Customization::CONTAINER, price_in_cents: 1800)

red = Customization.create!(name: "Red", option_type: Customization::OPTION)
blue = Customization.create!(name: "Bue", option_type: Customization::OPTION)
green = Customization.create!(name: "Green", option_type: Customization::OPTION)
rim_color = Customization.create!(name: "Rim color", customizations: [red, blue, green], option_type: Customization::OPTION)
wheel_size_20 = Customization.create!(name: "Size: 20", customizations: [rim_color], option_type: Customization::CONTAINER, price_in_cents: 2000)

CustomizableArea.create!(name: "Wheels", product: mountain_bike, customizations: [wheel_size_17, wheel_size_20])

plastic_mudguard = Customization.create!(name: "Plastic", option_type: Customization::OPTION, price_in_cents: 900)
CustomizableArea.create!(name: "Mudguards", product: mountain_bike, customizations: [plastic_mudguard])

with_suspension = Customization.create!(name: "With Suspension", option_type: Customization::OPTION, price_in_cents: 3000)
CustomizableArea.create!(name: "Suspension", product: mountain_bike, customizations: [with_suspension])

Product.create!(name: "Old Bike", available: false, price_in_cents: 10)
