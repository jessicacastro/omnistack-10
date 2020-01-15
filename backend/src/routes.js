const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

// INDEX, SHOW, STORE, UPDATE, DESTROY

const routes = Router();

routes.get('/list', DevController.index);
routes.post('/register', DevController.store);
routes.post('/removeDev', DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;