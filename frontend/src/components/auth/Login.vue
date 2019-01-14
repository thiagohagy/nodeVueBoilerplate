<template>
  <form class="form-signin" v-on:submit.prevent="logar">
    <h2 class="form-signin-heading">Login</h2>
    <input v-model="form.login" type="text" class="form-control" placeholder="Login" required autofocus>
    <input v-model="form.password" type="password" class="form-control" placeholder="Password" required>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>

    <my-alert
        class="alert-danger"
        message ='Wrong user or password'
        :show='showError'
        closeButton='true'
    ></my-alert>

  </form>
</template>

<script>

export default {
  name: 'login',

  data() {
    return {
      showError: false,
      form: {
        login: '',
        password: '',
      },
    };
  },

  beforeCreate() {
    if (this.$store.getters.isLogged) {
      this.$router.push('/');
    }
  },

  methods: {
    logar() {
      this.showError = false;
      this.$http.post('/login', this.form).then(response => {
        if (response.success) {
          this.$store.commit('user_login',response);
        } else {
          this.showError = true;
        }
      });
    }
  }
};
</script>

<style>
.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 80px auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
