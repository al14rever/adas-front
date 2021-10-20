import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      guest: true
    },
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('../views/SignIn.vue'),
    meta: {
      guest: true
    },
  },
  {
    path: '/new/password/:hash',
    name: 'NewPassword',
    component: () => import('../views/NewPassword.vue'),
    meta: {
      guest: true
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/SignUp.vue'),
    meta: {
      guest: true
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      auth: true
    },
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {
      auth: true
    },
  },
  {
    path: '/logs',
    name: 'Logs',
    component: () => import('../views/Logs.vue'),
    meta: {
      auth: true
    },
  },
  {
    path: '/admin/panel/users',
    name: 'AdminUsers',
    component: () => import('../views/AdminUsers.vue'),
    meta: {
      auth: true,
      isAdmin: true
    },
  },
  {
    path: '/admin/panel/user/edit',
    name: 'AdminUsersEdit',
    component: () => import('../views/AdminUsersEdit.vue'),
    meta: {
      auth: true,
      isAdmin: true
    },
  },
  {
    path: '/admin/panel/devices',
    name: 'AdminDevices',
    component: () => import('../views/AdminDevices.vue'),
    meta: {
      auth: true,
      isAdmin: true
    },
  },
  {
    path: '/admin/panel/accounting',
    name: 'AdminAccounting',
    component: () => import('../views/AdminAccounting.vue'),
    meta: {
      auth: true,
      isAdmin: true
    },
  },
  {
    path: '/admin/panel/generator/qrcode',
    name: 'GeneratorQR',
    component: () => import('../views/GeneratorQR.vue'),
    meta: {
      auth: true,
      isAdmin: true
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.auth)) {
      if (!localStorage.getItem('token')) {
          next({
              path: '/',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse(localStorage.getItem('user'))
          if(to.matched.some(record => record.meta.isAdmin)) {
              if(user.isAdmin){
                  next()
              }
              else{
                  next({ name: 'Profile'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(!localStorage.getItem('token')){
          next()
      }
      else{
          next({ name: 'Profile'})
      }
  }else {
      next() 
  }
})

export default router
