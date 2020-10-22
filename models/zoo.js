const db = require("../data/config")

function find() {
	return db("zoos")
}

function findById(id) {
	return db("zoos")
		.where("id", id)
		.first()
}

//added function from lecture

function findZooAnimals(zooID) {
// 	select animals.*
// from zoos_animals
// join zoos on zoos_animals.zoo_id = zoos.id
// join animals on zoos_animals.animal_id = animals.id
// join species on animals.species_id = species.id
// where zoos.id = 1;

	return db("zoos_animals as za")
		.innerJoin("zoos as z", "z.id", "za.zoo_id")
		.innerJoin("animals as a", "a.id", "za.animal_id")
		.innerJoin("species as s", "s.id", "a.species_id")
		.where("z.id", zooID)
		.select([
			"a.*",
			"a.name",
			"za.arrival",
			"za.departure",
			"s.name as species_name"
		])
}

module.exports = {
	find,
	findById,
	findZooAnimals
}