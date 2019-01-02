<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="isLogged">
    <router-link to="/" class="navbar-brand">Vue Base 3.0</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>

          <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Cadastro
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link to="/clientes" class="dropdown-item">Clientes</router-link>
              <router-link to="/centrocustos" class="dropdown-item">Centro de custos</router-link>
              <router-link to="/numerosNConfiaveis" class="dropdown-item">Numeros não confiaveis</router-link>
                          <router-link to="/tipoCampanhas" class="dropdown-item">Tipos de Campanhas</router-link>
              <router-link to="/users" class="dropdown-item">Usuários</router-link>
            </div>
          </li> -->

        </ul>

        <ul class="navbar-nav my-2 my-md-0 mr-md-3 ">
          <li class="nav-item">
            <li class="nav-link" @click="logout()">
              Logout
              <font-awesome-icon icon="exit" />
            </li>
          </li>
        </ul>
    </div>

    <div class="myBredcrumb">
       <ul class="list-inline"> <!--  create dinamic raoute match here -->
        <li class="list-inline-item">Start</li> /
        <li class="list-inline-item">Lorem ipsum</li> /
        <li class="list-inline-item">Phasellus iaculis</li> /
        <li class="list-inline-item">Nulla volutpat</li>
      </ul>
    </div>

  </nav>
</template>

<script>
import store from '@/store';

export default {
  name: 'app-nav',
  data() {
    return {
      links: [],
    };
  },
  methods: {
    logout() {
      this.$store.commit('user_logout');
    },
    showOnNav(link) {
      return link.meta && link.meta.showOnNav;
    }
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLogged;
    },
  },
  mounted() {
    this.links = this.$router.options.routes;
  }
};
</script>

<style scoped>
.myBredcrumb{
  position: absolute;
  top: 60px;
  left: 188px;
  font-weight: 100;
  font-size: 10px;
  color: #818181
}
.collapse{
  width: 100%
}
</style>
