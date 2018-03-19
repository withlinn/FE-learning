webpackJsonp([1],{"3ZxV":function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("7+uW"),s=a("mtWM"),i=a.n(s),r={apiPath:"https://zhihu-agent.herokuapp.com/get?api=/4/"};r.ajax=i.a.create({baseURL:r.apiPath}),r.ajax.interceptors.response.use(function(t){return t.data}),r.getTodayTime=function(){var t=new Date;return t.setHours(0),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),t.getTime()},r.prevDay=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(new Date).getTime(),e=new Date(t);return e.getFullYear()+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth())+(e.getDate()<10?"0"+e.getDate():e.getDate())};var o=r,l={props:{data:{type:Object}},data:function(){return{}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{staticClass:"daily-item"},[t.data.images?a("div",{staticClass:"daily-img"},[a("img",{attrs:{src:t.data.images[0],alt:t.data.title}})]):t._e(),t._v(" "),a("div",{staticClass:"daily-title",class:{noImg:!t.data.images}},[t._v(t._s(t.data.title))])])},staticRenderFns:[]};var m=a("VU/8")(l,c,!1,function(t){a("ycqg")},null,null).exports,d={props:{id:{type:Number,default:-1}},data:function(){return{data:{},comments:[]}},methods:{getArticle:function(){var t=this;o.ajax.get("news/"+this.id).then(function(e){t.data=e,window.scrollTo(0,0),t.getComments()})},getComments:function(){var t=this;this.comments=[],o.ajax.get("story/"+this.id+"/short-comments").then(function(e){t.comments=e.comments})}},watch:{id:function(t){t&&this.getArticle()}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"daily-article"},[a("div",{staticClass:"daily-article-title"},[t._v(t._s(t.data.title))]),t._v(" "),a("div",{staticClass:"daily-article-content",domProps:{innerHTML:t._s(t.data.body)}}),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.comments.length,expression:"comments.length"}],staticClass:"daily-comments"},[a("span",[t._v("评论（"+t._s(t.comments.length)+"）")]),t._v(" "),t._l(t.comments,function(e,n){return a("div",{key:n,staticClass:"daily-comment"},[a("div",{staticClass:"daily-comment-avatar"},[a("img",{attrs:{src:e.avatar}})]),t._v(" "),a("div",{staticClass:"daily-comment-content"},[a("div",{staticClass:"daily-comment-name"},[t._v(t._s(e.author))]),t._v(" "),a("div",{staticClass:"daily-comment-text"},[t._v(t._s(e.content))])])])})],2)])},staticRenderFns:[]};var h={name:"App",data:function(){return{themes:[],showThemes:!1,type:"recommend",themeId:0,list:[],isLoading:!1,dailyTime:o.getTodayTime(),recommendList:[],articleId:0}},components:{Item:m,DailyArticle:a("VU/8")(d,u,!1,function(t){a("3ZxV")},null,null).exports},methods:{handleClick:function(t){this.articleId=t},formatDate:function(t){var e=t.substr(4,2),a=t.substr(6,2);return"0"===e.substr(0,1)&&(e=e.substr(1,1)),"0"===a.substr(0,1)&&(a=a.substr(1,1)),e+" 月 "+a+" 日　"},getThemes:function(){var t=this;o.ajax.get("themes").then(function(e){t.themes=e.others})},handleToTheme:function(t){var e=this;this.type="daily",this.themeId=t,this.list=[],o.ajax.get("theme/"+t).then(function(t){e.list=t.stories.filter(function(t){return 1!==t.type})})},handleToRecommend:function(){this.type="recommend",this.recommendList=[],this.dailyTime=o.getTodayTime(),this.getRecommentedList()},getRecommentedList:function(){var t=this;this.loading=!0;var e=o.prevDay(this.dailyTime+864e5);o.ajax.get("news/before/"+e).then(function(e){t.recommendList.push(e),t.isLoading=!1})}},mounted:function(){var t=this;this.getRecommentedList(),this.getThemes();var e=this.$refs.list;e.addEventListener("scroll",function(){"daily"===t.type||t.isLoading||e.scrollTop+document.body.clientHeight>=e.scrollHeight&&(t.dailyTime-=864e5,t.getRecommentedList())})}},v={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"daily"},[a("div",{staticClass:"daily-menu"},[a("div",{staticClass:"daily-menu-item",class:{on:"recommend"===t.type},on:{click:t.handleToRecommend}},[t._v("每日推荐")]),t._v(" "),a("div",{staticClass:"daily-menu-item",class:{on:"daily"===t.type},on:{click:function(e){t.showThemes=!t.showThemes}}},[t._v("主题日报")]),t._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:t.showThemes,expression:"showThemes"}]},t._l(t.themes,function(e,n){return a("li",{key:n},[a("a",{class:{on:e.id===t.themeId&&"daily"===t.type},on:{click:function(a){t.handleToTheme(e.id)}}},[t._v(t._s(e.name))])])}))]),t._v(" "),a("div",{ref:"list",staticClass:"daily-list"},["recommend"===t.type?t._l(t.recommendList,function(e,n){return a("div",{key:n},[a("div",{staticClass:"daily-date"},[t._v(t._s(t.formatDate(e.date)))]),t._v(" "),t._l(e.stories,function(e,n){return a("Item",{key:n,attrs:{data:e},nativeOn:{click:function(a){t.handleClick(e.id)}}})})],2)}):t._e(),t._v(" "),"daily"===t.type?t._l(t.list,function(e,n){return a("Item",{key:n,attrs:{data:e},nativeOn:{click:function(a){t.handleClick(e.id)}}})}):t._e()],2),t._v(" "),a("daily-article",{attrs:{id:t.articleId}})],1)},staticRenderFns:[]};var _=a("VU/8")(h,v,!1,function(t){a("dNYG")},null,null).exports,f=a("/ocq"),g={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("h1",[t._v(t._s(t.msg))]),t._v(" "),a("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),a("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",[a("li",[a("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("\n        Core Docs\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("\n        Forum\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("\n        Community Chat\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("\n        Twitter\n      ")])]),t._v(" "),a("br"),t._v(" "),a("li",[a("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("\n        Docs for This Template\n      ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[e("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};var p=a("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},g,!1,function(t){a("Ugm9")},"data-v-694cd902",null).exports;n.a.use(f.a);var y=new f.a({routes:[{path:"/",name:"HelloWorld",component:p}]});n.a.config.productionTip=!1,new n.a({el:"#app",router:y,components:{App:_},template:"<App/>"})},Ugm9:function(t,e){},dNYG:function(t,e){},ycqg:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.62de109797801ed295c2.js.map