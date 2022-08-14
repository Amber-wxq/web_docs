## 七.JS

### 字符串的不可变性

字符串里面的值不可被改变。虽然看上去可以改变内容，但其实是地址变了，内存中新开辟了一个内存空间。

代码举例：

```js
var str = 'hello';

str = 'qianguyihao';
```

比如上面的代码，当重新给变量 str 赋值时，常量`hello`不会被修改，依然保存在内存中；str 会改为指向`qianguyihao`。

### 1.toString()类型转换

```
// 基本数据类型
var a1 = 'qianguyihao';
var a2 = 29;
var a3 = true;

// 引用数据类型
var a4 = [1, 2, 3];
var a5 = { name: 'qianguyihao', age: 29 };

// null 和 undefined
var a6 = null;
var a7 = undefined;

// 打印结果都是字符串
console.log(a1.toString()); // "qianguyihao"
console.log(a2.toString()); // "29"
console.log(a3.toString()); // "true"
console.log(a4.toString()); // "1,2,3"
console.log(a5.toString()); // "object"

// 下面这两个，打印报错
console.log(a6.toString()); // 报错：Uncaught TypeError: Cannot read properties of null
console.log(a7.toString()); // 报错：Uncaught TypeError: Cannot read properties of undefined
```

转换Number类型是，可以传参，代表转换为**几进制**；

常量可以直接调用 toString() 方法，但这里的常量，不允许是数字。举例如下：

```js
1.toString(); // 注意，会报错
1..toString(); // 合法。得到的结果是字符串"1"
1.2.toString(); // 合法。得到的结果是字符串"1.2"
(1).toString(); // 合法。得到的结果是字符串"1"
```

上方代码中，为何出现这样的打印结果？这是因为：

- 第一行代码：JS引擎认为`1.toString()`中的`.`是小数点，小数点后面的字符是非法的。
- 第二行、第三行代码：JS引擎认为第一个`.`是小数点，第二个`.`是属性访问的语法，所以能正常解释实行。
- 第四行代码：用`()`排除了`.`被视为小数点的语法解释，所以这种写法也能正常解释执行。

### 2. 使用 String()函数

语法：

```javascript
String(变量/常量);
```

使用 String()函数做强制类型转换时：

-   对于 Number、Boolean、String、Object 而言，**本质上就是调用 toString()方法**，返回结果同 toString()方法。
-   但是对于 null 和 undefined，则不会调用 toString()方法。它会将 **null 直接转换为 "null"。将 undefined 直接转换为 "undefined"。**

该方法**不会影响到原数值**，它会将转换的结果返回。

### 1. 使用 Number() 函数

语法：

```js
const result = Number(变量/常量);
```

**情况一：字符串 --> 数字**

（1）如果字符串中是纯数字，则直接将其转换为数字。

（2）如果字符串是一个**空串**或者是一个**全是空格**的字符串，则转换为 0。

（3）只要字符串中包含了其他非数字的内容（`小数点`按数字来算），则转换为 NaN。怎么理解这里的 **NaN** 呢？可以这样理解，使用 Number() 函数之后，**如果无法转换为数字，就会转换为 NaN**。

**情况二：布尔 --> 数字**

（1）true 转成 1

（2）false 转成 0

**情况三：null --> 数字**，结果为：0

**情况四：undefined --> 数字**，结果为：NaN

### 3. 使用 parseInt()函数：字符串 -> 整数

语法：

```js
const result = parseInt(需要转换的字符串)
```

**parseInt()**：将传入的数据当作**字符串**来处理，从左至右提取数值，一旦遇到非数值就立即停止；停止时如果还没有提取到数值，就返回NaN。

parse 表示“转换”，Int 表示“整数”。例如：

```javascript
parseInt('5'); // 得到的结果是数字 5
```

按照上面的规律，parseInt()的转换结果，列举如下。

**情况一：字符串 --> 数字**

（1）**只保留字符串最开头的数字**，后面的中文自动消失。

（2）如果字符串不是以数字开头，则转换为 NaN。

（3）如果字符串是一个空串或者是一个全是空格的字符串，转换时会报错。

**情况二：Boolean --> 数字**，结果为：NaN

**情况三：Null --> 数字**，结果为：NaN

**情况四：Undefined --> 数字**，结果为：NaN

### typeof

> typeof 就是典型的一元运算符，因为后面只跟一个操作数。

`typeof()`表示“**获取变量的数据类型**”，它是 JS 提供的一个操作符。返回的是小写，语法为：（两种写法都可以）

```javascript
// 写法1
typeof 变量;

// 写法2
typeof(变量);
```

typeof 这个运算符的返回结果就是变量的类型。那返回结果的类型是什么呢？是字符串。

**返回结果**：

| typeof 的语法                | 返回结果  |
| :--------------------------- | :-------: |
| typeof 数字（含 typeof NaN） |  number   |
| typeof 字符串                |  string   |
| typeof 布尔型                |  boolean  |
| typeof 对象                  |  object   |
| typeof 方法                  | function  |
| typeof null                  |  object   |
| typeof undefined             | undefined |

备注 1：为啥 `typeof null`的返回值也是 object 呢？因为 null 代表的是**空对象**。

备注 2：`typeof NaN`的返回值是 number，上一篇文章中讲过，NaN 是一个特殊的数字。

### ==判断

`==`这个符号，它是**判断是否等于**，而不是赋值。注意事项如下：

（1）`== `这个符号，还可以验证字符串是否相同。例如：

```javascript
console.log('我爱你中国' == '我爱你中国'); // 输出结果为true
```

（2）`== `这个符号并不严谨，会做隐式转换，将不同的数据类型，**转为相同类型**进行比较。例如：

```javascript
console.log('6' == 6); // 打印结果：true。这里的字符串"6"会先转换为数字6，然后再进行比较
console.log(true == '1'); // 打印结果：true
console.log(0 == -0); // 打印结果：true

console.log(null == 0); // 打印结果：false
```

