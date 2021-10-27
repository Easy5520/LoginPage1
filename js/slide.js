//current position
var pos = 0;
//number of slides
var totalSlides = $('#slider-wrap ul li').length;
//get the slide width
var sliderWidth = $('#slider-wrap').width();

$(document).ready(function () {

	/*****************
	 BUILD THE SLIDER
	*****************/
	//set width to be 'x' times the number of slides
	$('#slider-wrap ul#slider').width(sliderWidth * totalSlides);

	//next slide 	
	$('#next').click(function () {
		slideRight();
	});
	$('#next2').click(function () {
		slideRight();
	});


	//previous slide
	$('#previous').click(function () {
		slideLeft();
	});

	/*************************
	 //*> OPTIONAL SETTINGS
	************************/

	//hide/show controls/btns when hover
	//pause automatic slide when hover
	$('#slider-wrap').hover(
		function () {
			$(this).addClass('active');
		},
		// 每三秒自动轮播
		// function () { $(this).removeClass('active'); autoSlider = setInterval(slideRight, 3000); }
	);

});//DOCUMENT READY

// Slide to the right向右滑动
function slideRight() {
	pos++;
	if (pos == totalSlides) { pos = 0; }
	$('#slider-wrap ul#slider').css('left', -(sliderWidth * pos));
}

//OPTIONAL SETTINGS轮播按钮
function pagination() {
	$('#pagination-wrap ul li').removeClass('active');
	$('#pagination-wrap ul li:eq(' + pos + ')').addClass('active');
}



//#region 本地存储登录注册数据

//对象
// var obj = {username:"a",password:"123"}
// console.log(obj.username);
//先获取所有用户的对象//变成数组
if (window.localStorage.userArr) {//判断是否存在score
	var array = JSON.parse(window.localStorage.userArr);
} else {
	array = [];//创建一个新数组
}
//登录
//#region 验证码
function changeImg() {
	var arrays = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
		'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
		'u', 'v', 'w', 'x', 'y', 'z'];
	/* ,
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
	'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
	'U', 'V', 'W', 'X', 'Y', 'Z' */
	code = '';
	for (var i = 0; i < 4; i++) {
		var r = parseInt(Math.random() * arrays.length);
		code += arrays[r];
	}
	document.getElementById('code').innerHTML = code;
}
// function check() { }
//#endregion
document.getElementById('login').onclick = function () {
	var input_code = document.getElementById("code5").value;
	var username2 = document.getElementById('username5').value;
	var password2 = document.getElementById('password5').value;
	var isHad = false;//定义一个开关变量
	var index = 0; //定义一个下标确定用户
	//遍历数组进行匹配
	for (var i = 0; i < array.length; i++) {
		if (username2 == array[i].username) {//有这个账号
			isHad = true;
			index = i;
		}
	}

	if (isHad) {//如果存在
		// $("#span01").css("color", "green");
		// $("#span01").html("  √");
		if (password2 !== array[index].password || password2 == '') {
			alert("密码错误");
		} else {
			if (input_code.toLowerCase() !== code.toLowerCase()) {
				alert("验证码不正确！");
				changeImg();
			} else
				alert("登录成功");
		}
	} else {//账号不存在或输入错误
		alert('账号不存在或输入错误');
		// $("#span01").html("*账号不存在或输入错误");
		// $("#span01").css("color", "red");
	}
}

//注册
document.getElementById('regist').onclick = function () {
	var username1 = document.getElementById('username').value;
	var password1 = document.getElementById('pwd1').value;
	var password2 = document.getElementById('pwd2').value;
	var mail1 = document.getElementById('mail').value;
	var tel1 = document.getElementById('tel').value;
	var isTrue1 = false;
	if (username1 == '' || password1 == '' || password2 == '' || mail1 == '' || tel1 == '') {
		alert("请将信息填写完整");
		return;
	} else {
		isTrue1 = true;
	}

	if (isTrue1) {
		//遍历数组进行匹配
		for (var j = 0; j < array.length; j++) {
			//判断是否有相同账号
			if (username1 == array[j].username) {
				alert("该账号已存在");
				return;
			}
		}
		//验证密码是否相同
		if (password1 !== password2) {
			alert("两次密码不同");
			return;
		}
		//验证邮箱格式是否正确
		if (mail1 != '') {//判断
			var reg1 = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
			if (!reg1.test(mail1)) {
				alert("邮箱格式不正确")
				return;
			}
		}

	}

	//创建对象
	var obj = { username: username1, password: password1, mail: mail1, tel: tel1 }
	array.push(obj);
	window.localStorage.userArr = JSON.stringify(array);
	alert("用户创建成功");

}
//#endregion