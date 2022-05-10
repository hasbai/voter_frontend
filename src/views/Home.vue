<template>
  <div>
    <Login></Login>
    <main>
      <vote-page ref="votePage"></vote-page>
      <List></List>
    </main>
  </div>

</template>


<script>
import {mapState} from "vuex"
import {useMessage} from "naive-ui";
import Login from "@/components/Login.vue";
import VotePage from "@/views/VotePage.vue";
import List from "@/views/List.vue";
import bus from 'vue3-eventbus'

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
    ...mapState(['users', 'user']),
  },
  methods: {
    async getUsers() {
      const r = await this.axios.get('/users')
      this.$store.commit('setUsers', r.data)
    },
    connectWs() {
      let ws = new WebSocket(
        window.location.origin.replace('http', 'ws') + '/api/ws'
      )
      ws.onopen = () => {
        console.log('websocket connected')
      }
      ws.onerror = () => {
        console.log('websocket connect failed')
      }
      ws.onclose = () => {
        console.log('websocket disconnected')
      }
      ws.onmessage = e => {
        const data = JSON.parse(e.data)
        if (data.type === 'motion') {
          const motion = data.data
          this.$store.commit('updateMotion', motion)
          this.$store.commit('setCurrentMotion', motion)
          bus.emit('motionUpdated')
        }
      }
    },
  },
  mounted() {
  },
  created() {
    this.getUsers()
    this.connectWs()
  }
}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  height: 100%;
  margin: 2rem auto;
  max-width: 1080px;
}

</style>