（3）undefined 衍生自 null，所以这两个值做相等判断时，会返回 true。

```javascript
console.log(undefined == null); //打印结果：true。
```

（4）NaN 不和任何值相等，包括它本身。

```javascript
console.log(NaN == NaN); //false
console.log(NaN === NaN); //false
```

问题：那如果我想判断 b 的值是否为 NaN，该怎么办呢？

答案：可以通过 isNaN()函数来判断一个值是否是 NaN。举例：

```javascript
console.log(isNaN(b));
```

如上方代码所示，如果 b 为 NaN，则返回 true；否则返回 false。

### ===判断

**全等在比较时，不会做类型转换**。如果要保证**完全等于**（即：不仅要判断取值相等，还要判断数据类型相同），我们就要用三个等号`===`。例如：

```javascript
console.log('6' === 6); //false
console.log(6 === 6); //true
```

上述内容分析出：

-   `==`两个等号，不严谨，"6"和 6 是 true。

-   `===`三个等号，严谨，"6"和 6 是 false。

另外还有：**`==`的反面是`!=`，`===`的反面是`!==`**。例如：

```javascript
console.log(3 != 8); // true
console.log(3 != '3'); // false，因为3=="3"是true，所以反过来就是false。
console.log(3 !== '3'); // true，应为3==="3"是false，所以反过来是true。
```

### while 循环和 do...while 循环的区别

这两个语句的功能类似，不同的是：

-   while：先判断后执行。只有条件表达式为真，才会执行循环体。
-   do...while：先执行后判断。无论条件表达式是否为真，循环体至少会被执行一次。

### string的方法

**字符串的所有方法，都不会改变原字符串**（字符串的不可变性），操作完成后会返回一个新的值。

#### 查找字符串

indexOf()/lastIndexOf()：获取字符串中指定内容的索引

```
索引值 = str.indexOf(想要查询的字符串);
```

`indexOf()` 是从前向后查找字符串的位置。同理，`lastIndexOf()`是从后向前寻找。

因此可以得出一个重要技巧：

-   **如果获取的索引值为 0，说明字符串是以查询的参数为开头的**。

-   如果获取的索引值为-1，说明这个字符串中没有指定的内容。

这个方法还可以指定第二个参数，用来指定查找的**起始位置**。语法如下：

```javascript
索引值 = str.indexOf(想要查询的字符串, [起始位置]);
```

举例 3：（两个参数时，需要特别注意）

```javascript
var str = 'qianguyihao';
result = str.indexOf('a', 3); // 从下标为3的位置开始查找 'a'这个字符 【重要】

console.log(result); // 打印结果：9
```

#### indexOf 举例

**案例**：查找字符串"qianguyihao"中，所有 `a` 出现的位置以及次数。

思路：

（1）先查找第一个 a 出现的位置。

（2）只要 indexOf 返回的结果不是 -1 就继续往后查找。

（3）因为 indexOf 只能查找到第一个，所以后面的查找，可以利用第二个参数，在当前索引加 1，从而继续查找。

代码实现：

```js
var str = 'qianguyihao';
var index = str.indexOf('a');
var num = 0;
while (index !== -1) {
    console.log(index);
    num++; // 每打印一次，就计数一次
    index = str.indexOf('o', index + 1);
}

console.log('a 出现的次数是: ' + num);
```

#### search()：获取字符串中指定内容的索引（参数里一般是正则）


**语法**：

```javascript
索引值 = str.search(想要查找的字符串);
索引值 = str.search(正则表达式);

```

备注：`search()` 方法里的参数，既可以传字符串，也可以传正则表达式。

**解释**：可以检索一个字符串中是否含有指定内容。如果字符串中含有该内容，则会返回其**第一次出现**的索引；如果没有找到指定的内容，则返回 -1。


举例：

```js
const name = 'qianguyihao';

console.log(name.search('yi')); // 打印结果：6
console.log(name.search(/yi/i)); // 打印结果：6
```

备注：上方的`/yi/i`采用的是正则表达式的写法，意思是，让 name去匹配字符`yi`，忽略大小写。我们在后面会专门介绍正则表达式。

#### includes()：字符串中是否包含指定的内容

**语法**：

```js
布尔值 = str.includes(想要查找的字符串, [position]);
```

**解释**：判断一个字符串中是否含有指定内容。如果字符串中含有该内容，则会返回 true；否则返回 false。

参数中的 `position`：如果不指定，则默认为0；如果指定，则规定了检索的起始位置。

```js
const name = 'qianguyihao';

console.log(name.includes('yi')); // 打印结果：true
console.log(name.includes('haha')); // 打印结果：false

console.log(name.includes('yi',7)); // 打印结果：false
```

#### startsWith()：字符串是否以指定的内容开头

**语法**：

```js
布尔值 = str.startsWith(想要查找的内容, [position]);
```

**解释**：判断一个字符串是否以指定的子字符串开头。如果是，则返回 true；否则返回 false。

**参数中的position**：

- 如果不指定，则默认为0。

- 如果指定，则规定了**检索的起始位置**。检索的范围包括：这个指定位置开始，直到字符串的末尾。即：[position, str.length)

举例：

```js
const name = 'abcdefg';

console.log(name.startsWith('a')); // 打印结果：true
console.log(name.startsWith('b')); // 打印结果：false

// 因为指定了起始位置为3，所以是在 defg 这个字符串中检索。
console.log(name.startsWith('d',3)); // 打印结果：true
console.log(name.startsWith('c',3)); // 打印结果：false
```

#### endsWith()：字符串是否以指定的内容结尾

**语法**：

```js
布尔值 = str.endsWith(想要查找的内容, [position]);
```

**解释**：判断一个字符串是否以指定的子字符串结尾。如果是，则返回 true；否则返回 false。

**参数中的position**：

- 如果不指定，则默认为 str.length。

- 如果指定，则规定了**检索的结束位置**。检索的范围包括：从第一个字符串开始，直到这个指定的位置。即：[0, position)

- 或者你可以这样简单理解：endsWith() 方法里的position，表示**检索的长度**。

