<template>
    <div class="row">
        <div class="col">
          <b-pagination align="center" :total-rows="total" v-model="myCurrentPage" @change="onPageChange" :per-page="perPage" />
        </div>
    </div>
</template>


<script>
export default {
    props: {
        total:{ type:Number,  default:0 },
        currentPage:{ type:Number,  default:1 },
        perPage:{ type:Number,  default:5 },
    },
    methods: {
        onPageChange(page) {
            let skip = (page - 1) * this.perPage;
            let limit = this.perPage;
            this.$emit('pageChanged', { skip, limit } );
        }
    },
    beforeMount() {
        this.myCurrentPage = this.currentPage;
    },
}
</script>