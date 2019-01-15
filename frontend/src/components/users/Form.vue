<template>
  <div class="container text-left" >

    <div class="text-center">
      <h3>{{ pageTitle }}</h3>
    </div>

    <b-form @submit.prevent="onSubmit">

      <div class="row">
        <div class="col-9">
          <b-form-group id="emailLabel" label="Email address:" label-for="email" description="We'll never share your email with anyone else.">
            <b-form-input  id="email" type="email" v-model="form.email"  placeholder="Enter email"></b-form-input>
          </b-form-group>

          <b-form-group id="loginLabel" label="Login:" label-for="login" >
            <b-form-input id="login" type="text" v-model="form.login"  placeholder="An diferent and creative login"></b-form-input>
          </b-form-group>

          <b-form-group id="nameLabel" label="Your name:" label-for="name" >
            <b-form-input id="name" type="text" v-model="form.name"  placeholder="Name please"></b-form-input>
          </b-form-group>

        </div>

        <div class="col ">
          <b-form-group id="avatarLabel" label="Avatar:" label-for="role" class="" >
            <vue-dropzone
              ref="myVueDropzone"
              id="dropzone"
              :options="dropzoneOptions"
              v-on:vdropzone-sending="getExtraUploadData"
              v-on:vdropzone-success="setAvatarData"
              :useCustomSlot=true
             >
              <div class="dropzone-custom-content">
                <h3 class="dropzone-custom-title">Drop a file here!</h3>
                <div class="subtitle">...or click to select one</div>
              </div>
            </vue-dropzone>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <b-form-group class="col" id="passwordLabel" label="Password:" label-for="password" >
          <b-form-input id="password" type="password" v-model="form.password"  placeholder="A complex password"></b-form-input>
        </b-form-group>

        <b-form-group class="col" id="passwordCLabel" label="Password confirm:" label-for="passwordC" >
          <b-form-input id="passwordC" type="password" v-model="form.passwordC" placeholder="An equally complex password"
          :state="(form.password == form.passwordC) && form.password != ''"  class="error"></b-form-input>
        </b-form-group>
      </div>

      <div class="row">
        <b-form-group id="roleLabel" class="col" label="User role:" label-for="role" >
          <b-form-select v-model="form.role" :options="roles"  class="mb-3" id="role"/>
        </b-form-group>
      </div>


      <div class="text-center">
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger"  >
           <router-link to="/users">Cancel</router-link>
        </b-button>
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
          avatar:{
            filename:'',
            mimetype:'',
            folder:'',
          }
        },
        pageTitle: 'User registration',
        roles:[
          { value: '' , text: '--selecione--'},
          { value: 'admin' , text: 'Admin'},
          { value: 'basic' , text: 'Basic'},
        ],
        dropzoneOptions: this.$http.getDropzoneConfig(
          {
            addRemoveLinks: true,
            capture: true,
            parallelUploads: 1,
            uploadMultiple: false,
            thumbnailWidth: 150,
            acceptedFiles: 'image/*',
            maxFilesize: 2,
            autoProcessQueue: true,
            maxFiles:1,
            dictDefaultMessage: "UPLOAD ME"
          }
        ),
      }
    },
    methods: {
      setAvatarData(file,response){
        console.log(response);
        this.form.avatar = {};
        this.form.avatar.filename = response.file.filename;
        this.form.avatar.mimetype = response.file.mimetype;
        this.form.avatar.folder = response.file.destinationFolder;
      },
      getExtraUploadData (file, xhr, formData) {
        formData.append('folder', 'avatar'); // add field to upload form
      },
      async onSubmit(){
        if (
          this.form.email &&
          this.form.login &&
          (this.form.password && this.form.password == this.form.passwordC) &&
          this.form.role
        ) {
          let response = await this.$http.post('v1/users', this.form); // request with async await

          if (response.success) {
            this.$toasted.show('Registrarion completed with success',{icon:'check', type: 'success'});
            this.form = {};
          } else {
            this.$toasted.show(response.err ,{icon:'times', type: 'error'});
          }
        } else {
          this.$toasted.show('Inform  email, role, login and password. Password and passord confirm must be equals',{icon:'times', type: 'error'})
        }
      },
    },
    mounted(){
      console.log(this.id);
      if (this.id) {
        this.pageTitle =  'User edit';
      }
    },
    components: {
      vueDropzone: vue2Dropzone
    }
  }
</script>

<style>
.dropzone-custom-content {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  background-color: #314b5f;
  text-align: center;
}

.vue-dropzone{
  border-radius: 50%;
  width: 200px;
  height: 200px;
  margin: 0px auto;
  padding: 0px;
}

.dropzone img{
  border-radius: 50%;
  width: 200px;
  max-height: 200px;
}

.dropzone .dz-message, .dropzone .dz-preview{
  width: 200px;
  margin: 0px;
  padding: 0px;
}


.dropzone-custom-title {
  padding-top: 30%;
  color: #00b782;
  font-size: 18px;
}

.subtitle {
  color: #fff;
}
</style>


