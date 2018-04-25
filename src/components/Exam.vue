<template>
  <div v-if="!loading">
    <div class="head"><span>{{exam.examName}}</span><button @click="toggleView">概览</button></div>
    <div class="question">{{exam.questions[currentQ - 1].id + '.' + exam.questions[currentQ - 1].details}}</div>
    <ul class="select" v-if="exam.questions[currentQ - 1].type === 1 || exam.questions[currentQ - 1].type === 2">
      <li v-for="option in exam.questions[currentQ - 1].options" @click="selectS(option.id)" :key="option.id"><span :class="exam.questions[currentQ - 1].answer.indexOf(option.id) !== -1 ? 'selected' : ''">{{option.id}}</span>{{option.optionDetails}}</li>
    </ul>
    <ul class="select" v-else-if="exam.questions[currentQ - 1].type === 3">
      <li v-for="option in exam.questions[currentQ - 1].options" @click="selectM(option.id)" :key="option.id"><span :class="exam.questions[currentQ - 1].answer.indexOf(option.id) !== -1 ? 'selected' : ''">{{option.id}}</span>{{option.optionDetails}}</li>
    </ul>
    <div class="text" v-else-if="exam.questions[currentQ - 1].type === 4">
      <textarea v-model="exam.questions[currentQ - 1].answer" placeholder="请输入答案..."></textarea>
    </div>
    <div class="buttonsWrap"><button v-show="notFisrtQ" @click="goQ(currentQ - 1)">上一题</button><button @click="submit">提交</button><button v-show="notLastQ" @click="goQ(currentQ + 1)">下一题</button></div>
    <div class="overViewWrap" v-show="overViewOpen" @click="toggleView">
      <ul>
        <li :class="[qs.answer ? 'hasAnswer' : '',currentQ === qs.id ? 'current' : '']" :key="qs.id" v-for="qs in exam.questions" @click="goQ(qs.id)">{{qs.id}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Exam',
  props: ['id'],
  data () {
    return {
      exam: {},
      overViewOpen: false,
      loading: true,
      currentQ: 1
    }
  },
  computed: {
    notFisrtQ: function () {
      return this.currentQ !== 1
    },
    notLastQ: function () {
      return this.currentQ !== this.exam.questions.length
    }
  },
  methods: {
    goQ: function (targetQ) {
      this.currentQ = targetQ
    },
    selectS: function (optionId) {
      if (this.exam.questions[this.currentQ - 1].answer.indexOf(optionId) === -1) {
        this.exam.questions[this.currentQ - 1].answer = optionId
      } else {
        this.exam.questions[this.currentQ - 1].answer = ''
      }
    },
    selectM: function (optionId) {
      let a = this.exam.questions[this.currentQ - 1].answer
      let i = a.indexOf(optionId)
      if (i === -1) {
        this.exam.questions[this.currentQ - 1].answer += optionId
      } else {
        a = a.split('')
        a.splice(i, 1)
        this.exam.questions[this.currentQ - 1].answer = a.join('')
      }
    },
    toggleView: function () {
      this.overViewOpen = !this.overViewOpen
    },
    submit: function () {
      this.axios.post('saveAnswer/' + this.id, this.exam).then((response) => {
        if (response.data.success){ alert ('提交成功') }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  beforeCreate () {
    console.log('beforeCreate')
  },
  created () {
    let passIn = this.id
    this.axios.defaults.baseURL = 'http://fe-ace.6655.la:10221'
    this.axios.get('exam?id=' + this.id).then((response) => {
      this.loading = false
      this.exam = response.data
    }).catch((error) => {
      console.log(error)
    })
    console.log(passIn)
    console.log('created')
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mounted () {
    console.log('mounted')
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  }
}
</script>
<style lang='less' scoped>
@mainColor: #4f4ff4;
@contrastColor: @mainColor + #940000 - #000094;
@baseColor: #333;
@lightColor: #eee;
@defaultBorderR: 3px;
.buttonDefault-mixin() {
  border: 1px solid @mainColor;
  border-radius: @defaultBorderR;
  background-color: @mainColor;
  padding: 0.25em 0.5em;
  color: @lightColor;
  cursor: pointer;
}
button{
  .buttonDefault-mixin;
}
.head{
  position: relative;
  color: @baseColor;
  height: 2em;
  text-align: center;
  line-height: 2em;
  padding: 0 3em;
  background-color: @lightColor + #030303;
  border-bottom: 1px solid @lightColor;
  span{
    font-wight: bold;
    font-size: 1.5em;
  }
  button{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    float: right;
  }
}
.question{
  font-size: 1.1em;
  padding: 0.5em 2em;
}
.questionDetail-mixin() {
  padding: 0.5em 2em;
}
.select{
  .questionDetail-mixin;
  li{
    line-height: 1.5em;
    cursor: pointer;
    span{
      color: @mainColor;
      padding: 0.1em;
      line-height: 1em;
      border: 1px solid @mainColor;
      border-radius: @defaultBorderR;
      display: inline-block;
      margin-right: 0.25em;
    }
    .selected{
      color: @lightColor;
      background-color: @mainColor;
    }
  }
}
.text{
  .questionDetail-mixin;
  textarea{
    box-sizing: border-box;
    padding: 0.5em;
    width: 100%;
    height: 5em;
    line-height: 1.25em;
    resize: none;
    color: @baseColor;
    border-radius: @defaultBorderR;
    background-color: @lightColor + #070707;
  }
}
.buttonsWrap{
  margin-top: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  button + button{
    margin-left: 1em;
  }
}
.overViewWrap{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,0.2);
  z-index: 10;
  ul{
    margin: 50% 0 0 50%;
    transform: translate(-50%,-50%);
    padding: 2em;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    width: 80%;
    background-color: @lightColor;
    li{
      margin: 0.5em;
      .buttonDefault-mixin;
      padding: 0.25em 0;
      width: 1.5em;
      text-align: center;
      color: @mainColor;
      background-color: transparent;
      &.hasAnswer{
        color: @lightColor;
        background-color: @mainColor;
      }
      &.current{
        color: @contrastColor;
        border-color: @contrastColor;
        background-color: transparent;
      }
      &.hasAnswer.current{
        color: @lightColor;
        background-color: @contrastColor;
      }
    }
  }
}
</style>
