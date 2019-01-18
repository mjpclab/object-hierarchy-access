# Importing methods
For ES module environment, use `import` to import methods:
```javascript
import { get, set } from 'object-hierarchy-access';
```

For commonjs environment, use `requre` to import methods:
```javascript
const { get, set } = require('object-hierarchy-access')
```

For AMD module environment, define module `object-hierarchy-access` from file `dist/index`.

For global mode, methods are under global variable `ObjectHierarchyAccess`.

# Assigning
## Setting a value
All methods for setting a value below have same parameters definition:
```javascript
setValue(targetObject, ...hierarchyProperties, lastProperty, value);
```
or
```javascript
setValue(targetObject, [...hierarchyProperties, lastProperty], value);
```
### `set`
Set value to object's hierarchy properties, returns the object:
```javascript
import { set } from 'object-hierarchy-access';
const obj = {};
set(obj, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
```

Properties could be in arrays:
```javascript
import { set } from 'object-hierarchy-access';

const obj = {};
set(obj, ['a', 'b', 'c'], 100);
console.log(obj.a.b.c); // 100

set(obj, ['d', 'e', 'f'], ['g', 'h', 'i'], 200);
console.log(obj.d.e.f.g.h.i); // 200
```

Create object at the same time:
```javascript
import { set } from 'object-hierarchy-access';
const obj = set({}, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
```

### `setIfUndef`
Only set value if last hierarchy property not exists or its value is `undefined`:
```javascript
import { setIfUndef } from 'object-hierarchy-access';
const obj = {};
setIfUndef(obj, 'a', 'b', 'collection', []);
obj.a.b.collection.push(100);
console.log(obj.a.b.collection); // [100]

setIfUndef(obj, 'a', 'b', 'collection', []); // will not override previous array
obj.a.b.collection.push(200);
console.log(obj.a.b.collection); // [100, 200]
```

It is also possible to create the object at the same time:
```javascript
import { setIfUndef } from 'object-hierarchy-access';
const obj = setIfUndef({}, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
```

### Customize hierarchy object creating
Property can ba a descriptor object rather than a string for non-last property item. The descriptor shape is `{name, value|type|create, override?, created?, skipped?, got?}`.

- `name` is the property name
- `value` should be an object assign to parent object's `name`
- `type` is a constructor function(or class) with no parameter that can be used to create object, assign to parent object's `name`
- `create(parent, name)` is a function that returns a customized object assign to `parent` object's `name`
- `override` determines if always create new hierarchy object even property already exists
- `created(parent, name, current)` is a callback function when new hierarchy object has been created
- `skipped(parent, name, current)` is a callback function when hierarchy object already exists and skipped
- `got(parent, name, current)` is a callback function when current hierarchy object got no matter it is created or skipped.

```javascript
const obj = set({}, 'a', {name: 'b', value: []}, '0', 100);
console.log(obj); // {a: {b: [100]}}

const obj2 = set({}, 'a', {name: 'b', value: {}}, 'c', 100);
console.log(obj2); // {a: {b: {c: 100}}
```
```javascript
const obj = set({}, 'a', {name: 'b', type: Array}, '0', 100);
console.log(obj); // {a: {b: [100]}}
```
```javascript
const obj = set({}, 'a', {name: 'b', create: () => [1, 2, 3]}, '3', 200);
console.log(obj); //  {a: {b: [1, 2, 3, 200]}}
```
```javascript
const obj = set({}, 'a', 'b', 'c', 100);
setIfUndef(obj, 'a', 'b', 'c', 200);
console.log(obj.a.b.c); // 100

setIfUndef(obj, 'a', {name: 'b', override: true}, 'c', 300);
console.log(obj.a.b.c); // 300
```

### `assign` and `assignIfUndef`
Just like `set` and `setIfUndef`, but returns the second last hierarchy object which contains the last hierarchy property.
Cannot create object at the same time since the whole object is not returned.
```javascript
import { assign } from 'object-hierarchy-access';
const obj = {};
const result = assign(obj, 'a', 'b', 'c', 100);
console.log(obj.a.b.c); // 100
console.log(result); // {c: 100}
console.log(result === obj.a.b); // true
```

