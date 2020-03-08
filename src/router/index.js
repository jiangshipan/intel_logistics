import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import SendOrder from '../components/SendOrder'
import Index from '../components/Index'
import SearchOrder from '../components/SearchOrder'
import Customer from '../components/Customer'
import Employee from '../components/Employee'
import Order from '../components/Order'
import Logistics from '../components/Logistics'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/customer',
          name: 'Customer',
          component: Customer
        }, {
          path: '/employee',
          name: 'Employee',
          component: Employee
        }, {
          path: '/order',
          name: 'Order',
          component: Order
        }, {
          path: '/logistics',
          name: Logistics,
          component: Logistics
        }]
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
    }, 
  ]
})
