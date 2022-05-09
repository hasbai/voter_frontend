<template>
  <n-card
    :bordered="false"
    class="motion"
    content-style="padding: 0 0.5rem;"
    hoverable
  >
    <div class="title">
      <span class="name">{{ name }}</span>
      <span class="ml-1">{{ createdAt.substring(11, 16) }}</span>
    </div>
    <div>{{ description }}</div>
    <div class="footer">
      by {{ username }}
    </div>

  </n-card>
</template>

<script>
import {NCard} from 'naive-ui'
import {getUser} from "@/utils"

export default {
  name: "Motion",
  components: {
    NCard
  },
  props: {
    id: Number,
    name: String,
    description: String,
    status: Number,
    createdAt: String,
    updatedAt: String,
    userID: Number,
  },
  computed: {
    username() {
      return getUser(this.userID).name
    }
  },
  methods: {}
}
</script>

<style scoped>
.motion {
  margin-bottom: 1rem;
  cursor: pointer;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.title .name {
  font-size: larger;
}

.footer {
  font-style: italic;
  text-align: right;

}
</style>
