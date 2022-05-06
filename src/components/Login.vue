<template>
  <n-modal
    v-model:show="showLogin"
    class="login"
    preset="card"
    title="登录"
    size="huge"
    :bordered="false"
  >
    <n-input v-model:value="value" type="text" placeholder="用户名（建议实名）" />
    <div class="buttons">
      <n-button
        type="primary"
        style="margin-right: 1rem"
        @click="login"
      >
        登录
      </n-button>
      <n-button type="error" @click="close">退出</n-button>
    </div>
  </n-modal>
</template>

<script>
import {mapState} from 'vuex'
import {NModal, NInput, NButton} from 'naive-ui'

export default {
  name: "Login",
  components: {NModal, NInput, NButton},
  data() {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState(['username']),
    showLogin(){
      return !this.username
    }
  },
  methods: {
    async login(){
      await this.axios.put('/users/' + this.value)
      this.$store.commit('setUsername', this.value)
    },
    close(){
      window.close()
    }
  },
  created() {

  }
}
</script>

<style scoped>
.buttons{
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

</style>
