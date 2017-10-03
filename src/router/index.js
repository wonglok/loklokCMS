import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import LayoutPrototype from '@/components/Layout/Prototype'
import Preview from '@/components/Prototypes/Preview'
import Ball from '@/components/Prototypes/Scene/Ball'
import Fun from '@/components/Prototypes/Scene/Fun'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/prototypes',
      component: LayoutPrototype,
      redirect: '/prototypes/scene/ball',
      children: [
        {
          path: 'scene',
          name: 'Preview',
          component: Preview,
          redirect: '/prototypes/scene/ball',
          children: [
            {
              path: 'ball',
              component: Ball
            },
            {
              path: 'fun',
              component: Fun
            }
          ]
        }
      ]
    }
  ]
})
