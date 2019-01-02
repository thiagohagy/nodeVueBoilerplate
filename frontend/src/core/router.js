import Vue from 'vue';
import Router from 'vue-router';
import ls from 'local-storage';

// lazy loading
const Home = (resolve) => {
  require.ensure(['./../components/Home.vue'],() => {
    resolve(require('././../components/Home.vue'))
  });
};

const About = (resolve) => {
  require.ensure(['./../components/About.vue'],() => {
    resolve(require('././../components/About.vue'))
  });
};

const Login = (resolve) => {
  require.ensure(['./../components/auth/Login.vue'],() => {
    resolve(require('././../components/auth/Login.vue'))
  });
};


Vue.use(Router);

const router =  new Router({
  mode: 'history',
  base: '/',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  let token = ls('token');
  if (!token && (to.name !== 'Login')) {
    next('/login');
  } else{
    next();
  }
})

export default router;