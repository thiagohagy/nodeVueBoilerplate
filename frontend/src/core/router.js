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

// CLIENTS
const Clients = (resolve) => {
  require.ensure(['./../components/client/Home.vue'], () => {
    resolve(require('././../components/client/Home.vue'));
  });
};

const ClientsForm = (resolve) => {
  require.ensure(['./../components/client/Form.vue'], () => {
    resolve(require('././../components/client/Form.vue'));
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
        humanName: 'Home',
        pathAlias: 'Home',
        showOnNav: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        humanName: 'Login',
        pathAlias: 'Users / Login',
      },
    },
    {
      path: '/users',
      component: {
        render(c) { return c('router-view') } /// then I dont need a parent component file
      },
      meta: {
        humanName: 'Users',
        showOnNav: true,
      },
      children: [
        {
          path: '',
          name: 'Users',
          component: Users,
          meta: {
            humanName: 'List',
            pathAlias: 'Users / List',
            showOnNav: true,
          },
        },
        {
          path: 'form/:id?',
          props: true, // pass paramas as props, then you dont need to use $watch
          name: 'UsersForm',
          component: UsersForm,
          meta: {
            humanName: 'Form',
            pathAlias: 'Users / Form',
            showOnNav: true,
          },
        },
      ],
    },
    {
      path: '/clients',
      component: {
        render(c) { return c('router-view') } /// then I dont need a parent component file
      },
      meta: {
        humanName: 'Clients',
        showOnNav: true,
      },
      children: [
        {
          path: '',
          name: 'Clients',
          component: Clients,
          meta: {
            humanName: 'List',
            pathAlias: 'Clients / List',
            showOnNav: true,
          },
        },
        {
          path: 'form/:id?',
          props: true, // pass paramas as props, then you dont need to use $watch
          name: 'ClientsForm',
          component: ClientsForm,
          meta: {
            humanName: 'Form',
            pathAlias: 'Clients / Form',
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
