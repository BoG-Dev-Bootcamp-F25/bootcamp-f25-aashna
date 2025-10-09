console.log('Hello World!');

function hoisted() {
	console.log(variable);
}

let variable = 'haiiii :D';
hoisted();

const arr = [];

console.log(arr);

arr.push(1, 2, 3);

console.log(arr);

// arr = [];

const fun = function() {
	console.log('fun');
	return 1;
}

const arrow = () => {
	console.log('arrow');
	return 1;
};

const obj = {
	fn: fun
};

obj.fn();

const copyArray = (arr) => [...arr];

const arr2 = [1, 2, 3];
console.log('arr2:', arr2);

const copyOf2 = copyArray(arr2);
copyOf2.push(4);
console.log('copy:', copyOf2);
console.log('arr2:', arr2);

const numbers = [1];
const [one, two, ...rest] = numbers;
console.log(one);
console.log(two);
console.log(rest);

const toBeDestructured = {
	age: 42,
	name: 'Isaiah Gamble',
	height: 72,
};

const Component = ({ age, name, height }) => {
	console.log(age, name, height);
	return age * 2;
};

Component(toBeDestructured);

const nums = [2, 4, 8, 16];
nums.reduce((acc, curr) => acc + curr, 0);
