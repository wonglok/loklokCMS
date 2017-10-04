import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import LayoutPrototype from '@/components/LayoutHTML/Prototype'

import Preview from '@/components/Prototypes/Preview'
import Ball from '@/components/Prototypes/Scene/Ball'
import Fun from '@/components/Prototypes/Scene/Fun'
import Red from '@/components/Prototypes/Scene/Red'
import Woody from '@/components/Prototypes/Scene/Woody'

import NikeMobilerHTML from '@/components/LayoutHTML/Nike'
import GameLanding from '@/components/NikeWebGL/GameLanding'

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
      path: '/nike',
      component: NikeMobilerHTML,
      children: [
        {
          path: 'game',
          name: 'nike-scene',
          component: GameLanding
        }
      ]
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
            },
            {
              path: 'red',
              component: Red
            },
            {
              path: 'woody',
              component: Woody
            }
          ]
        }
      ]
    }
  ]
})
