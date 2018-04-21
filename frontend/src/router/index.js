import Vue from 'vue'
import Router from 'vue-router'
import Articles from '@/components/Articles'
import Article from '@/components/Article'
import Page from '@/components/Page'
import CrudAdmin from '@/components/CrudAdmin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/clanky',
      name: 'clanky',
      component: Articles
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article
    },
    {
      path: '/page/:id',
      name: 'page',
      component: Page
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
