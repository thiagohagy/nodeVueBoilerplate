import Vue from 'vue';
import Router from 'vue-router';
import ls from 'local-storage';


// lazy loading
// DEFAULT
/* eslint-disable global-require */
const Home = (resolve) => {
  require.ensure(['./../components/Home.vue'], () => {
    resolve(require('././../components/Home.vue'));
  });
};

const About = (resolve) => {
  require.ensure(['./../components/About.vue'], () => {
    resolve(require('././../components/About.vue'));
  });
};

const Login = (resolve) => {
  require.ensure(['./../components/auth/Login.vue'], () => {
    resolve(require('././../components/auth/Login.vue'));
  });
};

// USERS
const Users = (resolve) => {
  require.ensure(['./../components/users/Home.vue'], () => {
    resolve(require('././../components/users/Home.vue'));
  });
};

const UsersForm = (resolve) => {
  require.ensure(['./../components/users/Form.vue'], () => {
    resolve(require('././../components/users/Form.vue'));
  });
};
/* eslint-enable global-require */


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        humanName: 'Início',
        pathAlias: 'Início',
        showOnNav: true,
      },
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        humanName: 'Sobre',
        pathAlias: 'Inicio / Sobre',
        showOnNav: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        humanName: 'Login',
        pathAlias: 'Usuários / Login',
      },
    },
    {
      path: '/users',
      meta: {
        humanName: 'Usuários',
        showOnNav: true,
      },
      children: [
        {
          path: '/users',
          name: 'Users',
          component: Users,
          meta: {
            humanName: 'Listagem',
            pathAlias: 'Usuários / Listagem',
            showOnNav: true,
          },
        },
        {
          path: '/users/form',
          name: 'UsersForm',
          component: UsersForm,
          meta: {
            humanName: 'Novo usuário',
            pathAlias: 'Usuários / Formulário',
            showOnNav: true,
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = ls('token');
  if (!token && (to.name !== 'Login')) {
    next('/login');
  } else {
    next();
  }
});

export default router;
