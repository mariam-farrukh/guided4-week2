
exports.up = function(knex) {
  return knex.schema
    .createTable('zoos', tbl => {
        tbl.increments();
        tbl.string('zoo_name', 255).notNullable();
        tbl.string('address').unique();
    })
    .createTable('species', tbl => {
        tbl.increments();
        tbl.string('species_name', 128).unique();
    })
    .createTable('animals', tbl => {
        tbl.increments();
        tbl.string('animal_name', 255).notNullable();
        tbl.integer('species_id').unsigned().refernces('id').inTable('species');
    })
    .createTable('zoo_animals', tbl => {
        tbl.integer('zoo_id').unsigned().refernces('id').inTable('zoos');
        tbl.integer('animal_id').unsigned().refernces('id').inTable('animals');

        tbl.primary(['zoo_id', 'animal_id']);
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('zoo_animals')
    .dropTableIfExists('animals')
    .dropTableIfExists('species')
    .dropTableIfExists('zoos');
};
