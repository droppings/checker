const router = require('koa-router')();
const handle = require('./logic/handle.js');

router
    
    .get('/api/submitUrl', handle.submitUrl);


module.exports = router;