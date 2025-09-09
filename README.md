## Answer the following question

### 1) What is the difference between var, let, and const?

### Answer:

| var                                             | let                                 | const                               |
| ----------------------------------------------- | ----------------------------------- | ----------------------------------- |
| Has functional scope but don't have block scope | Has both functional and block scope | Has both functional and block scope |
| value can reassign                              | value can reassign                  | value can't reassign                |
| It can be redeclared                            | It can't be redeclared              | It can't be redeclared              |
| Can hoisting but don't have any temporal zone   | Can hoisting but have temporal zone | Can hoisting but have temporal zone |

### 2) What is the difference between map(), forEach(), and filter()?

### Answer:

| map()                                    | forEach()                                                         | filter()                                                       |
| ---------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------- |
| return new array with same array length  | always return `undefined` even we explicitly use `return` keyword | return new array with different array length due to match case |
| Can't use in NodeList and HTMLCollection | Can use in NodeList but not in HTMLCollection                     | Can't use in NodeList and HTMLCollection                       |

### 3) What are arrow functions in ES6?

### Answer:

It is a short format or can say concise syntax to write function expression. It give some feature like -

- If the function has single expression, then we can omit curly braces and `return` keyword. It implicitely return the result of that expression. But if use curly braces, then must have to add `return` keyword to return the result of that expression.
- If have only one parameter, then don't need to add parenthesis.
- It don't have own `this` keyword and `arguments` object.

example:

```js
const age = birthyear => 2025 - birthyear;
console.log(age(1999));

const getAge = (name, birthyear) => {
  console.log('Hello ', name);
  return 2025 - birthyear;
};

console.log(getAge('Sagor', 1999));
```

### 4) How does destructuring assignment work in ES6?

### Answer:

It help us to get elements from array or properties from object into variables so easily without modifying array or object.

- Array destructuring

```js
const arr = [5, 6, 7, 8, 10];
let [a, b, c] = arr;
console.log('🚀 ~ [a, b, c]', a, b, c); // a=5, b=6, c=7

// pick up any value from the array to assign a variable
const [x, , y] = arr;
console.log('🚀 ~ [x, , y]', x, y); // x=5, y=7

const [x1, , , y1] = arr;
console.log('🚀 ~ [x1, , , y1]', x1, y1); // x1=5, y1=8

const [, , x2, , y2] = arr;
console.log('🚀 ~ [, , x2, , y2]', x2, y2); // x2=7 y2=10

// set Default values
const [p = 1, q = 1, r = 1] = [10, 13];
console.log('p,q and r: ', p, q, r); // p=10, q=13, r=1

// nested array
const numbers = [8, [1, 2, 3], 10, 12];
const [a, [d, e, f]] = numbers;

console.log(a); // Output: 8
console.log(d); // Output: 1
console.log(e); // Output: 2
console.log(f); // Output: 3
```

- Object destructuring

```js
const sagor = {
  name: 'sagor',
  age: 25,
  result: {
    pass: 'All pass',
    fail: 'No fail',
  },
};

//variable name must be same as object property name
const { name, age } = sagor;
console.log(name, age); // "sagor" , 25

// default value
const { name, birthYear = 1999 } = sagor;
console.log(name, birthYear); // "sagor", 1999

// different variable name for object property name (Allias)
const { name: nickName } = sagor;
console.log(nickName); // 'sagor"

// Nested Object
const {
  result: { pass },
} = sagor;
console.log(pass); // "All pass"
```

### 5) Explain template literals in ES6. How are they different from string concatenation?

### Answer:

It help us to defined string with some advantages and enhanced string concatenation. To define string, we need to use ` backtick(``) `

- With template literals, we can easily add js expresssion into strings.

```js
const name = 'Sagor Majomder';
const age = 25;
console.log(` I am ${name}. My age is ${age}`); // "I am Sagor Majomder. My age is 25"
```

- It improve readability and make easy to dealing with dynamic string construction as we don't need to use `+` and `""` anymore.
- We can easily add multiline string with template literals which was so much hard with traditional string.

```js
const introduction = `Hello Everyone.
I am Sagor. I am from Bangladesh.
Hope you are all great.
`;

console.log(introduction);
/*
 Hello Everyone.
I am Sagor. I am from Bangladesh.
Hope you are all great.
*/
```

<!-- ---

## 🌴 API Endpoints

1. Get 🌴All Plants

```bash
https://openapi.programming-hero.com/api/plants
```

2. Get 🌴All categories <br/>

```bash
https://openapi.programming-hero.com/api/categories
```

3. Get 🌴plants by categories <br/>

```bash
https://openapi.programming-hero.com/api/category/${id}
```

```bash
https://openapi.programming-hero.com/api/category/1
```

4. Get 🌴Plants Detail <br/>

```bash
https://openapi.programming-hero.com/api/plant/${id}
```

```bash
https://openapi.programming-hero.com/api/plant/1
``` -->
