
puts "Seeding parts..."

        Part.create(
            description: '1" Ball Valve',
            manufacturer: 'Viega',
            category: 'valve',
            price: 54.36,
            part_number: Faker::Number.unique.number(digits: 6)
        )

        Part.create(
            description: '1" Ball Valve',
            manufacturer: 'SharkBite',
            category: 'valve',
            price: 62.27,
            part_number: Faker::Number.unique.number(digits: 6)
        )

        Part.create(
            description: '1/2" Hose Bibb',
            manufacturer: 'Arrowhead',
            category: 'valve',
            price: 25.32,
            part_number: Faker::Number.unique.number(digits: 6)
        )

        Part.create(
            description: '1/2" Butterfly Valve',
            manufacturer: 'Sharkbite',
            category: 'valve',
            price: 36.23,
            part_number: Faker::Number.unique.number(digits: 6)
        )

        Part.create(
            description: '2" Gate Valve',
            manufacturer: 'Legend',
            category: 'valve',
            price: 260.42,
            part_number: Faker::Number.unique.number(digits: 6)
        )

        Part.create(
            description: '2" Slip Coupling',
            manufacturer: 'Sharkbite',
            category: 'fitting',
            price: 144.94,
            part_number: Faker::Number.unique.number(digits: 6)
        )

        Part.create(
            description: '3/8" Elbow Adapter',
            manufacturer: 'Elkay',
            category: 'fitting',
            price: 8.11,
            part_number: Faker::Number.unique.number(digits: 6)
        )

        Part.create(
            description: '90 deg Elbow, 1"',
            manufacturer: 'Viega',
            category: 'fitting',
            price: 34,
            part_number: Faker::Number.unique.number(digits: 6)
        )

        Part.create(
            description: '1-1/2" Copper Union',
            manufacturer: 'Viega',
            category: 'fitting',
            price: 62,
            part_number: Faker::Number.unique.number(digits: 6)
        )

        Part.create(
            description: '4" x 10\' PVC Pipe',
            manufacturer: 'JM Eagle',
            category: 'pipe',
            price: 18.93,
            part_number: Faker::Number.unique.number(digits: 6)
        )

        Part.create(
            description: '2" PVC P-Trap',
            manufacturer: 'Charlotte Pipe',
            category: 'pipe',
            price: 5.28,
            part_number: Faker::Number.unique.number(digits: 6)
        )

        Part.create(
            description: '1" x 24" PVC Pipe',
            manufacturer: 'Charlotte Pipe',
            category: 'pipe',
            price: 4.46,
            part_number: Faker::Number.unique.number(digits: 6)
        )

        Part.create(
            description: '1-1/2" x 2" PVC Reducer Coupling',
            manufacturer: 'JM Eagle',
            category: 'pipe',
            price: 1.74,
            part_number: Faker::Number.unique.number(digits: 6)
        )

        Part.create(
            description: '3 to 5" Hose Clamp',
            manufacturer: 'Everbilt',
            category: 'fitting',
            price: 3.18,
            part_number: Faker::Number.unique.number(digits: 6)
        )

        Part.create(
            description: '1-3/4" to 2-3/4" Hose Clamp',
            manufacturer: 'Viega',
            category: 'fitting',
            price: 2.45,
            part_number: Faker::Number.unique.number(digits: 6)
        )

        Part.create(
            description: '6" Galvanized Worm Gear Clamp',
            manufacturer: 'Elkay',
            category: 'fitting',
            price: 2.48,
            part_number: Faker::Number.unique.number(digits: 6)
        )

puts "Seeding clients..."

        Client.create(name: "Archstone Apartments", phone: "281-555-4156")
        Client.create(name: "The Viewpoint", phone: "713-555-7777")
        Client.create(name: "Academy Condominiums", phone: "281-555-9876")
        Client.create(name: "Larry Couchman", phone: "281-555-3146")
        Client.create(name: "Oporto Restaurant", phone: "713-555-3233")


puts "Seeding employees..."
positions = ["plumber", "plumber", "plumber", "plumber", "plumber", "assistant", "manager"]

        20.times do
            # create a game with random data
            Employee.create(
                name: Faker::Name.unique.name,
                position: positions[rand(positions.length)],
                admin: false,
                password_digest: BCrypt::Password.create('123')
            )
        end

        Employee.create(
                name: "Kilgore Trout",
                position: "director",
                admin: true,
                password_digest: BCrypt::Password.create('123')
        )

        Employee.create(
                name: "I. Teeguy",
                position: "IT",
                admin: true,
                password_digest: BCrypt::Password.create('123')
        )


puts "Seeding items..."

bins = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

        50.times do
            # create an item with random data
            Item.create(
                ## Arbitrary number of bins: 12
                bin: bins[rand(0..11)],
                active: true,
                ## Based on 16 parts seeded above
                part_id: rand(1..16),
            )
        end


puts "Seeding job..."

        Job.create(
            name: "Fix the leak",
            client_id: 1,
            employee_id: 1,
            job_is_active: true
        )


puts "Data seeded!"