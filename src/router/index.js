import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue' // Home

import User from '../views/user/Default.vue' // 引入用户组件
import UserList from '../views/user/List.vue'
import UserAdd from '../views/user/Add.vue'
import UserEdit from '../views/user/Edit.vue'

import Goods from '../views/goods/Default.vue'// 引入商品组件
import GoodsList from '../views/goods/List.vue'
import GoodsAdd from '../views/goods/Add.vue'
import GoodsEdit from '../views/goods/Edit.vue'

import Order from '../views/order/Default.vue'// 引入订单组件
import OrderList from '../views/order/List.vue'

import Login from '../views/Login.vue' // 引入登录功能组件
import Reg from '../views/Reg.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/', // 路径不对跳主页
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children : [
      { // 用户管理router
        path: 'user',
        component: User,
        children: [
          {
            path: '',
            redirect: 'list'
          }, {
            path: 'list',
            component: UserList
          },{
            path: 'add',
            component : UserAdd
          },{
            path: 'edit',
            component: UserEdit
          }
        ]
      },{ // 商品管理router
        path: 'goods',
        component: Goods,
        children: [
          {
            path: '',
            redirect: 'list'
          }, {
            name: 'goodslist',
            path: 'list',
            component: GoodsList
          },{
            path: 'add',
            component : GoodsAdd
          },{
            name:'goodsEdit',
            path: 'edit',
            component: GoodsEdit
          }
        ]
      },{ // 订单管理router
        path: 'order',
        component: Order,
        children: [
          {
            path: '',
            redirect: 'list'
          }, {
            path: 'list',
            component: OrderList
          }
        ]
      }
    ]
  },{ // 登录
    name : 'login',
    path: '/login',
    component: Login
  },{ // 注册
    name : 'reg',
    path : '/reg',
    component:Reg
  },

]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
