<template>
  <main ref="main">
    <Login></Login>
  </main>
</template>


<script>
import bus from 'vue3-eventbus'
import {mapState} from "vuex"
import {useMessage} from "naive-ui";
import Login from "@/components/Login.vue";

export default {
  name: 'Home',
  components: {
    Login
  },
  setup() {
    window.$message = useMessage()
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState([]),
  },
  methods: {

  },
  mounted() {
  },
  created() {
  }
}
</script>

<style scoped>

</style>
