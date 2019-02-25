<template>
  <div class="container text-left" >

    <my-crud-header
      addRoute='ClientsForm'
      @onDelete='deleteSelected'
      @onSearch='search = $event.search; listAll()'
    >
    </my-crud-header>

    <div class="page-data">
      <div class="row">
        <div class="col">

          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col"><b-form-checkbox
                    v-model="selectAllStatus"
                    @change='selectAll()'
                  >
                  </b-form-checkbox>
                  </th>
                <th scope="col">Name</th>
                <th scope="col">Option</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for='item in list' :key="item._id">
                <td>
                  <b-form-checkbox
                    v-model="item.selected"
                  >
                  </b-form-checkbox>
                </td>
                <td>{{item.name}}</td>
                <td>
                  <b-button variant="outline-secondary btn-sm">
                    <router-link :to="{name: 'ClientsForm', params: {id: item._id }}">
                      Edit
                    </router-link>
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <my-pagination
        :total='totalItens'
        @pageChanged='listAll($event.skip,$event.limit)'
      ></my-pagination>
    </div>
  </div>
</template>


<script>
  import CrudHeader from './../shared/CrudHeader.vue';

  export default {
    data () {
      return {
        list: [],
        totalItens: 0,
        selectAllStatus: false,
        search: '',
      }
    },
    methods: {
      async listAll(skip = 0,limit = 5){ // default values
        let resposta = await this.$http.post('/v1/clients/list', { skip, limit, busca: this.search});
        this.totalItens = resposta.total;
        this.list = resposta.data;
      },
      selectAll() {
        for (let i = 0; i < this.list.length; i++) {
          const el = this.list[i];
          el.selected = !this.selectAllStatus;
        }
      },
      async deleteSelected(){
        for (let i = 0; i < this.list.length; i++) {
          const el = this.list[i];
          if (el.selected) {
            await this.$http.delete(`/v1/clients/${el._id}`);
          }
        }
        this.listAll();
      }
    },
    beforeMount() {
      this.listAll();
    },
    components:{
      'my-crud-header': CrudHeader,
    }
  }
</script>