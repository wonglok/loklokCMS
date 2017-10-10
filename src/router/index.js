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

import Game from '@/components/NikeWebGL/Game'

import BoxingCamp from '@/components/NikeWebGL/Pages/BoxingCamp/BoxingCamp'
import Agree from '@/components/NikeWebGL/Pages/Agree/Agree'
import Play from '@/components/NikeWebGL/Pages/Play/Play'
import Rules from '@/components/NikeWebGL/Pages/Rules/Rules'
import Status from '@/components/NikeWebGL/Pages/Status/Status'

Vue.use(Router)

var nikeGame = [
  {
    path: 'game',
    component: Game,
    children: [
      {
        path: '',
        component: BoxingCamp
      },
      {
        path: 'agree',
        component: Agree
      },
      {
        path: 'play',
        component: Play
      },
      {
        path: 'status',
        component: Status
      },
      {
        path: 'rules',
        component: Rules
      }
    ]
  }
]

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
      children: nikeGame
    },
    {
      path: '/cms',
      component: NikeMobilerHTML,
      children: nikeGame
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
