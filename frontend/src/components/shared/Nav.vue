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


      <b-navbar-nav class="ml-auto ">
        <b-nav-item id="profileDropdown">
          <b-nav-item-dropdown class="nav-item" text="token.name" right>
            <b-dropdown-item href="#">
              <router-link :to="{ name: 'userEdit' }" class="nav-link dropdown-nav-link">My profile</router-link>
            </b-dropdown-item>

            <b-dropdown-item href="#" @click="logout()">
              <router-link :to="{ name: 'userEdit' }" class="nav-link dropdown-nav-link">
                Logout
                <font-awesome-icon icon="sign-out-alt" />
              </router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-item class="nomargin">
          <router-link to="/" class="navbar-brand nomargin">
            <b-img rounded="circle" blank width="55" style="" height="55" blank-color="#777" alt="My profile" title="My profile" class="m-1 nomargin" />
          </router-link>
        </b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import store from '@/store';
import jwtDecode from 'jwt-decode';

export default {
  name: 'app-nav',
  data() {
    return {
      links: [],
      breadcrumb: '',
      token: {},
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
    // this.token = this.$store.getters.authToken;
    // console.log(this.$store.getters.authToken);
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
  top: 50px;
  left: 170px;
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

#nav_collapse{
  margin-right:0px;
  padding-right:0px;
}

#profileDropdown{
  margin-right: 0px;
  padding-right: 0px;
}

#profileDropdown .nav-item {
  margin: 0px;
}

</style>
