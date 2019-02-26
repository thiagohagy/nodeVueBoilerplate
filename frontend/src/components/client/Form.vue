<template>
  <div class="container text-left" >

    <div class="text-center">
      <h3>{{ pageTitle }}</h3>
    </div>

    <form>

      <div class="row">
        <div class="col-12">
          <b-form-group id="nameLabel" label="Client name:" label-for="name" >
            <b-form-input id="name" type="text" v-model="form.name"  placeholder="Name please"></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="text-center">
        <b-button type="button" variant="primary" @click="onSubmit" >Submit</b-button>
        <router-link to="/clients">
          <b-button type="reset" variant="danger"  >
            Cancel
          </b-button>
        </router-link>
      </div>
    </form>
  </div>

</template>

<script>


  export default {
    props:['id'],
    data() {
      return {
        form:{
          name: 'teste',
        },
        pageTitle: 'Client registration',
      }
    },
    methods: {
      async onSubmit(){
        if (this.form._id) {
           if ( this.form.name) {
            let response = await this.$http.put('v1/clients', this.form); // request with async await

            if (response.success) {
              this.$toasted.show('Client edited with success',{icon:'check', type: 'success'});
              this.$router.push({name: "Clients"});
            } else {
              this.$toasted.show(response.err ,{icon:'times', type: 'error'});
            }
          } else {
            this.$toasted.show('Inform client name',{icon:'times', type: 'error'})
          }
        } else {

          if ( this.form.name ) {
            let response = await this.$http.post('v1/clients', this.form); // request with async await

            if (response.success) {
              this.$toasted.show('Registrarion completed with success',{icon:'check', type: 'success'});
              this.$router.push({name: "Clients"});
            } else {
              this.$toasted.show(response.err ,{icon:'times', type: 'error'});
            }
          } else {
            this.$toasted.show('Inform client name',{icon:'times', type: 'error'})
          }
        }
      },
    },
    async mounted() {
      if (this.id) {
        this.pageTitle =  'User edit';
        let response = await this.$http.get(`/v1/clients/${this.id}`);
        if (response._id) {
          delete response.password;
          this.form = this.form = response;
        } else {
          this.$toasted.show('An error has ocurred' ,{icon:'times', type: 'error'});
        }
      }
    },
  }
</script>



