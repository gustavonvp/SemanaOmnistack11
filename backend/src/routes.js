const Router = require('express');

const { celebrate,Joi,Segments} = require('celebrate')

const OngController = require( './controller/OngController');

const IncidentController = require('./controller/IncidentController');

const ProfileController = require('./controller/ProfileController');

const SessionController = require('./controller/SessionController');

const routes = Router();

/* 
Abaixo temos as rotas, que contem URI, e as classes controller,
que tem os metodos implementados para realização de CRUD no BD
*/

routes.get('/ongs',OngController.index);


routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf:Joi.string().required().length(2),
    })
}), 
OngController.create);

routes.get('/incidents',celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page:Joi.number(),
    })
}),
IncidentController.index);

routes.post('/incidents',IncidentController.create);

routes.delete('/incidents/:id',celebrate({
    [Segments.HEADERS]:Joi.object().keys({
        chave:Joi.number().required(),
    })
}),
IncidentController.delete);


routes.get('/profile',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization:Joi.string().required(),
    }).unknown(),
}),
ProfileController.index);

routes.post('/sessions',SessionController.create);



module.exports = routes;