
exports.up = function(knex) {
    return knex.schema.createTable('incidents',function (table){
        table.increments('chave').primary(); //primary key
        
        //campos da tabela
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('ong_id').notNullable(); 
        
        table.foreign('ong_id').references('id').inTable('ongs'); //foreign key
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
