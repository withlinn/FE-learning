<template>
  <div class="daily">
    <div class="daily-menu">
      <div class="daily-menu-item"
          :class="{on: type === 'recommend'}"
          @click="handleToRecommend"
          >每日推荐</div>
      <div class="daily-menu-item"
          :class="{on: type === 'daily'}"
          @click="showThemes = !showThemes"
          >主题日报</div>
      <ul v-show="showThemes">
        <li v-for="(item,index) in themes" :key="index">
            <a :class="{on: item.id === themeId && type === 'daily'}"
              @click="handleToTheme(item.id)"
              >{{ item.name }}</a>
        </li>
      </ul>
    </div>
    <div class="daily-list" ref="list">
      <template v-if="type === 'recommend'">
        <div v-for="(list,index) in recommendList" :key="index">
          <div class="daily-date">{{formatDate(list.date)}}</div>
          <Item
              v-for="(item,index) in list.stories"
              :key="index"
 :data="item"
@click.native="handleClick(item.id)"
 ></Item>
        </div>
      </template>
     <template v-if="type === 'daily'">
 <Item
v-for="(item,index) in list"
:key="index"
:data="item"
@click.native="handleClick(item.id)"
></Item>
     </template>
    </div>
    <daily-article :id="articleId"></daily-article>
  </div>
</template>

<script>
import $ from './util.js'
import Item from './components/Item'
import DailyArticle from './components/DailyArticle'
export default {
  name: 'App',
  data: function () {
    return {
      themes: [],
      showThemes: false,
      type: 'recommend',
      themeId: 0,
      list: [],
      isLoading: false,
      dailyTime: $.getTodayTime(),
      recommendList: [],
      articleId: 0
    }
  },
  components: {
    Item,
    DailyArticle
  },
  methods: {
    handleClick (id) {
      this.articleId = id
    },
    // 转换为带汉字的月日
    formatDate (date) {
      let month = date.substr(4, 2)
      let day = date.substr(6, 2)
      if (month.substr(0, 1) === '0') month = month.substr(1, 1)
      if (day.substr(0, 1) === '0') day = day.substr(1, 1)
      return `${month} 月 ${day} 日`
    },
    getThemes () {
      $.ajax.get('themes').then(res => {
        this.themes = res.others
      })
    },
    handleToTheme (id) {
      // 改变菜单栏分类
      this.type = 'daily'
      this.themeId = id
      this.list = []
      $.ajax.get('theme/' + id).then(res => {
        // 过滤掉类型为1的文章，该类型下的文章为空
        this.list = res.stories.filter(item => item.type !== 1)
      })
    },
    handleToRecommend () {
      this.type = 'recommend'
      this.recommendList = []
      this.dailyTime = $.getTodayTime()
      this.getRecommentedList()
    },
    getRecommentedList () {
      this.loading = true
      const prevDay = $.prevDay(this.dailyTime + 86400000)
      $.ajax.get('news/before/' + prevDay).then(res => {
        this.recommendList.push(res)
        this.isLoading = false
      })
    }
  },
  mounted () {
    this.getRecommentedList()
    this.getThemes()
    const $list = this.$refs.list
    $list.addEventListener('scroll', () => {
      if (this.type === 'daily' || this.isLoading) return
      if (
        $list.scrollTop + document.body.clientHeight >= $list.scrollHeight
      ) {
        this.dailyTime -= 86400000
        this.getRecommentedList()
      }
    })
  }
}
</script>

<style>
html, body{
  margin: 0;
  padding: 0;
  height: 100%;
  color: #657180;
  font-size: 16px;
}

.daily-menu{
  width: 200px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background: #f5f7f9;
}
.daily-date{
  text-align: center;
  margin: 10px 0;
}
.daily-menu-item{
  font-size: 18px;
  text-align: center;
  margin: 5px 0;
  padding: 10px 0;
  cursor: pointer;
  border-right: 2px solid transparent;
  transition: all .3s ease-in-out;
}

.daily-menu-item:hover{
  background: #e3e8ee;
}

.daily-menu-item.on{
  border-right: 2px solid #3399ff;
}

.daily-list{
  width: 300px;
  position: fixed;
  top: 0;
  left: 200px;
  bottom: 0;
  overflow: auto;
  border-right: 1px solid #d7dde4;
}

.dialy-item:hover{
  background: #e3e8ee;
}

.daily-article{
  margin-left: 450px;
  padding: 20px;
}

.daily-menu ul{
  list-style: none;
}
.daily-menu ul li a{
  display: block;
 text-decoration: none;
 padding: 5px 0;
 margin: 5px 0;
 cursor: pointer;
}

.daily-menu ul li a:hover, .daily-menu ul li a.on{
  color: #3399ff;
}

</style>
