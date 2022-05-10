<template>
  <n-card
    :bordered="false"
    :style="{'--image': image}"
    class="motion"
    content-style="padding: 0 0.5rem;"
    hoverable
  >
    <div class="title">
      <span class="name">{{ name }}</span>
      <span class="ml-1">{{ createdAt.substring(11, 16) }}</span>
    </div>
    <div>{{ description }}</div>
    <div class="author">
      by {{ username }}
    </div>

  </n-card>
</template>

<script>
import {getUser} from "@/utils"

export default {
  name: "Motion",
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
    },
    image() {
      if (this.status === 1) {
        return 'url(/img/passed.png)'
      }
      if (this.status === -1) {
        return 'url(/img/failed.png)'
      }
      return ''
    }
  },
  methods: {}
}
</script>

<style scoped>
.motion {
  margin-bottom: 1rem;
  cursor: pointer;
  position: relative;
  --image: "";
  --opacity: 0.25;
}

.motion::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;

  background-image: var(--image);
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: var(--opacity);
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

.author {
  font-style: italic;
  text-align: right;
}
</style>
