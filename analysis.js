const http = require("http");

class Analysis{

	//抓取页面内容
	getPageContent(url){

		return new Promise((resolve, reject)=>{
			http.get(url, res=>{
				var html = '';
				res.on('data', (d)=> {
					html += d.toString()
				});
				res.on('end', () =>{
					resolve(html);
				});
			})
		})
		
	}

	//分析页面的url
	
}

module.exports = new Analysis();