describe('get_value', function(){
	it('should be a function', function(){
		assert.isFunction(get_value);
	});
	it('should have 2 arguments', function(){
		assert.equal(get_value.length, 2)
	});
	it('should have return 0 when first argument is out of range', function(){
		assert.equal(get_value(-1, 0), 0)
	});
	it('should have return 0 when second argument is out of range', function(){
		assert.equal(get_value(0, -1), 0)
	});
});

describe('calculate', function(){
	it('should be a function', function(){
		assert.isFunction(calculate);
	});
	it('should have no arguments', function(){
		assert.equal(calculate.length, 0)
	});
});

describe('update', function(){
	it('should be a function', function(){
		assert.isFunction(update);
	});
	it('should have no arguments', function(){
		assert.equal(update.length, 0)
	});
});

describe('logic', function(){
	it('should be correct on example1', function(){
		var source = [[20,20],[20,21],[21,20],[21,21]];
		var target = [[20,20],[20,21],[21,20],[21,21]];
		assert.strictEqual(test_condition(source, target, 1), true);
	});
	it('should be correct on example2', function(){
		var source = [[20,21],[21,20],[21,22],[22,20],[22,22],[23,21]];
		var target = [[20,21],[21,20],[21,22],[22,20],[22,22],[23,21]];
		assert.strictEqual(test_condition(source, target, 2), true);
	});
	it('should be correct on example3', function(){
		var source = [[20,20],[20,21],[21,20],[21,22],[22,21]];
		var target = [[20,20],[20,21],[21,20],[21,22],[22,21]];
		assert.strictEqual(test_condition(source, target, 3), true);
	});
	it('should be correct on example4', function(){
		var source = [[20,20],[20,21],[21,20],[21,22],[22,21],[22,23],[23,22]];
		var target = [[20,20],[20,21],[21,20],[21,22],[22,21],[22,23],[23,22]];
		assert.strictEqual(test_condition(source, target, 4), true);
	});
	it('should be correct on example5', function(){
		var source = [[20,21],[21,20],[21,22],[22,20],[22,23],[23,21],[23,22]];
		var target = [[20,21],[21,20],[21,22],[22,20],[22,23],[23,21],[23,22]];
		assert.strictEqual(test_condition(source, target, 5), true);
	});
	it('should be correct on example6', function(){
		var source = [[20,20],[20,21],[20,22]];
		var target = [[20,20],[20,21],[20,22]];
		assert.strictEqual(test_condition(source, target, 6), true);
	});
	it('should be correct on example7', function(){
		var source = [[20,20],[20,21],[20,22]];
		var target = [[19,21],[20,21],[21,21]];
		assert.strictEqual(test_condition(source, target, 7), true);
	});
});

function test_condition(source, target, step){
	var i, j;
	for(i = 0;i < size;i++){
		for(j = 0;j < size;j++){
			current_condition[i][j] = 0;
		}
	}
	for(i = 0;i < source.length;i++){
		current_condition[source[i][0]][source[i][1]] = 1;
	}
	for(i = 0;i < step;i++){
		calculate();
		update();
	}
	for(i = 0;i < target.length;i++){
		current_condition[target[i][0]][target[i][1]] = 1 - current_condition[target[i][0]][target[i][1]];
	}
	for(i = 0;i < size;i++){
		for(j = 0;j < size;j++){
			if(current_condition[i][j] != 0){
				return false;
			}
		}
	}
	return true;
};