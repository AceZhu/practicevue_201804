<template>
  <div class="lst">
    <ul v-if="exams.length">
      <li v-for="exam in exams" :key="exam.id">
        <router-link :to="'/Exam/' + exam.id">
          <h2>{{exam.name}}</h2>
          <div>试卷内容：{{exam.details}}</div>
          <div>用时：{{exam.time}}分钟</div>
        </router-link>
      </li>
    </ul>
    <div v-else>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'ExamLst',
  data () {
    return {
      exams: [],
      message: '正在加载...'
    }
  },
  created () {
  this.axios.defaults.baseURL = 'http://fe-ace.6655.la:10221'
    this.axios.get('examlst').then((response) => {
      this.exams.push.apply(this.exams, response.data.exams)
    }).catch((error) => {
      this.message = '加载失败'
      console.log(error)
    })
  }
}
</script>
<style lang='less' scoped>
.lst ul{
  width: 80%;
  margin: 0 auto;
  li{
    padding: 1em 0.5em;
    border-bottom: 1px solid #ccc;
    h2{
      font-weight: bold;
      font-size: 1.75em;
      line-height: 1.5em;
    }
    div{
      font-size: 1em;
      line-height: 1.5em;
    }
    div + div{
      text-align: right;
      line-height: 1.25em;
      font-size: 0.75em;
    }
  }
}
a {
  display: block;
}
</style>
