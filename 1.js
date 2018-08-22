const koa = require('koa');
const static = require('koa-static');
// koa 直接能够用ES6的generator

var server = new koa();

// server.use(function *(){
// 	this.body = 'This is koa';
// });


function rnd(n,m) {
	return Math.floor(Math.random()*(m-n)+n);
}

server.use(function *(next){ 
	if(this.req.url == '/chou') { 
		// this.body = rnd(0,4);
		// 这个抽奖要赔死了,因此要加一点小猫腻. 

		//开始写一个一等奖 二等奖 三等奖的写法 
		let n = Math.random(); //Math.random()是随机生成0到1之间的随机数.
		if(n < 0.03 ) { //这是百分之1的概率
			this.body = '3'; //全场一人5或者勇士一瓶或者找人喝
		} else if( n < 0.09) { //这是百分之6的概率
			this.body = '6'; //全场干杯
		} else if( n < 0.19 ) { //这是百分之10的概率
			this.body = '10'; //左边或者右边喝
		} else if( n < 0.49){ //这是百分之30
			this.body = '30'; //自己喝半杯
		} else {
			this.body = '35';
		}

	} else { 
		yield next;
	}
});

// 通过static,告诉从哪个文件读取
server.use(static('./www'));
 
server.listen(9999); 