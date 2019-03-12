{
	console.log((x => x * 2)(1));
	var es6Code = 'let x = n => n + 1';
	var es5Code = require('@babel/core')
		.transform(es6Code, {
			presets: ['@babel/env']
		})
		.code;
	
	console.log(es5Code);
}

{
	// for的特殊作用域
	for (let i = 0; i<3; i++) {
		let i = 'abc';
		console.log(i);
	}
}


{
	// 解构
	let {log, sin, cos} = Math;
	console.log(sin(90));
	const [a, b, c] = "hello";
	let {length: len} = "test";
	console.log("%s, %s, %s, %d", a, b, c, len);
	
	function add([x, y]) {
		return x+y;
	}
	add([4,5]);
	
	function move({x = 0, y = 0} = {}) {
		return [x, y];
	}
	
	move({x: 3, y: 8}); // [3, 8]
	move({x: 3}); // [3, 0]
	move({}); // [0, 0]
	move(); // [0, 0]
	
	function move({x, y} = { x: 0, y: 0 }) {
		return [x, y];
	}
	
	move({x: 3, y: 8}); // [3, 8]
	move({x: 3}); // [3, undefined]
	move({}); // [undefined, undefined]
	move(); // [0, 0]
	
	[1, undefined, 3].map((x = 'yes') => x);
	// [ 1, 'yes', 3 ]
	
	function exchange([x,y]) {
		if(x!=undefined&&y!=undefined) {
			return [y, x];
		} else {
			throw new Error("should enter 2 values in table")
		}
	}
	let [test1, test2] = [1,2];
	[test1, test2] = [test2, test1];
}

{
	let t = 'x'.padStart(5,'ab');
	function fn() {
		return 'hello world';
	}
	console.log(`Hello this is for test
	${fn()}${t}`)
	
	let str = '(name) => `Hello ${name}`';
	let func = eval.call(null, str);
	console.log(func('jacky'));
	function passthru(literals) {
		let result = '';
		let i = 0;
		
		while (i < literals.length) {
			result += literals[i++];
			if (i < arguments.length) {
				result += arguments[i];
			}
		}
		return result;
	}
	
	let total = 30;
	let msg = passthru`The total is ${total} (${total*1.05} with tax)`;
	console.log`${msg}`;
	
	
	function SaferHTML(templateData) {
		let s = templateData[0];
		for (let i = 1; i < arguments.length; i++) {
			let arg = String(arguments[i]);
			
			// Escape special characters in the substitution.
			s += arg.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;");
			
			// Don't escape special characters in the template.
			s += templateData[i];
		}
		return s;
	}
	
	let sender = '<script>alert("abc")</script>'; // 恶意代码
	let message = SaferHTML`<p>${sender} has sent you a message.</p>`;
	console.log(message);
}