<template>

  <div
    class="alert alert-dismissible myAlert"
    role="alert"
    v-if="show && !timmedOut ">
    <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        @click="timmedOut = true"
        v-if="closeButton == 'true'">
      <span aria-hidden="true">&times;</span>
      <span class="sr-only">Close</span>
    </button>
    {{message}}
  </div>

</template>

<script>

  export default {
    props:{
      message: String,
      show:Boolean,
      closeButton: String,
      timeout :{
        default:5000
      },
    },
    data() {
      return {
        timmedOut: false
      }
    },
    watch: {
      '$props':{
        handler: function (props, oldProps) {
          let timeout = false;
          if(this.timeout && this.timeout > 0 ) {
            timeout = this.timeout;
          } else if(!this.timeout) {
            timeout = 5000;
          }

          if (timeout) {
            setTimeout(() => {
              console.log('timmedout')
              this.timmedOut = true;
            }, timeout);
          }
        },
      }
    },
  }

</script>

<style scoped>
.myAlert{
  margin-top: 10px
}
</style>
