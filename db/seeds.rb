
#PRODUCTS
awesome_bike = Product.create!({ name: "Awesome Bike", available: true})
mountain_bike = Product.create!({ name: "Mountain Bike", available: true})
Product.create!({ name: "Old Bike", available: false})

#CUSTOMIZABLE AREAS
CustomizableArea.create!(name: "Wheels", product: awesome_bike)
CustomizableArea.create!(name: "Mudguards", product: awesome_bike)
CustomizableArea.create!(name: "Wheels", product: mountain_bike)
CustomizableArea.create!(name: "Mudguards", product: mountain_bike)
CustomizableArea.create!(name: "Suspension", product: mountain_bike)
