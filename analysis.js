const cheerio = require("cheerio"); //为服务器特别定制的，快速、灵活、实施的jQuery核心实现
const axios = require("axios");
const phantom = require('phantom');


//code: 0 fail, 1 success

class Analysis {

	constructor() {
		this.report = {
			specification: {},
			bugs: [],
			copywriting: []
		};
		this.type = null;
		this.request_url = [];
	}
	
	//phantom
	async getPage(url) {

		console.log(url)

		let result_urls = [];

		const instance = await phantom.create();
		const page = await instance.createPage();
		await page.on('onResourceRequested', function(requestData) {
			console.info('Requesting', requestData.url);
			result_urls.push(requestData.url);
		});

		await page.on('onResourceReceived', function(responseData) {
			console.info('response', responseData.url, responseData.status);
			//result_urls.push(requestData.url);
		});

		const status = await page.open(url);
		const content = await page.property('content');

	
		await instance.exit();

		return this.analysising(content);
	}

	doRequest() {

	}

	getPageType() {

	}

	//分析页面
	analysising(html) {
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
	getUrls($) {

		let spec = this.report.specification;

		//页面的a链接
		let a_arr = $('a');
		let a_link = [];
		let a_temp;

		for (let i = 0, len = a_arr.length; i < len; i++) {

			a_temp = a_arr.eq(i);

			if (a_temp.text().replace(/\s\S/ig, '') == '') {

				if (!spec.alink) {
					spec.alink = {
						level: 'A',
						desc: 'A标签必须填写内容',
						data: [$.html(a_temp)]
					}
				} else {
					//console.log(i, a_temp.text(), )
					spec.alink.data.push($.html(a_temp))
				}

			}
		}
		//console.log(a_link)
	}

	//代码规范
	htmlreview($) {


	}



}

module.exports = new Analysis();