<template>
  <div class="container text-left" >

    <div class="text-center">
      <h3>{{ pageTitle}}</h3>
    </div>

    <b-form @submit.prevent="onSubmit" @reset="onReset">

      <b-form-group id="emailLabel" label="Email address:" label-for="email" description="We'll never share your email with anyone else.">
        <b-form-input  id="email" type="email" v-model="form.email"  placeholder="Enter email"></b-form-input>
      </b-form-group>

      <b-form-group id="loginLabel" label="Login:" label-for="login" >
        <b-form-input id="login" type="text" v-model="form.login"  placeholder="An diferent and creative login"></b-form-input>
      </b-form-group>

      <b-form-group id="nameLabel" label="Your name:" label-for="name" >
        <b-form-input id="name" type="text" v-model="form.name"  placeholder="Name please"></b-form-input>
      </b-form-group>

      <b-form-group id="passwordLabel" label="Password:" label-for="password" >
        <b-form-input id="password" type="password" v-model="form.password"  placeholder="A complex password"></b-form-input>
      </b-form-group>

      <b-form-group id="passwordCLabel" label="Password confirm:" label-for="passwordC" >
        <b-form-input id="passwordC" type="password" v-model="form.passwordC" placeholder="An equally complex password" :state="(form.password == form.passwordC) && form.password"  class="error"></b-form-input>
      </b-form-group>

      <b-form-group id="roleLabel" label="User role:" label-for="role" >
        <b-form-select v-model="form.role" :options="roles"  class="mb-3" id="role"/>
      </b-form-group>

      <b-form-group id="avatarLabel" label="Avatar:" label-for="role" >
        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-sending="getExtraUploadData" ></vue-dropzone>
      </b-form-group>

      <div class="text-center">
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
  </div>

</template>

<script>

  import vue2Dropzone from 'vue2-dropzone'

  export default {
    props:['id'],
    data() {
      return {
        form:{
          email: 'teste@test.com',
          login: 'teste',
          name: 'teste',
          password: 'teste',
          role: '',
        },
        pageTitle: 'User registration',
        roles:[
          { value: '' , text: '--selecione--'},
          { value: 'admin' , text: 'Admin'},
          { value: 'basic' , text: 'Basic'},
        ],
        dropzoneOptions: this.getOpts(),
      }
    },
    methods: {
      //  this.$http.post('/login', this.form).then(response => {
      //   if (response.data.success) {
      //     this.$store.commit('user_login',response);
      //   } else {
      //     this.showError = true;
      //   }
      // });
      getExtraUploadData (file, xhr, formData) {
        formData.append('folder', 'avatar'); // adicionar o campo no upload
      },
      getOpts(){

        let opts = this.$http.getDropzoneConfig(
          {
            addRemoveLinks: true,
            capture: true,
            parallelUploads: 1,
            uploadMultiple: false,
            thumbnailWidth: 150,
            acceptedFiles: 'image/*',
            maxFilesize: 2,
            autoProcessQueue: false,
            maxFiles:1,
            dictDefaultMessage: "UPLOAD ME"
          }
        )
        return opts;

      },
      onSubmit(){
        this.$refs.myVueDropzone.processQueue();
        // if (
        //   this.form.email &&
        //   this.form.login &&
        //   this.form.name &&
        //   this.form.password == this.form.passwordC &&
        //   this.form.role
        // ) {

        //   this.$http.post('v1/users', this.form).then( (response)=> {
        //     console.log(response);
        //   });

        // } else {
        //   this.$toasted.show('Inform all fields, password and passord confirm must be equals',{icon:'times', type: 'error'})
        // }
      },
      onReset() {
        this.form = {};
      }
    },
    mounted(){
      if (this.id) {
        this.pageTitle =  'User edit';
      }
    },
    components: {
      vueDropzone: vue2Dropzone
    }
  }
</script>