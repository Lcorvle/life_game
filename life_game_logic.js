/*
向首兴 2016/7/7
*/
/* exported calculate */
/* exported update */
/* exported show_example */

var current_condition = new Array();
var next_condition = new Array();
var i, j, size = 100;

for(i = 0;i < size;i++){
	current_condition[i] = new Array();
	next_condition[i] = new Array();
	for(j = 0;j < size;j++){
		current_condition[i][j] = 1;
	}
}



function get_value(row, col){
	if(row < 0 || col < 0 || row >= size || col >= size){
		return 0;
	}
	else{
		return current_condition[row][col];
	}
}

function calculate(){
	var i, j;
	for(i = 0;i < size;i++){
		for(j = 0;j < size;j++){
			next_condition[i][j] = get_value(i - 1, j - 1)
						+ get_value(i - 1, j)
						+ get_value(i - 1, j + 1)
						+ get_value(i, j - 1)
						+ get_value(i, j + 1)
						+ get_value(i + 1, j - 1)
						+ get_value(i + 1, j)
						+ get_value(i + 1, j + 1);
		}
	}
}

function update(){
	var i, j;
	for(i = 0;i < size;i++){
		for(j = 0;j < size;j++){
			if(next_condition[i][j] == 3){
				current_condition[i][j] = 1;
			}
			else if(next_condition[i][j] != 2){
				current_condition[i][j] = 0;
			}
		}
	}
}

function show_example(){
	var examples = [[20,20],[20,21],[21,20],[21,21],
					[20,31],[21,30],[21,32],[22,30],[22,32],[23,31],
					[20,40],[20,41],[21,40],[21,42],[22,41],
					[20,50],[20,51],[21,50],[21,52],[22,51],[22,53],[23,52],
					[20,61],[21,60],[21,62],[22,60],[22,63],[23,61],[23,62],
					[20,70],[20,71],[20,72]];
	var i, j;
	for(i = 0;i < size;i++){
		for(j = 0;j < size;j++){
			current_condition[i][j] = 0;
		}
	}
	var len = examples.length;
	for(i = 0;i < len;i++){
		current_condition[examples[i][0]][examples[i][1]] = 1;
	}
}