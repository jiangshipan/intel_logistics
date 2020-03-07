import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import SendOrder from '../components/SendOrder'
import Index from '../components/Index'
import SearchOrder from '../components/SearchOrder'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/reg',
      name: 'Register',
      component: Register
    }, {
      path: '/order/send',
      name: 'SendOrder',
      component: SendOrder
    }, {
      path: '/order/search',
      name: 'SearchOrder',
      component: SearchOrder
    }
  ]
})
