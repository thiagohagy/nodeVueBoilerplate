<template>
  <div class="row">
    <div class="col-sm">
      One of three columns
      <font-awesome-icon icon="coffee" />
    </div>
    <div class="col-sm">
      One of three columns
      <font-awesome-icon icon="coffee" />
    </div>
    <div class="col-sm">
      One of three columns
      <font-awesome-icon icon="coffee" />
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    // HelloWorld,
  },
  mounted() {
    this.$toasted.show('Error toast', { icon: 'times', type: 'error' });
    this.$toasted.show('Success toast', { icon: 'check', type: 'success' });
    this.$toasted.show('Info toast', { icon: 'info', type: 'info' });
  },
};
</script>
