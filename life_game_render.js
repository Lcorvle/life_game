/*
向首兴 2016/7/7
*/
var game_div = document.createElement("div");
game_div.setAttribute("id","game_div");
var canvas = document.createElement("canvas");
canvas.setAttribute("id","canvas");
canvas.setAttribute("height",500);
canvas.setAttribute("width",500);
game_div.appendChild(canvas);
document.body.appendChild(game_div);
var context = canvas.getContext("2d");
var canvas_size = 500;
var game_condition = false;

var button_div = document.createElement("div");
button_div.setAttribute("id","button_div");
document.body.appendChild(button_div);
button_div.style.top = "50px";



//随机布局按钮
var random_button = document.createElement("button");
random_button.setAttribute("id","random_button");
button_div.appendChild(random_button);
document.getElementById("random_button").innerHTML = "random";
random_button.onclick = function(){
	if(game_condition == false){
		for(i = 0;i < size;i++){
			for(j = 0;j < size;j++){
				if(Math.random() > 0.5){
					current_condition[i][j] = 1;
				}
				else{
					current_condition[i][j] = 0;
				}
			}
		}
	}
};

//清空布局按钮
var clear_button = document.createElement("button");
clear_button.setAttribute("id","clear_button");
button_div.appendChild(clear_button);
document.getElementById("clear_button").innerHTML = "clear";
clear_button.onclick = function(){
	if(game_condition == false){
		for(i = 0;i < size;i++){
			for(j = 0;j < size;j++){
				current_condition[i][j] = 0;
			}
		}
	}
};

//游戏开关按钮
var game_switch = document.createElement("button");
game_switch.setAttribute("id","game_switch");
button_div.appendChild(game_switch);
document.getElementById("game_switch").innerHTML = "begin";
game_switch.onclick = function(){
	if(game_condition){
		game_condition = false;
		document.getElementById("game_switch").innerHTML = "begin";
	}
	else{
		game_condition = true;
		document.getElementById("game_switch").innerHTML = " stop";
	}
};


//点击进行自定义布局
canvas.onclick = function(e){
	e = e || event;
	var x = Math.floor((e.clientX - canvas.offsetLeft) / 5);
	var y = Math.floor((e.clientY - canvas.offsetTop) / 5);
	if(game_condition == false){
		current_condition[x][y] = 1 - current_condition[x][y];
	}
};




function render(){
	//获取当前窗口大小
	var cube_size = Math.floor(canvas_size / size);
	var living_img = context.createImageData(cube_size, cube_size);
	var died_img = context.createImageData(cube_size, cube_size);
	var i;
	for(i = 0;i < living_img.data.length;i = i + 4){
		living_img.data[i] = 255;
		living_img.data[i + 1] = 255;
		living_img.data[i + 2] = 255;
		living_img.data[i + 3] = 255;
		died_img.data[i] = 0;
		died_img.data[i + 1] = 0;
		died_img.data[i + 2] = 0;
		died_img.data[i + 3] = 255;
	}
	var j;
	for(i = 0;i < size;i++){
		for(j = 0;j < size;j++){
			context.putImageData(died_img, cube_size * i, cube_size * j);
			if(current_condition[i][j] == 1){
				context.putImageData(living_img, cube_size * i, cube_size * j);
			}
		}
	}
}

function timer(){
	render();
	if(game_condition){
		calculate();
		update();
	}
	setTimeout("timer()", 1);
}
timer();