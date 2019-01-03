<template>

  <b-navbar toggleable="md" type="dark" variant="info"  class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="isLogged">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
   
    <b-navbar-brand href="#">
      <router-link to="/" class="navbar-brand">Vue Show</router-link>
    </b-navbar-brand>

     <b-navbar-nav id="myBredcrumb">
        <b-nav-text >
          {{breadcrumb}}
        </b-nav-text>
      </b-navbar-nav> 

    <b-collapse is-nav id="nav_collapse">

      <!-- simples routes -->
      <b-navbar-nav>
        <b-nav-item 
        href="#"
        class="nav-item" 
        v-for="link in links" 
        :key='link.name' 
        v-if='!link.children && link.meta.showOnNav'>
          <router-link :to="{ name: link.name }" class="nav-link">{{link.meta.humanName}}</router-link>
        </b-nav-item>        
      </b-navbar-nav>

      <!-- nested routes -->        
      <b-navbar-nav>
        <b-nav-item-dropdown 
          class="nav-item" 
          :text="link.meta.humanName" 
          v-for="link in links" 
          :key='link.name' 
          v-if='link.children && link.meta.showOnNav'
        >
          <b-dropdown-item 
            href="#"  
            v-for="sublink in link.children"
            v-if='sublink.meta.showOnNav'
            :key='sublink.name'
          >
            <router-link :to="{ name: sublink.name }" class="nav-link dropdown-nav-link">{{sublink.meta.humanName}}</router-link>
          </b-dropdown-item>
        </b-nav-item-dropdown> 
      </b-navbar-nav>
    
      <!-- 
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> 
      -->

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#" right>
          <li class="nav-link" @click="logout()">
            Logout
            <font-awesome-icon icon="sign-out-alt" />
          </li>
        </b-nav-item>
      </b-navbar-nav>
    
    </b-collapse>
  </b-navbar>
</template>

<script>
import store from '@/store';

export default {
  name: 'app-nav',
  data() {
    return {
      links: [],
      breadcrumb: '',
    };
  },
  methods: {
    logout() {
      this.$store.commit('user_logout');
    },
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLogged;
    },
  },
  mounted() {
    this.links = this.$router.options.routes;
  },
  watch: {
    '$route' (to, from) {
      this.breadcrumb = this.$route.meta.pathAlias;
    }
  }
};
</script>

<style scoped>
#myBredcrumb{
  position: absolute;
  top: 65px;
  left: 165px;
}
#myBredcrumb span {
  font-weight: 100;
  font-size: 11px;
  color: #777
}
.collapse{
  width: 100%
}

.nomargin {
  margin:0px;
  padding:0px;
}
</style>
