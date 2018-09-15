const analysis = require('../analysis.js');

class Handle {

    // 提交要检测的url
    async submitUrl(ctx, next) {

        let url = ctx.url
        // 从上下文的request对象中获取
        let request = ctx.request;
        let req_query = request.query;
        let req_querystring = request.querystring;

        // 从上下文中直接获取
        let ctx_query = ctx.query;
        let ctx_querystring = ctx.querystring;

        ctx.body = {
            url,
            req_query,
            req_querystring,
            ctx_query,
            ctx_querystring
        }

        analysis.getPageContent(req_query.url).then(html=>{
            console.log(html)
        });
    }


}

module.exports = new Handle();