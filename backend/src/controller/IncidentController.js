const connection = require('../database/connection');
 
module.exports = {
async index(req, res) {
    const {page = 1} = req.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
    .join('ongs','ongs.id','=','incidents.ong_id')
    .limit(5).offset((page-1)*5)
    .select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf']);
    
    res.header('X-Total-Count',count['count(*)']);
    
    return res.json(incidents);
},



async create(req, res) {
    
    const { title, description, value } = req.body;
    //Chave Estrangeira referencia Chave primaria ID da ong
    //Dados que caracteriza o contexto da requisição (autenticação por exemplo)
    //Esses dados(autenticação) vem no header da requisição, separado do corpo da req.
    const ong_id = req.headers.authorization;
    //desestruturei o array trazendo só o valor do ID, para retornar somente ele que corresponde a inserção dos dados do Schema do Insert()
    //inserção dos dados no BD na tabela incidents
    //Classe controller para inserção de dados.
    const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id,
    });
    return res.json({ id });
},

 async delete (req, res) {
    
    const  { chave }  = req.params;
    const  ong_id  = req.headers.authorization;
    
    const incident = await connection('incidents').where('chave', chave).select('ong_id').first();
    
    if (incident.ong_id !== ong_id) {
        return res.status(401).json({ error: 'Operation not permitted' });
    }

    await connection('incidents').where('chave', chave).delete();
    return res.status(204).send();
}

}