import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ExamLst from '@/components/ExamLst'
import Exam from '@/components/Exam'

Vue.use(VueAxios, axios)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ExamLst',
      component: ExamLst
    },
    {
      path: '/Exam/:id',
      name: 'Exam',
      props: true,
      component: Exam
    }
  ]
})
