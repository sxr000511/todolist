# vanilla js todo

fulfilled：

1. 携带时间输入
2. todolist 和 donelist 计数
3. 点击每一个事项末尾按钮删除，前面 checked box 修改状态
4. 双击每一个事项可以修改事项内容
5. 保证最新事项位于当前 list 的顶部
6. 点击按钮清除全部

todo：

1. 重构 es6
2. 把 css 改的好看点？？【not so important i guess】
3. 引入插件？

## 重点

### 【功能提升】 createelement 改成 innerhtml 追加

    innerHTML和createElement动态创建元素所需时间：
    innerHTML字符串拼接方式 >> createElement方式 > innerHTML数组方式
    createelement+insertbefore ：for 循环是 (let i = 0; i < data.length; i++)
    innerhtml：for循环是for (let i = data.length - 1; i >= 0; i--)  

### 【功能添加】双击时修改内容，focusout 时保存，

    【方法】核心思想是在html里写一个一开始display：none的text，当双击时把他变成block，然后通过dom操作把原来p标签里面的文字取出来赋给text的value
    当text失焦时，取到index，保存，渲染
    【一些注意事项】为了让他覆盖，把这个text设成绝对定位，脱标，覆盖原来的p标签；
    【另外】一开始想让回车和失焦都保存，后来发现当会车时会同时触发失焦，失焦事件的event里没有办法判断是否是回车，所以只保留了失焦这一个保存方法

### 【功能提升】将内容修改后，按照最先修改的放在最上面显示

    【方法】原来是修改内容直接在data里修改，再把只修改了部分数据的data重新存到localstorage里，为了让修改的内容最先显示
        	就先记录index，把这个内容删掉，然后再重新生成一个数组元素push进去，这样每次修改的内容就在最上面显示了

### 【功能提升】增加一个键，保存每次修改的时间

    【方法】每次修改数据的时候改他的值就行，数据通过标准对象date获得

## 遇见的坑

### click 事件不要绑定到具体的 li 上面

    li是在html渲染时获取的，删除后页面没有刷新，li表混乱

### 如果要获得 li，queryselector 的位置

    一定要在dataload之后，因为只有load之后才有li
    而且此时如果拿chrome console 观察，会发现console里是可以输出li的
    大坑
