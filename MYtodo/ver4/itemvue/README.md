# vue 重构（单组件 todolist）

1. 舍弃了 ver3 里的 span + contenteditable = true 模式
   改用回 ver1，2 里使用一个 input 搭配一个 span，依赖 css 样式显示的输入框
2. 遇见了巨坑无比的 v-for 和 ：key 绑定问题
   要选择正确的 key！

自我感觉：组件相比原生 js，其 vm 对数据的双向绑定使得 dom 操作十分简单，
但是要对框架有一定的了解，如果不了解框架，除了 bug 无从下手调试，没有思路

## 动态渲染 todolist 和 donelist

### 计算属性

分别定义两个计算属性 donelists，和 todolists，用 vfor 分别动态渲染两个 list

### v-for 的坑 ----》》v-for 的：key

vue 是通过比对组件自身新旧 vdom 进行更新的。
key 的作用是辅助判断新旧 vdom 节点在逻辑上是不是同一个对象。
加了 key(一定要具有唯一性) id 的 checkbox 跟内容进行了一个关联。

#### 1. 不推荐使用数组下标作为 key 的原因：

例如数组删除了一个元素，那么这个元素后方元素的下标全都前移了一位，之前 key 对应的数据和 dom 就会乱了，除非重新匹配 key，那就容易产生错误。【我出现的现象】
如果重新匹配 key，等于全部重新渲染一遍，违背了使用 key 来优化更新 dom 的初衷。

一开始我用（value，index）的 index 做 key，结果发先当点击 checkbox 后，虽然该元素移到了 donelist，但是 todolist 的下一个 item 被 checked 了。
结果发现是:key 没有绑定给 value.id（唯一的），而是绑定到了 index 上
可以这么解释：
当改变了一个 todolist 的 item 的 checkbox 时，他被移到了 donelist，
那么在 todolist 的 vfor，就会发现少了一个元素（比如 item 的 index 由 0，1，2 变成了 0，1【关键在这】），然后该元素下面的元素都上移，他会认为是：修改了那个 item，以及后面的 item，删除了最后一个 item，而不是删除了那个 item
如果把:key 绑定到 item.id（唯一）上，key 就会由（0，1，2）变成（0，2），vue 会认为这是删除了第二个元素，就能正常渲染了

#### 2. 理解 diff 算法：

![diff](https://upload-images.jianshu.io/upload_images/3973616-cbe6ef9bad920f51.png?imageMogr2/auto-orient/strip|imageView2/2/w/576/format/webp)
默认的 diff 会:
当我们想在 ABC 里差一个 F 时
![](https://upload-images.jianshu.io/upload_images/3973616-c93a83cb2203fa54.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/572/format/webp)
如果加上了唯一的:key
![](https://upload-images.jianshu.io/upload_images/3973616-25f6c171772b50b6.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/452/format/webp)

#### 3. 不推荐 v-for+v-if

当 v-if 与 v-for 处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。（不推荐同时使用 v-if 和 v-for，因为会对可读性产生影响。）

一开始想渲染两个 list 会很想当然的想用 v-if 来控制一个 item 是否被渲染，不要用，用计算属性

## 怎么实现双击修改

tradition：
span + input
with css 控制样式

### 1. 双击只改动某一个 item，不影响其他 items

v-for 循环遍历时，动态绑定 class，
一共两种 class，一种是正常显示的，另一种用于 css 选择器，该 class 下的 span 和 input 的 display 与正常的相反

### 2.监听事件

1. 失焦（取消修改）
2. 输入 esc（取消修改）
3. 回车（确认修改）
   那么一共定义两种方法，确认修改 + 取消修改
   这两种方法应该传入一个参数，是修改后的 item.text

### 3.修改的数据

data 下定义一个变量，editvalue 专门用于保存此时修改的数据
当双击时，将被双击的 item 的 text 赋予 edivalue，
把 editvalue 和 input 做双向绑定。
这样，就可以实现在 input 里显示原始值，并且实时获得修改后的数值的功能了

## localstorage 数据的保存

data 里定义一个 todos，直接获得 localstorage
watch 监视器里监视 data 的变化，如果 data 变化，setitem 存起来【可以时时刻刻监视 data】

## 维护一个唯一的 id

不能在组件里定义一个 let i = sth
因为这样每次重新运行，会产生重复的 i
一种方法是用 new date 获得时间戳
另一种方法是，数据是对象数组，
那么数组的第一个/最后一个一定是最后添加的，其 id 对应着最大的 id，
也就是要接的 id
把每次修改后的 item 赋予++id，就可以保证唯一了
