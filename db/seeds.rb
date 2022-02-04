# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


# Add a console message so we can see output when the seed file runs
puts "Seeding parts..."


puts "Seeding clients..."

Client.create(name: "Archstone Apartments", phone: "281-555-4156")
Client.create(name: "The Viewpoint", phone: "713-555-7777")
Client.create(name: "Academy Condominiums", phone: "281-555-9876")
Client.create(name: "Larry Couchman", phone: "281-555-3146")
Client.create(name: "Oporto Restaurant", phone: "713-555-3233")


puts "Seeding employees..."


puts "Seeding items..."


puts "Seeding jobs..."


puts "Seeding item_jobs..."



# run a loop 50 times
50.times do
  # create a game with random data
  Game.create(
    title: Faker::Game.title,
    genre: Faker::Game.genre,
    platform: Faker::Game.platform,
    price: rand(0..60) # random number between 0 and 60
  )
end

puts "Data seeded!"