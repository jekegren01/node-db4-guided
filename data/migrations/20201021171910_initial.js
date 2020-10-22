
exports.up = async function(knex) {
    await knex.schema.createTable("zoos", (table) => {
        table.increments("id")
        table.text("name").notNull()
        table.text("address").notNull().unique()
    })

    await knex.schema.createTable("species", (table) => {
        table.increments("id")
        table.text("name").notNull().unique()
    })

    await knex.schema.createTable("animals", (table) => {
        table.increments("id")
        table.text("name").notNull()
        table
            .integer("species_id")  //should match the data type of the column its referencing
            .references("id")         // creates the foreign key
            .inTable("species")
            // use to reset a foreign key when deleted
            .onDelete("SET NULL")
            .onUpdate("CASCADE")
    })

    await knex.schema.createTable("zoos_animals", (table) => {
        table
            .integer("zoo_id")
            .references("id")
            .inTable("zoos")
            //use to cascade deleting every relationship when the primary is deleted
            .onDelete("CASCADE")
            //use to cascade updating every relationship when the primary is updated
            .onUpdate("CASCADE")
            .notNull()
        table
            .integer("animal_id")
            .references("id")
            .inTable("animals")
            //use to cascade deleting every relationship when the primary is deleted
            .onDelete("CASCADE")
            //use to cascade updating every relationship when the primary is updated
            .onUpdate("CASCADE")
            .notNull()
        table
            .date("arrival")
            .notNull()
            .defaultTo(knex.raw("current_timestamp"))  //defaults to the current date at the time the row is inserted
        table.date("departure")
        // make the primary key of this table a combination of two columns,
        // rather than a specific "id" column
        table.primary(["zoo_id", "animal_id"])
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("zoos_animals")
    await knex.schema.dropTableIfExists("animals")
    await knex.schema.dropTableIfExists("species")
    await knex.schema.dropTableIfExists("zoos")
};
