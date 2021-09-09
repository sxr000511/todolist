// 固定导航样式 和 返回页面顶部 都写在scroll 监听事件里
const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scroll-to-top");

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

const glide = new Glide(".glide", {
  type: "carousel",
  startAt: 0,
  autoplay: 3500,
});
const captionsEL = document.querySelectorAll(".slide-caption");

glide.on(["mount.after", "run.after"], () => {
  // glideindex属性
  const caption = captionsEL[glide.index];
  //   anime 插件
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400,
    easing: "spring(1, 80, 10, 0)",
    delay: anime.stagger(400, { start: 300 }),
    translateY: [anime.stagger([40, 10]), 0],
  });
});
// glide前先隐藏 进入时候页面是空的
glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption > *").forEach((el) => {
    el.style.opacity = 0;
  });
});

glide.mount();

// ///////////////////////////////////////////////////////////////
// isotope-》cases模块
// 最外面cases 里面每个案例是caseitem  -》》fitrows
const isotope = new Isotope(".cases", {
  // 行布局
  layoutMode: "fitRows",
  itemSelector: ".case-item",
});
// ///////////////////////////////////////////////////////////////

// 按钮筛选功能
// 事件委托
const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", (e) => {
  let { target } = e;
  // 获得自定义属性值
  const filterOption = target.getAttribute("data-filter");
  if (filterOption) {
    // 排他思想
    document
      .querySelectorAll(".filter-btn.active")
      .forEach((btn) => btn.classList.remove("active"));
    target.classList.add("active");
    // isotope库提供筛选函数调用
    // filteroption是选择器，所以class要加.，
    isotope.arrange({ filter: filterOption });
  }
});

// 由下向上动态显示数据
// 调用库scrollreveal
// 【通用】滑动出现动画配置项
const staggeringOption = {
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: "ease-in-out",
  // 由下向上
  origin: "bottom",
};

// interval设置等待时间
// 库函数reveal
// 解构赋值，starggeroption结构填上interval后组成新的option，如果新添加的重复，就覆盖，新的为准
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 350 });

ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 350 });

// 数据部分数字增长动画
// 结合anime库

ScrollReveal().reveal(".data-section", {
  beforeReveal: () => {
    anime({
      // 动画目标
      targets: ".data-piece .num",
      // 动画属性
      // 0-156
      innerHTML: (el) => {
        return [0, el.innerHTML];
      },
      // 执行时间
      duration: 1500,
      // 数字增长step
      round: 1,
      // 越来越快的动画效果
      easinge: "easeInExpo",
    });
    // 背景视差，更新一下位置
    dataSectionEl.style.backgroundPosition =
      "center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom/5}px)";
  },
});
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

// a锚点，流畅滚动
// 返回顶部 ，流畅滚动
const scroll = new SmoothScroll(
  'nav a[href*="#"] , .scroll-to-top a[href*="#"]',
  {
    // 配置：固定导航有？ offet 继续滚动一点
    header: "header",
    offset: 50,
  }
);

// 探索更多按钮跳转
// 两个按钮 query两个都绑定事件
const exploreBtnEls = document.querySelectorAll(".explore-btn");
exploreBtnEls.forEach((exploreBtnEl) => {
  exploreBtnEl.addEventListener("click", () => {
    scroll.animateScroll(document.querySelector("#about-us"));
  });
});

// 折叠按钮添加class
// 折叠按钮事件
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
});

// 开始滚动-》如果open打开的，就关闭
document.addEventListener("scrollStart", () => {
  if (headerEl.classList.contains("open")) {
    headerEl.classList.remove("open");
  }
});
