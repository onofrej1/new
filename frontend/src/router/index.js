import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CrudAdmin from '@/components/CrudAdmin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/crud',
      name: 'crud',
      component: CrudAdmin,
      meta: {
        adminLayout: true,
      },
  },
  ],
  base: __dirname,
  mode: 'history'
})
