const Router = require('express');

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
routes.post('/ongs', OngController.create);

routes.get('/incidents',IncidentController.index);
routes.post('/incidents',IncidentController.create);
routes.delete('/incidents/:id',IncidentController.delete);

routes.get('/profile',ProfileController.index);

routes.post('/sessions',SessionController.create);



module.exports = routes;