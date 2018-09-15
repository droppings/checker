const http = require("http");
const cheerio = require("cheerio"); //为服务器特别定制的，快速、灵活、实施的jQuery核心实现


//code: 0 fail, 1 success

class Analysis{

	constructor() {
	    this.report = {
	    	specification: {},
	    	bugs: [],
	    	copywriting: []
	    };
	    this.type = null;
	}

	//抓取页面内容
	getPageContent(url){

		return new Promise((resolve)=>{
			http.get(url, res=>{
				var html = '';
				res.on('data', (d)=> {
					html += d.toString()
				});
				res.on('end', () =>{
					//resolve(html);
					resolve(this.analysising(html));
				});
			})
			.on('error', res=>{
				//reject(res);
				resolve({
				    status: false,
				    code: 0,
				    msg: '输入的链接无效'
				})
			})
		})
		
	}

	getPageType(){

	}

	//分析页面
	analysising(html){
		let $ = cheerio.load(html);

		this.getUrls($);
		this.htmlreview($);

		return {
		    status: true,
		    code: 1,
		    msg: 'success',
		    data: this.report
		}
	}

	//页面的url
	getUrls($){

		let spec = this.report.specification;

		//页面的a链接
		let a_arr = $('a');
		let a_link = [];
		let a_temp;

		console.log(typeof a_arr, a_arr.length)

		for(let i = 0, len = a_arr.length; i<len; i++){

			a_temp = a_arr.eq(i);
			if(a_temp.attr('href')){
				//todo 过滤
				a_link.push(a_temp.attr('href'))
			}

			if(a_temp.text().replace(/\s\S/ig, '') == ''){

				if(!spec.alink){
					spec.alink = {
						level: 'A',
						desc: 'A标签必须填写内容',
						data: [$.html(a_temp)]
					}
				}else{
					//console.log(i, a_temp.text(), )
					spec.alink.data.push($.html(a_temp))
				}
				
			}
		}
		console.log(a_link)
	}

	//代码规范
	htmlreview($){

		
	}
	
}

module.exports = new Analysis();