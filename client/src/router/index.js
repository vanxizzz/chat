import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Identify from "../views/Identify.vue"
import store from "../store"
Vue.use(VueRouter)

const routes = [
  {
    path: "/identify",
    name: "identify",
    component: Identify,
    redirect: "/identify/login",
    beforeEnter(to, from, next) {
      console.log("store.state.user.isLogin")
      console.log(store.state.user.isLogin)
      if (store.state.user.isLogin) {
        next("/");
      } else {
        next();
      }
    },
    children: [
      {
        path: "/identify/login",
        name: "login",
        component: Login
      },
      {
        path: "/identify/register",
        name: "register",
        component: Register,
      },
    ]
  },

  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      console.log(to, from)
      if (store.state.user.isLogin) {
        next();
      } else {
        next("/identify/login")
      }
    }
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
