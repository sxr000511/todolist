webpackJsonp([1],{"1N66":function(t,e){},AIMO:function(t,e){},I7qU:function(t,e){},K4f5:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={};n.d(o,"getTodo",function(){return X}),n.d(o,"updateMenu",function(){return Y});var s={};n.d(s,"getTodoList",function(){return z});var i=n("/5sW"),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r,c,d,u,l,p,m,v=n("VU/8")({name:"App"},a,!1,function(t){n("I7qU")},null,null).exports,h=n("/ocq"),f=n("Xxa5"),_=n.n(f),k=n("exGp"),g=n.n(k),x=n("mtWM"),w=n.n(x).a.create({baseURL:Object({NODE_ENV:"production"}).API_ROOT||""}),C=(r=g()(_.a.mark(function t(e){var n;return _.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.get("/todo/list",{params:e});case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}},t,this)})),function(t){return r.apply(this,arguments)}),y=(c=g()(_.a.mark(function t(e){var n;return _.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.post("/todo/addTodo",{params:e});case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}},t,this)})),function(t){return c.apply(this,arguments)}),$=(d=g()(_.a.mark(function t(e){var n;return _.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.get("/todo/listId/"+e._id);case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}},t,this)})),function(t){return d.apply(this,arguments)}),T=(u=g()(_.a.mark(function t(e){var n;return _.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.post("/todo/addRecord/"+e._id,e);case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}},t,this)})),function(t){return u.apply(this,arguments)}),b=(l=g()(_.a.mark(function t(e){var n;return _.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.post("/todo/editTodo",e);case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}},t,this)})),function(t){return l.apply(this,arguments)}),N=(p=g()(_.a.mark(function t(e){var n;return _.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.post("/todo/editRecord",e);case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}},t,this)})),function(t){return p.apply(this,arguments)}),O=(m=g()(_.a.mark(function t(e){var n;return _.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.post("/todo/logIn",e);case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}},t,this)})),function(t){return m.apply(this,arguments)}),U={name:"menus",data:function(){return{todoId:"",todoNum:0}},computed:{todoList:function(){var t=this.$store.getters.getTodoList.length;return this.$store.getters.getTodoList.length<this.todoNum&&this.goList(this.$store.getters.getTodoList[0]._id),this.todoNum=t,this.$store.getters.getTodoList}},created:function(){var t=this;this.$store.dispatch("getTodo").then(function(){t.$nextTick(function(){t.goList(t.todoList[0]._id)})})},watch:{todoId:function(t){this.$router.push({name:"todo",params:{_id:t}})}},methods:{goList:function(t){this.todoId=t},addTodoList:function(){var t=this;y({}).then(function(e){t.$store.dispatch("getTodo").then(function(){t.$nextTick(function(){setTimeout(function(){t.goList(t.todoList[t.todoList.length-1]._id)},100)})})})}}},E={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"list-todos"},[t._l(t.todoList,function(e,o){return n("a",{key:o,staticClass:"list-todo list activeListClass",class:{active:e._id===t.todoId},on:{click:function(n){return t.goList(e._id)}}},[e.locked?n("span",{staticClass:"icon-lock"}):t._e(),t._v(" "),e.count>0?n("span",{staticClass:"count-list"},[t._v(t._s(e.count))]):t._e(),t._v("\n    "+t._s(e.title)+"\n  ")])}),t._v(" "),n("a",{staticClass:"link-list-new",on:{click:t.addTodoList}},[n("span",{staticClass:"icon-plus"}),t._v("\n    新增\n  ")])],2)},staticRenderFns:[]};var L=n("VU/8")(U,E,!1,function(t){n("sTV7")},null,null).exports,D={props:{item:{type:Object,default:function(){return{checked:!1,text:"你好,世界"}}},index:{},_id:{},init:{},locked:{}},methods:{onChange:function(){var t=this;N({_id:this._id,record:this.item,index:this.index}).then(function(e){t.init(),t.$store.dispatch("getTodo")})}}},P={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"slide-fade"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:!t.item.isDelete,expression:"!item.isDelete"}],staticClass:"list-item editingClass editing",class:{checked:t.item.checked}},[n("label",{staticClass:"checkbox"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.item.checked,expression:"item.checked"}],attrs:{type:"checkbox",name:"checked",disabled:t.locked},domProps:{checked:Array.isArray(t.item.checked)?t._i(t.item.checked,null)>-1:t.item.checked},on:{change:[function(e){var n=t.item.checked,o=e.target,s=!!o.checked;if(Array.isArray(n)){var i=t._i(n,null);o.checked?i<0&&t.$set(t.item,"checked",n.concat([null])):i>-1&&t.$set(t.item,"checked",n.slice(0,i).concat(n.slice(i+1)))}else t.$set(t.item,"checked",s)},t.onChange]}}),t._v(" "),n("span",{staticClass:"checkbox-custom"})]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.item.text,expression:"item.text"}],attrs:{type:"text",placeholder:"写点什么。。。",disabled:t.item.checked||t.locked},domProps:{value:t.item.text},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onChange.apply(null,arguments)},input:function(e){e.target.composing||t.$set(t.item,"text",e.target.value)}}}),t._v(" "),t.item.checked&&!t.locked?n("a",{staticClass:"delete-item",on:{click:function(e){t.item.isDelete=!0,t.onChange()}}},[n("span",{staticClass:"icon-trash"})]):t._e()])])},staticRenderFns:[]};var I={data:function(){return{todo:{},items:[],text:"",isUpdate:!1}},components:{item:n("VU/8")(D,P,!1,function(t){n("RU2c")},null,null).exports},watch:{"$route.params._id":function(){console.log(this.$route.params._id),this.init()}},created:function(){this.init()},methods:{init:function(){var t=this,e=this.$route.params._id;$({_id:e}).then(function(e){var n=e.data.todo,o=n._id,s=n.title,i=n.count,a=n.isDelete,r=n.locked,c=n.record;t.items=c,t.todo={_id:o,title:s,count:i,locked:r,isDelete:a}})},onAdd:function(){var t=this,e=this.$route.params._id;T({_id:e,text:this.text}).then(function(e){t.text="",t.init(),t.$store.dispatch("getTodo")})},updateTitle:function(){this.isUpdate=!1,this.updateTodo()},onDelete:function(){this.todo.isDelete=!0,this.updateTodo()},onlock:function(){this.todo.locked=!this.todo.locked,this.updateTodo()},updateTodo:function(){var t=this;b({todo:this.todo}).then(function(e){t.$store.dispatch("getTodo"),t.init()})}}},R={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:!t.todo.isDelete,expression:"!todo.isDelete"}],staticClass:"page lists-show"},[n("nav",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isUpdate,expression:"isUpdate"}],staticClass:"form list-edit-form"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.todo.title,expression:"todo.title"}],attrs:{type:"text",disabled:t.todo.locked},domProps:{value:t.todo.title},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.updateTitle.apply(null,arguments)},input:function(e){e.target.composing||t.$set(t.todo,"title",e.target.value)}}}),t._v(" "),n("div",{staticClass:"nav-group right"},[n("a",{staticClass:"nav-item",on:{click:function(e){t.isUpdate=!1}}},[n("span",{staticClass:"icon-close"})])])]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.isUpdate,expression:"!isUpdate"}],staticClass:"nav-group",on:{click:function(e){return t.$store.dispatch("updateMenu")}}},[t._m(0)]),t._v(" "),n("h1",{directives:[{name:"show",rawName:"v-show",value:!t.isUpdate,expression:"!isUpdate"}],staticClass:"title-page",on:{click:function(e){t.isUpdate=!0}}},[n("span",{staticClass:"title-wrapper"},[t._v(t._s(t.todo.title))]),t._v(" "),n("span",{staticClass:"count-list"},[t._v(t._s(t.todo.count||0))])]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.isUpdate,expression:"!isUpdate"}],staticClass:"nav-group right"},[n("div",{staticClass:"options-web"},[n("a",{staticClass:"nav-item",on:{click:t.onlock}},[t.todo.locked?n("span",{staticClass:"icon-lock"}):n("span",{staticClass:"icon-unlock"})]),t._v(" "),n("a",{staticClass:"nav-item"},[n("span",{staticClass:"icon-trash",on:{click:t.onDelete}})])])]),t._v(" "),n("div",{staticClass:"form todo-new input-symbol"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],attrs:{type:"text",placeholder:"请输入",disabled:t.todo.locked},domProps:{value:t.text},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onAdd.apply(null,arguments)},input:function(e){e.target.composing||(t.text=e.target.value)}}}),t._v(" "),n("span",{staticClass:"icon-add"})])]),t._v(" "),n("div",{staticClass:"content-scrollable list-items"},t._l(t.items,function(e,o){return n("div",{key:o},[n("item",{attrs:{item:e,index:o,_id:t.todo._id,init:t.init,locked:t.todo.locked}})],1)}),0)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"nav-item"},[e("span",{staticClass:"icon-list-unordered"})])}]};var A=n("VU/8")(I,R,!1,function(t){n("AIMO")},null,null).exports,V={name:"Layouts",components:{menus:L,todo:A},computed:{menuOpen:function(){return this.$store.state.menuOpen}}},M={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"container",class:{"menu-open":t.menuOpen}},[n("section",{staticClass:"menu"},[n("menus")],1),t._v(" "),n("div",{staticClass:"content-overlay",on:{click:function(e){return t.$store.dispatch("updateMenu")}}}),t._v(" "),n("section",{staticClass:"content-container"},[n("todo")],1)])},staticRenderFns:[]};var F=n("VU/8")(V,M,!1,function(t){n("1N66")},null,null).exports,q={data:function(){return{model:{}}},methods:{loginhandle:function(){var t=this;console.log(Object({NODE_ENV:"production"}).VUE_APP_API_ROOT),O(this.model).then(function(e){console.log(e),localStorage.todouser=t.model.user,t.$router.push("/todo")})}}},j={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pages_agile_info_w3l"},[n("div",{staticClass:"over_lay_agile_pages_w3ls"},[n("div",{staticClass:"registration"},[n("div",{staticClass:"signin-form profile"},[n("h2",[t._v("请登录")]),t._v(" "),n("div",{staticClass:"login-form"},[n("form",{attrs:{action:""},on:{submit:function(e){return e.preventDefault(),t.loginhandle.apply(null,arguments)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.model.user,expression:"model.user"}],attrs:{type:"text",name:"username",placeholder:"用户名",required:""},domProps:{value:t.model.user},on:{input:function(e){e.target.composing||t.$set(t.model,"user",e.target.value)}}}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.model.password,expression:"model.password"}],attrs:{type:"password",name:"password",placeholder:"密码",required:""},domProps:{value:t.model.password},on:{input:function(e){e.target.composing||t.$set(t.model,"password",e.target.value)}}}),t._v(" "),t._m(0)])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tp"},[e("input",{attrs:{type:"submit",value:"登录"}})])}]};var S=n("VU/8")(q,j,!1,function(t){n("K4f5")},null,null).exports;i.a.use(h.a);var H=new h.a({routes:[{path:"/todo/login",name:"Login",component:S,meta:{isPublic:!0}},{path:"/todo",name:"Layouts",component:F,children:[{path:"/todo/:_id",name:"todo",component:A,props:!0}]}]});H.beforeEach(function(t,e,n){if(!t.meta.isPublic&&!localStorage.todouser)return n("/todo/login");n()});var K=H,W=n("NYxO"),G=n("//Fk"),J=n.n(G),X=function(t){var e=t.commit;return new J.a(function(t){C().then(function(n){e("EDITTODE",n.data.todos),t()})})},Y=function(t){(0,t.commit)("MENUOPEN")},z=function(t){return t.todoList};i.a.use(W.a);var B=new W.a.Store({actions:o,getters:s,state:{todoList:[],menuOpen:!1},mutations:{EDITTODE:function(t,e){t.todoList=e},MENUOPEN:function(t){t.menuOpen=!t.menuOpen}}});i.a.config.productionTip=!1,new i.a({el:"#app",router:K,store:B,render:function(t){return t(v)}})},RU2c:function(t,e){},sTV7:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.f8c5256490cc96ee9284.js.map