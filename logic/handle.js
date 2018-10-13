const analysis = require('../analysis.js');

const phantom = require('phantom');



class Handle {

    // 提交要检测的url
    async getReport(ctx, next) {

        let url = ctx.url
        // 从上下文的request对象中获取
        let request = ctx.request;
        let req_query = request.query;
        let req_querystring = request.querystring;

        // 从上下文中直接获取
        let ctx_query = ctx.query;
        let ctx_querystring = ctx.querystring;

        // ctx.body = {
        //     url,
        //     req_query,
        //     req_querystring,
        //     ctx_query,
        //     ctx_querystring
        // }

        //let data = await analysis.getPageContent(req_query.url);
        let data = await analysis.getPage(req_query.url);
        
        //ctx.body = data;
        await ctx.render('index',{
            data: data.data
        })
    }


}

module.exports = new Handle();