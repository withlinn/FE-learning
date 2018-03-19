<template>
<div class="daily-article">
   <div class="daily-article-title">{{data.title}}</div>
    <div class="daily-article-content" v-html="data.body"></div>
    <div class="daily-comments" v-show="comments.length">
        <span>评论（{{ comments.length }}）</span>
        <div
            class="daily-comment"
            v-for="(comment,index) in comments"
            :key="index">
            <div class="daily-comment-avatar">
                <img :src="comment.avatar">
            </div>
            <div class="daily-comment-content">
                <div class="daily-comment-name">{{comment.author}}</div>
                <div class="daily-comment-text">{{ comment.content }}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import $ from '../util'
export default {
  props: {
    id: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      data: {},
      comments: []
    }
  },
  methods: {
    getArticle () {
      $.ajax.get('news/' + this.id).then(res => {
        this.data = res
        window.scrollTo(0, 0)
        this.getComments()
      })
    },
    getComments () {
      this.comments = []
      $.ajax.get('story/' + this.id + '/short-comments').then(res => {
        this.comments = res.comments
      })
    }
  },
  watch: {
    id (val) {
      if (val) this.getArticle()
    }
  }
}
</script>

<style>
.daily-article{
    margin-left: 500px;
    padding: 20px;
}

.daily-article-title{
    font-size: 28px;
    font-weight: bold;
    color: #222;
    padding: 10px 0;
}

.view-more a{
    display: block;
    cursor: pointer;
    color: #fff;
    background:rgb(0,132,255);
    text-align: center;
    text-decoration: none;
    padding: 10px 0;
    border-radius: 3px;
}
.daily-comments{
    margin: 10px 0;
}
.daily-comments span{
    display: block;
    margin: 10px 0;
    font-size: 20px;
}
.daily-comment{
    overflow: hidden;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #e3e8ee;
}

.daily-comment-avatar{
    width: 50px;
    height: 50px;
    float: left;
}

.daily-comment-avatar img{
    width: 100%;
    height: 100%;
    border-radius: 3px;
}

.daily-comment-content{
    margin-left: 65px;
}

.daily-comment-text{
    margin-top: 10px;
}
</style>
