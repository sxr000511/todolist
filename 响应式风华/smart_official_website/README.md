title: grid1
date: 2021-08-15
tags:

# 仿写

## html 语义化

header section footer 等

## grid 布局

Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。
https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

### header

整体 gird 布局，左边
![](https://github.com/sxr000511/js_minidemo/blob/master/website_imitator/smart_official_website/note/aboutus.JPG?raw=true)

1. 宽度 100vw 视口占全部
2. z-index -》200 使之最高

```
header {
  /* 占满整个浏览器宽度 */
  width: 100vw;
  height: 80px;
  padding: 0 40px;
  /* 栅格布局grid */
  display: grid;
  /* 左边列宽1 右边列宽2 */
  grid-template-columns: 1fr 2fr;
  /* 居中 */
  align-content: center;
  position: relative;
  z-index: 200;
}
header nav {
  /* 内容在单元格里靠end对齐 */
  justify-self: end;
}
```

### glide 滑动

用插件 glide.js+anime.js

### aboutus 关于我们

![](https://github.com/sxr000511/js_minidemo/blob/master/website_imitator/smart_official_website/note/header.JPG?raw=true)

```
* 关于我们 */
/* 先给整个contentrapper设样式 */
/* 内容区域 */
/* 通用样式 */
.content-wrapper {
  /* 一维排版 */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
```

```
section {
  /* 二维 */
  display: grid;
  /* 每个列的对齐方式 */
  justify-items: center;
  max-width: 1280px;
  padding: 0 80px;
}
```

红色短线用伪元素

```
/* 红色条：伪元素 */
.title1::after {
  content: "";
  display: block;
  width: 80%;
  height: 4px;
  background-color: var(--primary-color);
  margin-top: 14px;
  /* 移动到中间，80-》右移10%，左右都10% */
  transform: translateX(10%);
}
```

![](https://github.com/sxr000511/js_minidemo/blob/master/website_imitator/smart_official_website/note/feature.JPG?raw=true)
featues 是六个 feature 的集合
用 grid 分成六个 area
关注下分行分列的写法

```
.features {
  /* grid布局 */
  display: grid;
  /* 重复几次，重复的值  1fr：容器宽度的1/3*/
  grid-template-columns: repeat(3, 1fr);
  /* 两行 */
  grid-template-rows: 126px 126px;
  /* 列间空隙 */
  column-gap: 5vw;
}

```

feature 内部也是 grid 布局，分为 2 行 2 列
左侧整列用于 icon
右侧整列分上下用于标签 和 p

```
/* 每一个业务 */

.feature {
  /* grid */
  display: grid;
  /* gird-area布局 */
  /* 自定义行列名字 */
  grid-template-areas:
    "icon title"
    "icon content";
  /* 2列 */
  grid-template-columns: 60px 1fr;
  /* 2行 */
  /* 1/4 -- 3/4 */
  grid-template-rows: 1fr 3fr;
}

```

area 的引用：font-szie 可以控制 icon 的大小

```
.feature i.fas {
  /* 图标 */
  /* 引用，放在左上 */
  grid-area: icon;
  font-size: 34px;
  color: var(--primary-color);
}

```

### section 成功案例

```
   <section id="showcases" class="showcases section-bg">
        <!-- 标题带after伪元素 -->
        <h2 class="title1">成功案例</h2>
        <!-- 筛选按钮 -->
        <div class="filter-btns">
          <!-- data-filter自定义属性 和下面class名字保持一致 -->
          <!-- class加点 用getattribute获得后送到isotople 的filter函数方便操作 -->
          <button class="filter-btn active" data-filter="*">全部</button>
          <button class="filter-btn" data-filter=".web">WEB</button>
          <button class="filter-btn" data-filter=".mobile">移动</button>
          <button class="filter-btn" data-filter=".science">科研</button>
        </div>
        <!-- isotope.js库 -->
        <div class="cases">
          <!-- web science 子类，用于btn选择出来 -->
          <div class="case-item web science">
            <img
              src="./static/images/gray-laptop-computer-showing-html-codes-in-shallow-focus-160107.jpg"
              alt=""
            />
          </div>
          <div class="case-item web science">
            <img
              src="./static/images/photo-of-imac-near-macbook-1029757.jpg"
              alt=""
            />
          </div>
          <div class="case-item web">
            <img
              src="./static/images/apple-laptop-notebook-office-39284.jpg"
              alt=""
            />
          </div>
          <div class="case-item web">
            <img
              src="./static/images/apple-apple-device-design-desk-285814.jpg"
              alt=""
            />
          </div>
          <div class="case-item mobile">
            <img
              src="./static/images/person-using-black-and-white-smartphone-and-holding-blue-230544.jpg"
              alt=""
            />
          </div>
          <div class="case-item science">
            <img
              src="./static/images/person-holding-a-smartphone-892757.jpg"
              alt=""
            />
          </div>
          <div class="case-item mobile web science">
            <img
              src="./static/images/blur-close-up-code-computer-546819.jpg"
              alt=""
            />
          </div>
          <div class="case-item mobile">
            <img
              src="./static/images/bokeh-photography-of-person-holding-turned-on-iphone-1440727.jpg"
              alt=""
            />
          </div>
        </div>
      </section>

```

#### 背景怎么写 ::before 伪元素

```javascript
/* section部分的背景 */
.section-bg {
  position: relative;
}
/* 宽100vw占满视窗，浅灰色，z-1最下层 */
.section-bg::before {
  content: "";
  display: block;
  position: absolute;
  background-color: #f9fbfb;
  width: 100vw;
  height: 100%;
  z-index: -1;
}
```

before 伪元素：

steps：

1. 定位得写：子绝父相
2. content 得写： 不能为空 content=''
3. 宽高得写：背景大小 宽 100vw 占满全部 高 100% 和父元素等高
4. z-index 得写： 放最下面 -》-1

### 固定导航

### 回到顶部

### 背景视差

1. 更新 postion
2. 视差的做法

#### 短线怎么写 ::after 伪元素

```javascript
.title1 {
  font-size: 34px;
  color: var(--text-color-darker);
}
/* 红色条：伪元素 */
.title1::after {
  content: "";
  display: block;
  width: 80%;
  height: 4px;
  background-color: var(--primary-color);
  margin-top: 14px;
  /* 移动到中间，80-》右移10%，左右都10% */
  transform: translateX(10%);
}
```

和背景相同

1. content
2. width height 宽高
3. display block

#### 按钮样式怎么写

单个按钮 btn 元素:

1. padding 撑开 btn 大小， 有背景，
2. 鼠标 cursor 样式
3. 圆弧 borderradius
4. outline

```javascript
/* 按钮整体区域上下距离 */
.filter-btns {
  margin-top: 54px;
  margin-bottom: 38px;
}
/* 按钮单个 */
.filter-btn {
  /* 左右有个间距 */
  margin: 0 7px;
  background-color: var(--secondary-color);
  border: 0;
  color: var(--text-color-dark-gray);
  /* padding撑开高度宽度让按钮变大 */
  padding: 8px 18px;
  /* 圆角 */
  border-radius: 4px;
  cursor: pointer;
  /* 写s */
  transition: 0.4s;
}

.filter-btn:focus,
.filter-btn:active {
  /* 没有边框 */
  outline: none;
}

/* 被点击的 和 悬浮btn样式 */
/* 被点击默认赋给第一个btn */
.filter-btn.active,
.filter-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

```

#### 图片布局 图片蒙版 overflow:hidden

```javascript
/* 案例图片样式 */
/* 普通每个25%一行四个 */

/* cases 和 item都vw保持比例 */
.showcases .cases {
  width: 100vw;
}

.showcases .case-item {
  width: 25vw;
  height: 20vw;
  /* 里面图片缩放超出部分不可见 */
  overflow: hidden;
}

.case-item img {
  height: 100%;
  /* 自动等比例缩放 */
  object-fit: cover;
}
```

### 团队介绍 section

1. 最外面四列一行 grid，每个 item 内部也是 grid
2. 照片蒙版

```
/* 成员照片蒙版，溢出隐藏 */
.profile-image {
overflow: hidden;
}
/* 等比例缩放 */
.profile-image img {
/* 和蒙版一样大 */
width: 100%;
height: 264px;
/* 自动充满 */
object-fit: cover;
/* 上面贴着左右居中 */
object-position: top center;
}
```

hover 图片放大,向上移动效果

```
/* 放大效果 */
/* 往上，放大1.05倍 */
/* 阴影变大变浅 */
.team-member:hover {
  transform: translateY(-20px) scale(1.05);
  box-shadow: 0px 0px 36px rgba(0, 0, 0, 0.1);
}
```

### 数据展示 section

四个相同的 datapiece'组成 datasection

<!-- 先把照片水平居中，过后哉实现视差 -->

```
.data-section {
  max-width: unset;
  width: 100vw;
  height: 255px;
  background-image: url(./static/images/adult-business-computer-contemporary-380769.jpg);
  background-size: cover;
  /* 居中 */
  background-position: center;
  /* 内部四个数据gird布局 */
  display: grid;
  /* 最大不超过220最小auto */
  grid-template-columns: repeat(4, minmax(auto, 220px));
  justify-content: center;
  align-items: center;
  /* 背景遮罩层 */
  /* 子元素绝对定位时需要有相对的父级元素 */
  position: relative;
  z-index: 20;
}
/* 黑遮罩 */
/* content要写 */
.data-section::before {
  content: "";
  display: block;
  /* 绝对定位 */
  position: absolute;
  background-color: var(--backdrop-color);
  width: 100%;
  height: 100%;
  z-index: 1;
}
```

黑遮罩的写法和背景，红线一样，伪元素，content，width height z-index display

### 公司动态 section

<!-- activity整个有24px的padding让文字上下左右都有空白 -->
<!-- 然后移动pic容器向上 24抵消掉最外面的padding，让图片贴头显示-->

```
.activity {
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
  /* 文字上下左右 */
  padding: 24px;
  transition: 0.4s;
}

/* 图片容器 */
.act-image-wrapper {
  height: 255px;
  overflow: hidden;
  /* 图片抵消24px */
  margin: -24px;
  margin-bottom: 0;
}

.act-image-wrapper img {
  min-height: 300px;
  /* 不要变形自动拉伸 */
  object-fit: cover;
}
```

### 底部导航制作

1. 第一行 grid 五列布局

```
.footer-menus {
  width: 100%;
  max-width: 1280px;
  /* grid五列 */
  display: grid;
  /* 2：1：1：1：1 */
  grid-template-columns: 2fr repeat(4, 1fr);
  padding: 0 80px;
  position: relative;
}
```

```
/* 左侧contact */
.contact-us {
  justify-self: start;
  color: var(--text-color-lightest);
}
/* 不是第一个剩下的bottom 16 */
.contact-us p:not(:first-child) {
  padding-bottom: 16px;
}

/* 右侧几个 */

.menu-items li {
  list-style: none;
  padding-bottom: 8px;
}

.menu-items li a {
  text-decoration: none;
  font-weight: 300;
  color: var(--text-color-lightest);
}

```

#### 备案信息 grid-column: 1 / -1;

```
/* 原本的grid共五列没地方放这俩p */
/* 备案信息 */
.icp-info {
  margin-top: 24px;
  margin-bottom: 16px;
}

.icp-info,
.rights {
  /* 简写 start1  end -1 最后一个 */
  /* 1/-1 ==== 1/6 */
  grid-column: 1 / -1;
  justify-self: center;
  color: white;
}
```

### 返回顶部箭头 样式

1. 宽高弧度
2. 内部箭头和盒子的位置： flex centercenter
3. 整个盒子的 fixed 定位 bottom right

```
/* 返回顶部箭头 */
.scroll-to-top {
  /* 先不显示 */
  display: none;
  position: relative;
  /* 可能被盖住 提高zindex */
  z-index: 300;
}
.scroll-to-top a {
  /* 大小 */
  width: 32px;
  height: 32px;
  border-radius: 4px;
  /* 内部布局 */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  /* fixe定位在右下角 */
  position: fixed;
  bottom: 60px;
  right: 30px;
}
```

### 粘性 sticky header 和 返回顶部

通过修改 css 类名修改样式 推荐

```
window.addEventListener("scroll", () => {
  // 获取
  let height = headerEl.getBoundingClientRect().height;
  // pageoffset向下滑动距离
  if (window.pageYOffset - height > 800) {
    if (!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }
  // 返回顶部
  if (window.pageYOffset > 1000) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
});

```

### 点击 btn 过滤 -》with isotope.js

自定义属性
data-filter="\*"
获取后方便送到 isotope 里跳转
btn 变红用到了排他思想

### 背景视差

```
// 背景视察
const dataSectionEl = document.querySelector(".data-section");
// window监听滚动
window.addEventListener("scroll", () => {
  const bottom = dataSectionEl.getBoundingClientRect().bottom;
  const top = dataSectionEl.getBoundingClientRect.top;
  // 可见区域内
  if (bottom >= 0 && top <= window.innerHeight) {
    // 背景操作backgroundposition
    // x：center不动  y：由center（50），减去一个值，移动慢一点
    dataSectionEl.style.backgroundPosition = "center calc(50% - ${bottom/5}px)";
  }
});
```

### 点击 header 跳转

a 标签点击跳转到 id 对应的 section
a 标签锚点功能

#### 流畅滚动效果 加载库 smoothscroll

## 响应式 @media

###

0. 最难的：菜单的动画
   header 还是 sticky，header 包括了 logo 和 nav，nav 改动很大，head 是 toggleactive 属性的 ，
   1. 折叠按钮初始 block style，显示折叠按钮
   2. 折叠按钮动画 三行变 ×（keyframe 动画），添加类名，改样式
   3. 隐藏原来的 nav ， 添加新 class 下的 nav 的位置 style 等，内容下滑动画
   4. header 下滑动画

###

1. media 监听宽度
2. 几列？多宽？
3. 微调样式
4. footer 的左右放置
5. 监听滚动事件自动关闭 nav