注意：startsWith() 和 endsWith()这两个方法，他们的 position 的含义是不同的，请仔细区分。

举例：

```js
const name = 'abcdefg';

console.log(name.endsWith('g')); // 打印结果：true
console.log(name.endsWith('f')); // 打印结果：false

// 因为指定了截止位置为3，所以是在 abc 这个长度为3字符串中检索
console.log(name.endsWith('c', 3)); // 打印结果：true
console.log(name.endsWith('d', 3)); // 打印结果：false
```

注意看上方的注释。

参考链接：[JavaScript endsWith()介绍](

### 字符串截取

### slice()


> slice() 方法用的最多。


语法：

```javascript
新字符串 = str.slice(开始索引, 结束索引); //两个参数都是索引值。包左不包右。
```

解释：从字符串中截取指定的内容。不会修改原字符串，而是将截取到的内容返回。

### substring()

语法：

```javascript
新字符串 = str.substring(开始索引, 结束索引); //两个参数都是索引值。包左不包右。
```

解释：从字符串中截取指定的内容。和`slice()`类似。

`substring()`和`slice()`是类似的。但不同之处在于：

- `substring()`不能接受负值作为参数。如果传递了一个**负值**，则默认使用 0。
- `substring()`还会自动调整参数的位置，如果第二个参数小于第一个，则自动交换。比如说， `substring(1, 0)`相当于截取的是第一个字符。

### substr()

语法：

```javascript
字符串 = str.substr(开始索引, 截取的长度);
```

解释：从字符串中截取指定的内容。不会修改原字符串，而是将截取到的内容返回。

注意，这个方法的第二个参数**截取的长度**，不是结束索引。

参数举例：

- `(2,4)` 从索引值为 2 的字符开始，截取 4 个字符。

- `(1)` 从指定位置开始，截取到最后。

- `(-3)` 从倒数第几个开始，截取到最后。

ECMAscript 没有对 `substr()` 方法进行标准化，因此不建议使用它。

### 连接两个字符串

### concat()

语法：

```javascript
    新字符串 = str1.concat(str2)； //连接两个字符串
```

解释：字符串的连接。

这种方法基本不用，直接把两个字符串相加就好。

### split()：字符串转换为数组 【重要】

语法：

```javascript
新的数组 = str.split(分隔符);
```

解释：通过指定的分隔符，将一个字符串拆分成一个**数组**。不会改变原字符串。

备注：`split()`这个方法在实际开发中用得非常多。一般来说，从接口拿到的 json 数据中，经常会收到类似于`"q, i, a, n"`这样的字符串，前端需要将这个字符串拆分成`['q', 'i', 'a', 'n']`数组，这个时候`split()`方法就派上用场了。

**代码举例 1**：

```javascript
var str = 'qian, gu, yi, hao'; // 用逗号隔开的字符串
var array = str.split(','); // 将字符串 str 拆分成数组，通过逗号来拆分

console.log(array); // 打印结果是数组：["qian", " gu", " yi", " hao"]
```

**代码举例 2**：

```javascript
//split()方法：字符串变数组
var str3 = '千古壹号|qianguyihao|许嵩';

console.log('结果1：' +str3.split()); // 无参数，表示：把整个字符串作为一个元素添加到数组中。

console.log(str3.split('')); // 参数为空字符串，则表示：分隔字符串中每一个字符，分别添加到数组中

console.log(str3.split('|')); // 参数为指定字符，表示：用 '|' 分隔字符串。此分隔符将不会出现在数组的任意一个元素中

console.log(str3.split('许')); // 同上
```

打印结果：（都是数组）

![](http://img.smyhvae.com/20200611_2050.png)

### trim()

`trim()`：去除字符串前后的空白。

代码举例：

```javascript
//去除字符串前后的空格，trim();
let str = '   a   b   c   ';
console.log(str);
console.log(str.length);

console.log(str.trim());
console.log(str.trim().length);
```

打印结果：

![](http://img.smyhvae.com/20200607_2132.png)

### 修改数组的长度

可以通过修改length属性修改数组的长度。

-   如果修改的 length 大于原长度，则多出部分会空出来，置为 null。

-   如果修改的 length 小于原长度，则多出的元素会被删除，数组将从后面删除元素。

### 数组元素的添加和删除

| 方法      | 描述                                                         | 备注           |
| :-------- | :----------------------------------------------------------- | :------------- |
| push()    | 向数组的**最后面**插入一个或多个元素，返回结果为新数组的**长度** | 会改变原数组   |
| pop()     | 删除数组中的**最后一个**元素，返回结果为**被删除的元素**     | 会改变原数组   |
| unshift() | 在数组**最前面**插入一个或多个元素，返回结果为新数组的**长度** | 会改变原数组   |
| shift()   | 删除数组中的**第一个**元素，返回结果为**被删除的元素**       | 会改变原数组   |
|           |                                                              |                |
| splice()  | 从数组中**删除**指定的一个或多个元素，返回结果为**被删除元素组成的新数组** | 会改变原数组   |
| slice()   | 从数组中**提取**指定的一个或多个元素，返回结果为**新的数组** | 不会改变原数组 |
|           |                                                              |                |
| concat()  | 合并数组：连接两个或多个数组，返回结果为**新的数组**         | 不会改变原数组 |
| fill()    | 填充数组：用固定的值填充数组，返回结果为**新的数组**         | 会改变原数组   |

### 数组排序

| 方法      | 描述                                                    | 备注         |
| :-------- | :------------------------------------------------------ | :----------- |
| reverse() | 反转数组，返回结果为**反转后的数组**                    | 会改变原数组 |
| sort()    | 对数组的元素,默认按照**Unicode 编码**，从小到大进行排序 | 会改变原数组 |

### 查找数组的元素

| 方法                  | 描述                                                         | 备注                                                     |
| :-------------------- | :----------------------------------------------------------- | :------------------------------------------------------- |
| indexOf(value)        | 从前往后索引，检索一个数组中是否含有指定的元素               |                                                          |
| lastIndexOf(value)    | 从后往前索引，检索一个数组中是否含有指定的元素               |                                                          |
| includes(item)        | 数组中是否包含指定的内容                                     |                                                          |
| find(function())      | 找出**第一个**满足「指定条件返回 true」的元素                |                                                          |
| findIndex(function()) | 找出**第一个**满足「指定条件返回 true」的元素的 index        |                                                          |
| every()               | 确保数组中的每个元素都满足「指定条件返回 true」，则停止遍历，此方法才返回 true | 全真才为真。要求每一项都返回 true，最终的结果才返回 true |
| some()                | 数组中只要有一个元素满足「指定条件返回 true」，则停止遍历，此方法就返回 true | 一真即真。只要有一项返回 true，最终的结果就返回 true     |

### 遍历数组

| 方法      | 描述                                                         | 备注                                                         |
| :-------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| for 循环  | 最传统的方式遍历数组，这个大家都懂                           |                                                              |
| forEach() | 遍历数组，但需要兼容 IE8 以上                                | 不会改变原数组。forEach() 没有返回值。也就是说，它的返回值是 undefined |
| for of    | 遍历数组（ES6语法）                                          | 不会改变原数组。另外，不要使用 for in 遍历数组               |
| map()     | 对原数组中的每一项进行加工，将组成新的数组                   | 不会改变原数组                                               |
| filter()  | 过滤数组：返回结果是 true 的项，将组成新的数组，返回结果为**新的数组** | 不会改变原数组                                               |
| reduce    | 接收一个函数作为累加器，返回值是回调函数累计处理的结果       | 比较复杂                                                     |

### join()

`join()`：将数组转换为字符串，返回结果为**转换后的字符串**（不会改变原来的数组）。

补充：`join()`方法可以指定一个**字符串**作为参数，这个参数是元素之间的**连接符**；如果不指定连接符，则默认使用英文逗号`,` 作为连接符，此时和 `toString()的`效果是一致的。

语法：

```javascript
新的字符串 = 原数组.join(参数); // 参数选填
```

### splice()

`splice()`：从数组中**删除**指定的一个或多个元素，返回结果为**被删除元素组成的新数组**（会改变原来的数组）。

备注：该方法会改变原数组，会将指定元素从原数组中删除；被删除的元素会封装到一个新的数组中返回。

语法：

```javascript
新数组 = 原数组.splice(起始索引index);

新数组 = 原数组.splice(起始索引index, 需要删除的个数);

新数组 = 原数组.splice(起始索引index, 需要删除的个数, 新的元素1, 新的元素2...);
```

上方语法中，第三个及之后的参数，表示：删除元素之后，向原数组中添加新的元素，这些元素将会自动插入到起始位置索引的前面。也可以理解成：删除了哪些元素，就在那些元素的所在位置补充新的内容。

### concat()

`concat()`：连接两个或多个数组，返回结果为**新的数组**。不会改变原数组。`concat()`方法的作用是**数组合并**。

语法：

```javascript
    新数组 = 数组1.concat(数组2, 数组3 ...);
```

### slice()

`slice()`：从数组中**提取**指定的一个或者多个元素，返回结果为**新的数组**（不会改变原来的数组）。

备注：该方法不会改变原数组，而是将截取到的元素封装到一个新数组中返回。

**语法**：

```javascript
新数组 = 原数组.slice(开始位置的索引);

新数组 = 原数组.slice(开始位置的索引, 结束位置的索引);  //注意：提取的元素中，包含开始位置，不包含结束位置
```

### fill()

`fill()`：用一个固定值填充数组，返回结果为**新的数组**。会改变原数组。

语法：

```js
// 用一个固定值填充数组。数组里的每个元素都会被这个固定值填充
新数组 = 数组.fill(固定值);

// 从 startIndex 开始的数组元素，用固定值填充
新数组 = 数组.fill(固定值, startIndex);

// 从 startIndex 到 endIndex 之间的元素（包左不包右），用固定值填充
新数组 = 数组.fill(固定值, startIndex, endIndex);
```

举例1：

```js
// 创建一个长度为4的空数组，然后用 'f' 来填充这个空数组
console.log(Array(4).fill('f')); // ['f', 'f', 'f,' 'f']

// 将现有数组的每一个元素都进行填充
console.log(['a', 'b', 'c', 'd'].fill('f')); // ['f', 'f', 'f,' 'f']

```

举例2：

```js
// 指定位置进行填充
let arr1 = ['a', 'b', 'c', 'd'];
let arr2 = arr1.fill('f', 1, 3);

console.log(arr1); // ['a', 'f', 'f,' 'd']
console.log(arr2); // ['a', 'f', 'f,' 'd']
```

### every()

**语法**：

```javascript
const boolResult = arr.every((currentItem, currentIndex, currentArray) => {
    return true;
});
```



`every()`：对数组中每一项运行回调函数，如果都返回 true，every 就返回 true；如果有一项返回 false，则停止遍历，此方法返回 false。

注意：every()方法的返回值是 boolean 值，参数是回调函数。

举例：

```javascript
var arr1 = ['千古', '宿敌', '南山忆', '素颜'];
var bool1 = arr1.every(function (item, index, array) {
    if (item.length > 2) {
        return false;
    }
    return true;
});
console.log(bool1); //输出结果：false。只要有一个元素的长度是超过两个字符的，就返回false

var arr2 = ['千古', '宿敌', '南山', '素颜'];
var bool2 = arr2.every(function (item, index, array) {
    if (item.length > 2) {
        return false;
    }
    return true;
});
console.log(bool2); //输出结果：true。因为每个元素的长度都是两个字符。
```

### some()

`some()`：对数组中每一个元素运行回调函数，只要有一个元素返回 true，则停止遍历，此方法返回 true。

注意：some()方法的返回值是 boolean 值。

### every() 和 some() 的使用场景

every() 和 some() 这两个方法，初学者很容易搞混。要怎么区分呢？你可以这样记：

-   every()：全部真，才为真。当你需要让数组中的每一个元素都满足指定条件时，那就使用 every()。

-   some()：一个真，则为真，点到为止。数组中只要有一个元素满足指定条件时，就停止遍历。那就使用 some()。

### 遍历数组

**遍历数组**：获取并操作数组中的每一个元素，然后得到想要的返回结果。在实战开发中使用得非常频繁。

语法：

```js
// ES5语法
数组/boolean/无 = 数组.forEach/map/filter(function (item, index, arr) {
   相关代码和返回值；
})

// ES6语法
数组/boolean/无 = 数组.forEach/map/filter((item, index, arr) => {
   相关代码和返回值；
})
```

有了上面这些方法（其实远不止这几个），就可以替代 for 循环了。

### forEach

```
arr.forEach((currentItem, currentIndex, currentArray) => {
	console.log(currentValue);
});
```

回调函数中传递三个参数：

-   参数1：当前正在遍历的元素
-   参数2：当前正在遍历的元素的索引
-   参数3：正在遍历的数组

数组中有几个元素，该回调函数就会执行几次。

无返回值

#### 是否改变原数组：

**1、数组的元素是基本数据类型**：（无法改变原数组）

**2、数组的元素是引用数据类型**：（直接修改整个元素对象时，无法改变原数组）

**3、数组的元素是引用数据类型**：（修改元素对象里的某个属性时，可以改变原数组）

**4、forEach() 通过参数 2、参数 3 修改原数组**：（标准做法，一定要看）

如果纯粹只是遍历数组，那么，可以用 forEach() 方法。但是，如果你想在遍历数组的同时，去改变数组里的元素内容，那么，最好是用 map() 方法来做，不要用 forEach()方法，避免出现一些低级错误。

例子在千古图文

### for of

ES6语法推出了 for of，可用于循环遍历数组。

语法

```js
for(let value of arr) {
	console.log(value);
}
```

### 不要使用 for in 遍历数组

for in 是专门用于遍历对象的。对象的属性是无序的（而数组的元素有顺序），for in循环就是专门用于遍历无序的对象。所以，不要用 for in 遍历数组。

for in语法：

```js
for (let key in obj) {
	console.log(key);
	console.log(obj.key);
}
```

### map()

语法

```js
// ES5语法
const newArr =  arr.map(function (currentItem, currentIndex, currentArray) {
    return newItem;
});

// ES6语法
const newArr = arr.map((currentItem, currentIndex, currentArray) => {
    return newItem;
});
```

解释：对数组中每一项运行回调函数，返回该函数的结果，组成的新数组（返回的是**加工后**的新数组）。不会改变原数组。

作用：对数组中的每一项进行加工。

### map() 方法会不会改变原数组？

答案：不一定。

map方法如果是修改整个item的值，则不会改变原数组。但如果是修改 item 里面的某个属性，那就会改变原数组。



### reduce()

reduce() 语法

> reduce 的发音：[rɪ'djuːs]。中文含义是减少，但这个方法跟“减少”没有任何关系。

reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。返回值是回调函数累计处理的结果。

**语法**：

```javascript
arr.reduce(function (previousValue, currentValue, currentIndex, arr) {}, initialValue);
```

参数解释：

-   previousValue：必填，上一次调用回调函数时的返回值

-   currentValue：必填，当前正在处理的数组元素

-   currentIndex：选填，当前正在处理的数组元素下标

-   arr：选填，调用 reduce()方法的数组

-   initialValue：选填，可选的初始值（作为第一次调用回调函数时传给 previousValue 的值）

### object方法

函数也可以成为对象的属性。**如果一个函数是作为一个对象的属性保存，那么，我们称这个函数是这个对象的方法**。

调用这个函数就说调用对象的方法（method）。函数和方法，有什么本质的区别吗？它只是名称上的区别，并没有其他的区别。

函数举例：

```javascript
	// 调用函数
	fn();
```

方法举例：

```javascript
	// 调用方法
	obj.fn();
```

我们可以这样说，如果直接是`fn()`，那就说明是函数调用。如果是`XX.fn()`的这种形式，那就说明是**方法**调用。

### 定义形参就相当于在函数作用域中声明了变量

举例如下：

```javascript
function fun(e) {
    // 这个函数中，因为有了形参 e，此时相当于在函数内部的第一行代码里，写了 var e;
    console.log(e);
}

fun(); //打印结果为 undefined
fun(123); //打印结果为123
```

### 高阶函数

当 函数 A 接收函数 B 作为**参数**，或者把函数 C 作为**返回值**输出时，我们称 函数 A 为高阶函数。

通俗来说，高阶函数是 对其他函数进行操作 的函数。

#### 高阶函数举例1：把其他函数作为参数

```js
function fn1(a, b, callback) {
    console.log(a + b);
    // 执行完上面的 console.log() 语句之后，再执行下面这个 callback 函数。也就是说，这个 callback 函数是最后执行的。
    callback && callback();
}

fn1(10, 20, function () {
    console.log('我是最后执行的函数');
});

```


打印结果：

```
30
我是最后执行的函数
```


#### 高阶函数举例2：把其他区函数作为返回值

```js
function fn1() {
    let a = 20;

    return function () {
        console.log(a);
    };
}

const foo = fn1(); // 执行 fn1() 之后，会得到一个返回值。这个返回值是函数
foo();
```


上面的代码，产生了闭包现象。

### 闭包的概念

**闭包**（closure）：指有权**访问**另一个函数作用域中**变量**的**函数**。

上面这个概念，出自《JavaScript 高级程序设计（第 3 版）》这本书。上面的概念中指出，闭包是一种函数；当然，你可以**把闭包理解成是一种现象**。具体解释如下。

简单理解就是：如果**这个作用域可以访问另外一个函数内部的局部变量**，那就产生了闭包（此时，你可以把闭包理解成是一种现象）。注意，这里强调的是访问**局部变量**哦。



### 产生闭包的条件

**当一个嵌套的内部(子)函数引用了嵌套的外部(父)函数的变量或函数时, 就产生了闭包。**

- 条件1.函数嵌套

- 条件2.内部函数引用了外部函数的数据(变量/函数)。

来看看条件2：

```javascript
    function fn1() {
        function fn2() {

        }

        return fn2;
    }

    fn1();
```

上面的代码不会产生闭包，因为内部函数fn2并没有引用外部函数fn1的变量。


PS：还有一个条件是**外部函数被调用，内部函数被声明**。比如：

```javascript
    function fn1() {
        var a = 2
        var b = 'abc'

        function fn2() { //fn2内部函数被提前声明，就会产生闭包(不用调用内部函数)
            console.log(a)
        }

    }

    fn1();

    function fn3() {
        var a = 3
        var fun4 = function () {  //fun4采用的是“函数表达式”创建的函数，此时内部函数的声明并没有提前
            console.log(a)
        }
    }

    fn3();

```

### 闭包代码举例

代码举例：

```js
function fun1() {
  const a = 10;
  return function fun2() {
    console.log(a);
  };
}
fun1();
var result = fun1();
result(); // 10
```

打印结果：

```
10
```

上方代码中，函数 fun2 的作用域访问了 fun1 中的局部变量，那么，在 fn1 中就产生了闭包。

正常情况下作为函数内的局部变量，是无法被外部访问到的。但是通过闭包，我们最后还是可以拿到 a 变量的值。

### 常见的闭包

- 1. 将一个函数作为另一个函数的返回值

- 2. 将函数作为实参传递给另一个函数调用。

### 闭包的作用

- 作用1. 使用函数内部的变量在函数执行完后, 仍然存活在内存中(延长了局部变量的生命周期)

- 作用2. 让函数外部可以操作(读写)到函数内部的数据(变量/函数)

### 闭包的生命周期

1. 产生: 嵌套内部函数fn2被声明时就产生了(不是在调用)

2. 死亡: 嵌套的内部函数成为垃圾对象时。（比如f = null，就可以让f成为垃圾对象。意思是，此时f不再引用闭包这个对象了）

### 闭包的缺点及解决

缺点：函数执行完后, 函数内的局部变量没有释放，占用内存时间会变长，容易造成内存泄露。


解决：能不用闭包就不用，及时释放。比如：

```javascript
    f = null;  // 让内部函数成为垃圾对象 -->回收闭包
```

总而言之，你需要它，就是优点；你不需要它，就成了缺点。

### instanceof

使用 instanceof 可以检查**一个对象是否为一个类的实例**。

**语法如下**：

```javascript
对象 instanceof 构造函数;
```

如果是，则返回 true；否则返回 false。

**所有的对象都是 Object 的后代，因此 `任何对象 instanceof Object` 的返回结果都是 true**。

### 删除对象属性

语法：

```javascript
delete obj.name;
```

### in 运算符-判断属性存在与否

通过该运算符可以检查一个对象中是否含有指定的属性。如果有则返回 true，没有则返回 false。

语法：

```javascript
'属性名' in 对象;
```

举例：

```javascript
//检查对象 obj 中是否含有name属性
console.log('name' in obj);
```

我们平时使用的对象不一定是自己创建的，可能是从接口获取的，这个时候，in 运算符可以派上用场。

当然，还有一种写法可以达到上述目的：

```js
if (obj.name) {
    // 如果对象 obj 中有name属性，我就继续做某某事情。
}
```

### scrollWidth和scrollHeight



- scrollTop:获取垂直滚动条滚动的距离
- scrollLeft：获取水平滚动条滚动的距离

- scrollWidth   = 内容宽度（不包含border）
- scrollHeight  = 内容高度（不包含border）

内容超出盒子：scrollHeight=内容height+padding(一个padding)

内容不超出：为盒子本身高度 height+padding

scrollWidth同理；

不超过 scrollWidth=120px

![](/Users/wxq/Desktop/TodoList/test/八股img/scrollWidth.png)

超过 scrollHeight=contextHeight+paddng (一个 padding=20px)

![](/Users/wxq/Desktop/TodoList/test/八股img/scrollHeight.png)

scrollTop 兼容性写法

因为文档有是否有DTD声明的问题

所以兼容性这么写

```
 window.pageYoffset||document.body.scrollTop||document.document.documentElement.scrollTop
 
```

- 判断是否已经声明DTD声明

```
document.compatMode=="CSS1Compat" //已声明
document.compatMode=="BackCompat" //未声明
```

### 封装scrollTop和scrollLeft

封装为一个方法，scroll()，返回值是一个对象。

以后直接调用scroll().top和scroll().left

```js
function scroll(){
	if(window.pageYoffset!==null){
    return{
      left:window.pageXoffset,
      top:window.pageYoffset
    }
  }
  else if(document.compatMode==="CSS1Compat"){
		return {

      left:document.documentElement.scrollLeft,
      top:document.documentElement.scrollTop,
    }
  }
  else{
    return{
      left:document.body.scrollLeft,
      top:document.body.scrollTop,
    }
  }
}
```



### clientWidth 和 clientHeight

元素调用时：

- clientWidth：获取元素的可见宽度（width + padding）。

- clientHeight：获取元素的可见高度（height + padding）。


body/html 调用时：

- clientWidth：获取网页可视区域宽度。

- clientHeight：获取网页可视区域高度。

**声明**：

- `clientWidth` 和 `clientHeight` 属性是只读的，不可修改。

- `clientWidth` 和 `clientHeight` 的值都是不带 px 的，返回的都是一个数字，可以直接进行计算。


### clientX 和 clientY

event调用：

- clientX：鼠标距离可视区域左侧距离。

- clientY：鼠标距离可视区域上侧距离。



### clientTop 和 clientLeft

- clientTop：盒子的上border。

- clientLeft：盒子的左border。

### 三大家族 offset/scroll/client 的区别

### 区别1：宽高

**元素宽高**和位置滚动没有关系

- offsetWidth  = width  + padding + border 网页可见区域 包括border
- offsetHeight = height + padding + border 网页可见区域 包括border



- clientWidth  = width  + padding  网页可见区域
- clientHeight = height + padding 网页可见区域



- offsetLeft:当前元素相对其定位父元素的水平偏移量
- offsetTop：当前元素相对于其定位父元素的垂直偏移量

从父亲的padding开始算起，父亲的border不算在内

滚动有关

- scrollTop:获取垂直滚动条滚动的距离
- scrollLeft：获取水平滚动条滚动的距离

- scrollWidth   = 内容宽度（不包含border）
- scrollHeight  = 内容高度（不包含border）

内容超出盒子：scrollHeight=内容height+padding(一个padding)

内容不超出：为盒子本身高度 height+padding

scrollWidth同理；

不超过 scrollWidth=120px

![](/Users/wxq/Desktop/TodoList/test/八股img/scrollWidth.png)

超过 scrollHeight=contextHeight+paddng (一个 padding=20px)

![](/Users/wxq/Desktop/TodoList/test/八股img/scrollHeight.png)

-  scrollTop  网页被卷上去的高
- 屏幕分辨率高：window.screen.height

scrollHeight代表包括当前**不可见部分**的元素的高度。

而**可见部分**的高度其实就是clientHeight，

也就是scrollHeight>=clientHeight恒成立

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fedf514554040e482f0f03d2375385c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba3750b28f464205a24e1f8f186a4d4a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1368cfc0c44a4cc9b8e62b02eefbb0f7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/957d454b02864754a0001afb5487d25c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)


### 区别2：上左


offsetTop/offsetLeft：

- 调用者：任意元素。(盒子为主)
- 作用：距离父系盒子中带有定位的距离。


scrollTop/scrollLeft：

- 调用者：document.body.scrollTop（window调用）(盒子也可以调用，但必须有滚动条)
- 作用：浏览器无法显示的部分（被卷去的部分）。

**scrollTop**: 代表在有滚动条时，滚动条向下滚动的距离也就是元素顶部被遮住部分的高度。在没有滚动条时scrollTop==0恒成立。单位px，可读可设置。

**offsetTop**: 当前元素顶部距离最近父元素顶部的距离,和有没有滚动条没有关系。单位px，只读元素



![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/4/1/1628055d0479d7c5~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/4/1/1628064e83bb382a~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

clientY/clientX：

- 调用者：event
- 作用：鼠标距离浏览器可视区域的距离（左、上）。

![](/Users/wxq/Desktop/TodoList/test/八股img/鼠标距离.jpg)

### 事件绑定

DOM0写法：onclick

DOM2写法：`addEventListener('click',()=>{},false)`

- 参数1：事件名的字符串(注意，没有on)

- 参数2：回调函数：当事件触发时，该函数会被执行

- 参数3：**true表示捕获阶段触发，false表示冒泡阶段触发（默认）**。如果不写，则默认为false。【重要】

默认：false 

捕获 冒泡 目标

捕获：向下寻找的过程

，冒泡：向上影响的过程

`addEventListener()`中的this，是绑定事件的对象。

### DOM事件流

事件传播三阶段 捕获 冒泡 目标

- 事件捕获：事件从**祖先元素**往**子元素**查找，直到捕获到事件**目标****target**，事件相应的监听函数不会被触发。
- 事件目标：当到达目标元素之后，**执行目标元素该事件相应的处理函数**。如果没有绑定监听函数，就不执行
- 事件冒泡阶段：事件从事件目标target开始，从元素往祖先元素冒泡，直到页面的最上一级标签；

向下**捕获**--事件**目标**执行处理函数--向上**冒泡**

![](http://img.smyhvae.com/20180204_1218.jpg)

#### 事件捕获

设置参数`addEventListener`第三个参数为true，表示事件在捕获阶段执行。

默认是false，冒泡，表示事件在冒泡阶段执行

第一个接收到事件的对象是**window**

涉及到DOM对象，两个对象最常用：**window和document**

- 要是想获取**html**节点：`document.documentElement`

- 要是获取**body**节点：`document.body`

#### 事件冒泡

**一个元素上的事件**被触发（比如鼠标点击了一个按钮），**同样**的事件将会在那个元素的**所有祖先元素**中被触发。

这个过程被称为事件冒泡；

即：子元素事件被触发时，**父元素的同样的事件**也会被触发。取消冒泡就是取消这种机制。

**前提是父元素上绑定的是子元素相同的事件**

**不是所有事件都能冒泡**：

比如：`blur/focus/load/unload/onmouseenter/onmouseleave`

事件往往不会往父元素那里传

检查元素是否会冒泡可以通过以下参数：

```
event.bubbles
```

返回是true表示事件会冒泡

**阻止冒泡**

大多数冒泡是有益的，但如果想阻止

```
event.stopPropagation();
//w3c的方法：（火狐、谷歌、IE11）
or
event.cancelBubble=true
//IE10	
```

### 事件委托

把一个元素响应事件的函数委托到另一个元素

比如一个列表ul，列表中有大量列表项a标签

```html
<ul id="parent-list">
    <li><a href="javascript:;" class="my_link">超链接一</a></li>
    <li><a href="javascript:;" class="my_link">超链接二</a></li>
    <li><a href="javascript:;" class="my_link">超链接三</a></li>
</ul>
```

鼠标移到a上，获取a的相关信息并飘出漂浮框显示详细信息。

或者a被点击时触发相应处理事件

通常写法：每个a都绑定事件监听

但这样过于**消耗内存和性能**。

希望能**只绑定一次事件，就可以应用到多个元素上**，即使元素是后来添加的。

好的方法就是：把点击**事件绑定到他的父层（ul）上，**然后执行事件函数的时候**匹配判断目标元素**

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title></title>
        <script type="text/javascript">
            window.onload = function() {

                // 获取父节点，并为它绑定click单击事件。 false 表示事件在冒泡阶段触发（默认）
                document.getElementById('parent-list').addEventListener('click', function(event) {
                    event = event || window.event;

                    // e.target 表示：触发事件的对象
                    //如果触发事件的对象是我们期望的元素，则执行；否则不执行
                    if (event.target && event.target.className == 'link') {
                    // 或者写成 if (event.target && event.target.nodeName.toUpperCase() == 'A') {
                        console.log('我是ul的单击响应函数');
                    }
                }, false);
            };
        </script>
    </head>
    <body>
        <ul id="parent-list" style="background-color: #bfa;">
            <li>
                <p>我是p元素</p>
            </li>
            <li><a href="javascript:;" class="link">超链接一</a></li>
            <li><a href="javascript:;" class="link">超链接二</a></li>
            <li><a href="javascript:;" class="link">超链接三</a></li>
        </ul>
    </body>
```

为父节点注册点击事件。

当子节点被点击时，

点击事件从子节点开始向父节点冒泡，

父节点捕获到事件之后，执行时间函数内容，

通过event.target拿到子节点`<a>`.从而获取相应的信息，做处理。

事件是在冒泡阶段触发（子元素向父元素传递事件）。而父节点注册了事件函数，子节点没有注册事件函数，此时，会在父节点中执行函数体里的代码。

总结

事件委托，利用冒泡机制，减少事件绑定次数，减少了内存消耗，提高性能。

### 键盘事件

**判断是哪个键盘被按下**

`event.keyCode` 获取案件编码

`event.altKey`

`event.ctrlKey`

`event.shiftKey`

判断这是哪个键是否被按下

### 事件对象

event

pageX:光标相对于该网页的水平位置

pageY：光标相对于网页的垂直位置

clientX：光标相对于该网页的水平位置（当前可视位置）

clientY：光标相对于该网页的垂直位置（当前可视位置）

这俩数值一样，有滚动条时，会有不同，page包含滚动的距离

target： 事件被传送到的对象

screenX：光标相对于显示器的水平位置

screenY：光标相对于显示器的垂直位置

由于pageX 和 pageY的兼容性不好，我们可以这样做

鼠标在页面的位置 = 滚动条滚动的距离 + 可视区域的坐标。

var pagex = event.pageX || scroll().left + event.clientX;

```js
document.documentElement.scrollLeft,document.documentElement.scrollTop
 console.log('event.pageX, event.pageY',event.pageX, event.pageY);
        console.log('event.clientX',event.clientX,event.clientY)
        console.log(document.body.scrollLeft,document.body.scrollTop);
        console.log(window.pageXoffset,window.pageYoffset);
        console.log(document.documentElement.scrollLeft,document.documentElement.scrollTop);

```

![](D:\笔记\web_docs\八股img\event.png)

###  History对象

操作浏览器向前或向后翻页

属性：

```
history.length
```

浏览器历史列表中URL数量，只统计当前数量，浏览器关了会重置为1；

方法：

```
history.back()
```

后退

```
history.forward()
```

跳转到下一页面，前进

```js
history.go(number)
```

### Location对象

属性：

```
location.href
location.href = 'https://xxx';
```

获取当前页面的url路径，或者跳转到指定路径。

**window.location.href 是异步代码：**

内行是起定时器异步执行的；

**方法**1

```
location.assign(str)
```

用来跳转到其他的页面，作用和直接修改location.href一样

**方法2**：

```javascript
    location.reload();
```

解释：用于重新加载当前页面，作用和刷新按钮一样。

代码举例：

```javascript
    location.reload(); // 重新加载当前页面。
    location.reload(true); // 在方法的参数中传递一个true，则会强制清空缓存刷新页面。

```

**方法3**：

```javascript
    location.replace();
```

解释：使用一个新的页面替换当前页面，调用完毕也会跳转页面。但不会生成历史记录，不能使用「后退按钮」后退。

### 定时器

常见方法

- setInterval()：循环调用。将一段代码，**每隔一段时间**执行一次。（循环执行）

- setTimeout()：延时调用。将一段代码，等待一段时间之后**再执行**。（只执行一次）

## setInterval() 的使用

`setInterval()`：循环调用。将一段代码，**每隔一段时间**执行一次。（循环执行）

**参数**：

- 参数1：回调函数，该函数会每隔一段时间被调用一次。

- 参数2：每次调用的间隔时间，单位是毫秒。

**返回值**：返回一个Number类型的数据。这个数字用来作为定时器的**唯一标识**，方便用来清除定时器。

```js
    let num = 1;
   setInterval(function () {
       num ++;
       console.log(num);
   }, 1000);
```

### 清除定时器

定时器的返回值是作为这个定时器的**唯一标识**，可以用来清除定时器。具体方法是：假设定时器setInterval()的返回值是`参数1`，那么`clearInterval(参数1)`就可以清除定时器。

setTimeout()的道理是一样的。

代码举例：

```js
<script>
    let num = 1;

    const timer = setInterval(function () {
        console.log(num);  //每间隔一秒，打印一次num的值
        num ++;
        if(num === 5) {  //打印四次之后，就清除定时器
            clearInterval(timer);
        }

    }, 1000);
</script>

```

## setTimeout() 的使用

`setTimeout()`：延时调用。将一段代码，等待一段时间之后**再执行**。（只执行一次）

**参数**：

- 参数1：回调函数，该函数会每隔一段时间被调用一次。

- 参数2：每次调用的间隔时间，单位是毫秒。

**返回值**：返回一个Number类型的数据。这个数字用来作为定时器的**唯一标识**，方便用来清除定时器。

### 定义和清除定时器

代码举例：

```javascript
    const timer = setTimeout(function() {
        console.log(1); // 3秒之后，再执行这段代码。
    }, 3000);

    clearTimeout(timer);

```

代码举例：（箭头函数写法）

```javascript
    setTimeout(() => {
        console.log(1); // 3秒之后，再执行这段代码。
    }, 3000);
```

# ES6

引入新的原始数据类型Symbol，表示独一无二的值

七种数据类型：number string boolean null undefined **object** Symbol

