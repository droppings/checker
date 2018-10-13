const Router = require('koa-router');
const handle = require('./logic/handle.js');
const router = new Router();


router
    
    .get('/api/getReport', handle.getReport);


module.exports = router;