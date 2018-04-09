import Vue from 'vue'
import Router from 'vue-router'
import Articles from '@/components/Articles'
import Article from '@/components/Article'
import CrudAdmin from '@/components/CrudAdmin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/articles',
      name: 'articles',
      component: Articles
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article
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