### `put` and `putIfUndef`
Just like `set` and `setIfUndef`, but returns the last hierarchy value.
Cannot create object at the same time since the whole object is not returned.
```javascript
import { putIfUndef } from 'object-hierarchy-access';
const obj = {};
const collection = putIfUndef(obj, 'a', 'b', 'collection', []);
collection.push(100);

const anotherCollection = putIfUndef(obj, 'a', 'b', 'collection', []);
anotherCollection.push(200);
console.log(anotherCollection); // [100, 200];
console.log(collection === anotherCollection); // true
console.log(collection === obj.a.b.collection); // true
```

## Creating hierarchy properties only
All methods for creating hierarchy properties structure below have same parameters definition:
```javascript
createHierarchyProperty(targetObject, ...hierarchyProperties);
```
or
```javascript
createHierarchyProperty(targetObject, [hierarchyProperties]);
```

### `setProp`
Use string as property name or property descriptor object to create hierarchy property.
Can create object at the same time. Returns the object.
```javascript
import { setProp } from 'object-hierarchy-access';
const obj1 = {};
setProp(obj1, 'a', 'b', 'c');
console.log(obj1); // {a:{b:{c:{}}}}

const obj2 = setProp({}, 'a', 'b', {name:'c', type:Array});
console.log(obj2); // {a:{b:{c:[]}}}
```

### `setPropIfUndef`
Only create last hierarchy property if not exists or its value is `undefined`.
```javascript
import { setPropIfUndef } from 'object-hierarchy-access';
const obj = {};
setPropIfUndef(obj, 'a', 'b', {name:'c', value:[100]});
console.log(obj); // {a:{b:{c:[100]}}}

setPropIfUndef(obj, 'a', 'b', {name:'c', value:{}}); // will not override previous array
console.log(obj); // {a:{b:{c:[100]}}}
```

### `assignProp` and `assignPropIfUndef`
Just like `setProp` and `setPropIfUndef`, but returns the second last hierarchy.
Cannot create object at the same time.
```javascript
import { assignProp } from 'object-hierarchy-access';
const obj = {};
const result = assignProp(obj, 'a', 'b', 'c');
console.log(obj); // {a:{b:{c:{}}}}
console.log(result); // {c:{}}
```

### `putProp` and `putPropIfUndef`
Just like `setProp` and `setPropIfUndef`, but returns the last hierarchy.
Cannot create object at the same time.
```javascript
import { putProp } from 'object-hierarchy-access';
const obj = {};
const result = putProp(obj, 'a', 'b', 'c');
console.log(obj); // {a:{b:{c:{}}}}
console.log(result); // {}
console.log(result === obj.a.b.c); // true
```

## Setting value VS Creating hierarchy property
Sometimes *setting value methods* and *creating hierarchy property methods* can be replaced with each other.
The following two blocks of codes have the same effect:
````javascript
import { set } from 'object-hierarchy-access';
set({}, 'a', 'b', 'c', []);
````
```javascript
import { setProp } from 'object-hierarchy-access';
setProp({}, 'a', 'b', {name:'c', value:[]});
```
The first example is shorter, while the second one is useful if you want to combine property name with its value as a descriptor.

For `-IfUndef` methods, if last hierarchy property value is very expensive for creating, use creating hierarchy methods with descriptor's property `type` or `create`,
could avoid creating unnecessary values except the first time.
```javascript
import { setIfUndef } from 'object-hierarchy-access';
const obj = {};
setIfUndef(obj, 'a', 'b', 'c', []);
setIfUndef(obj, 'a', 'b', 'c', []);  // the array instance is created and then abandoned
```
```javascript
import { setPropIfUndef } from 'object-hierarchy-access';
const obj = {};
setPropIfUndef(obj, 'a', 'b', {name:'c', type:Array});  // the array instance is created
setPropIfUndef(obj, 'a', 'b', {name:'c', type:Array});  // will not create array instance
setPropIfUndef(obj, 'a', 'b', {name:'c', create: ()=>[]});  // will not create array instance
```

