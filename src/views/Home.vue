<template>
  <div>
    <Login></Login>
    <main>
      <vote-page id="vote-page"></vote-page>
      <list></list>
    </main>
  </div>

</template>


<script>
import {mapState} from "vuex"
import {useMessage} from "naive-ui";
import Login from "@/components/Login.vue";
import VotePage from "@/views/VotePage.vue";
import List from "@/views/List.vue";

export default {
  name: 'Home',
  components: {
    List,
    VotePage,
    Login
  },
  setup() {
    window.$message = useMessage()
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['users']),
  },
  methods: {
    async getUsers() {
      const r = await this.axios.get('/users')
      console.log(r.data)
      this.$store.commit('setUsers', r.data)
    }
  },
  mounted() {
  },
  created() {
    this.getUsers()
  }
}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  width: 92%;
  height: 100%;
  margin: 2rem auto;
}

#vote-page {
  flex: 1
}


</style>
