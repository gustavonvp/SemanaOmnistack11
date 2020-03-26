//utilização da conexao para aplicar inserções no BD 
const connection = require('../database/connection'); 

//Utilização modulo de criptografia do express
const crypto = require('crypto');


module.exports = {
    
    async index (req,res){
        //através do objeto connection, seleciona(listar) todos objetos (ong's)
    const ongs = await connection('ongs').select('*'); 
    return res.json(ongs); //retorna as ongs
    },

    async create(req,res) {
        const { name, email, whatsapp, city, uf} = req.body; //desestruturação do objeto

        const id = crypto.randomBytes(4).toString('HEX');
    
        //através do objeto connection, inserção de elemento(ong)
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    });
    
        return res.json( { id }); //retorna o ID criptografado(anteriormente) como se fosse um cpf para ong se conectar.
    }
}