For setting value methods, hierarchy properties only created if not exists by default, unless `override` is specified.
Value will always be overridden unless using `-IfUndef` related methods.

For creating hierarchy property methods, non-last hierarchy properties only created if not exists by default, unless `override` is specified.
For last hierarchy property,
non `-IfUndef` methods overrides existing property and ignore `override`,
while `-IfUndef` methods will not unless `override` is `true`.
```javascript
const obj = {};
setPropIfUndef(obj,'a','b',{name:'c', value:[]}); // obj.a.b.c === []
setPropIfUndef(obj,'a','b',{name:'c', value:{}}); // obj.a.b.c not changed
setPropIfUndef(obj,'a','b',{name:'c', value:{}, override:true}); // obj.a.b.c === {} 
```

## Summary: names for assigning methods
Returns\Category|Setting Value|Creating Hierarchy Property
----------------|------------|------------------
Root Object|`set`, `setIfUndef`|`setProp`, `setPropIfUndef`
Second Last Hierarchy|`assign`, `assignIfUndef`|`assignProp`, `assignPropIfUndef`
Last Hierarchy|`put`, `putIfUndef`|`putProp`, `putPropIfUndef`

# Getting
### `get`
Get value from object's hierarchy properties.

#### String property
Specifying properties by string:
```javascript
import { get } from 'object-hierarchy-access';
const obj = {a: {b: {c: 100}}};
get(obj, 'a', 'b'); // returns {c: 100}
get(obj, 'a', 'b', 'c'); // returns 100
get(obj, ['a', 'b', 'c']); // returns 100
```

#### Function property
Property can be a function that returns property name. The parameter is parent object.
```javascript
const obj = {a: {value: 1, b1: {c: 100}, b2: {c: 200}}};
get(obj, 'a', parent => parent.value === 1 ? 'b1' : 'b2', 'c'); // returns 100
```

#### Object property
Property can be a descriptor object, which its shape is `{name|getName, got?}`.

- `name` is a string property name
- `getName(parent)` is a function to get property name
- `got(parent, name, current)` is a callback when value has been got via `name` property from `parent`.

```javascript
import { get } from 'object-hierarchy-access';
const obj = {a: {b: {c: 100}}};
get(obj,
	{
		name: 'a',
		got: (parent, name, current) => {
			/*
			parent => {a: {b: {c: 100}}};
			name => 'a';
			current => {b: {c: 100}};
			*/
		}
	},
	{
		name: 'b',
		got: (parent, name, current) => {
			/*
			parent => {b: {c: 100}};
			name => 'b';
			current => {c: 100};
			*/
		}
	},
	{
		name: 'c',
		got: (parent, name, current) => {
			/*
			parent => {c: 100};
			name => 'c';
			current => 100;
			*/
		}
	}
);

```

### `traverse`
Go through each hierarchy with a callback. Returns `false` in callback to terminate hierarchy iteration.
```javascript
import { traverse } from 'object-hierarchy-access';
const node1 = {}, node2 = {}, node3 = {};
node1.next = node2;
node2.next = node3;
node3.next = null;
const linkedList = { next: node1 };

let nextId = 1;
traverse(linkedList, 'next', 'next', 'next', (parent, name, current) => { current.id = nextId++; });
console.log(node1.id, node2.id, node3.id); // 1, 2, 3
```

### `traverseReverse`
Just like `traverse`, but callback was invoked from last hierarchy to first hierarchy.
 Returns `false` in callback to terminate hierarchy iteration.
```javascript
import { traverseReverse } from 'object-hierarchy-access';
const task = {
	done: false,
	subTasks: [
		{
			done: false,
			subTasks: [
				{done: false},  // will be done
				{done: true}
			]
		}
	]
};

task.subTasks[0].subTasks[0].done = true;
traverseReverse(task, 'subTasks', 0, 'subTasks', (parent, name, current) => {
	if (Array.isArray(current)) {
		parent.done = current.every(task => task.done);
	}
});
console.log(task.done); // true
console.log(task.subTasks[0].done); // true
```
