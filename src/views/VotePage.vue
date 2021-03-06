<template>
  <div class="vote-page page">
    <div v-if="currentMotion.id > 0" class="motion">
      <h2>{{ currentMotion.name }}</h2>
      <div class="author">{{ getUser(currentMotion.userID).name }}</div>
      <div class="description">{{ currentMotion.description }}</div>
      <div class="boxes larger">
        <div
          v-for="(type, i) in ['for', 'against']"
          :key="i"
          :style="{
          '--color':backgroundColors[i],
          '--image': resolved(i) ? backgroundImages[i] : '',
        }" class="box color"
          @click="vote(type)"
        >
          <strong class="number">{{ currentMotion[type].length }}</strong>
          <div v-for="(id, j) in currentMotion[type]" :key="j">
            <User v-bind="getUser(id)"></User>
          </div>
        </div>
      </div>
      <div class="abstain larger">
        <div v-for="(id, j) in currentMotion.abstain" :key="j" class="name">
          <User v-bind="getUser(id)"></User>
        </div>
      </div>
    </div>
    <div v-if="adminMode" class="admin">
      <n-button circle class="resolve" size="large" type="primary" @click="resolveMotion">✓</n-button>
      <div class="buttons">
        <n-button @click="create('session')">create session</n-button>
        <n-button @click="create('motion')">create motion</n-button>
        <create-session ref="session"></create-session>
        <create-motion ref="motion"></create-motion>
      </div>
    </div>
  </div>


</template>

<script>
import {mapState} from "vuex"
import {getUser} from "@/utils";
import bus from 'vue3-eventbus'

export default {
  name: "VotePage",
  data() {
    return {
      backgroundColors: ['#388E3C', '#D32F2F'],
      backgroundImages: ['url(/img/passed.png)', 'url(/img/failed.png)']
    }
  },
  computed: {
    ...mapState(['currentMotion', 'user', 'adminMode']),
    voted() {
      return {
        for: this.currentMotion.for.indexOf(this.user.id) >= 0,
        against: this.currentMotion.against.indexOf(this.user.id) >= 0,
        abstain: this.currentMotion.abstain.indexOf(this.user.id) >= 0
      }
    }
  },
  methods: {
    getUser(id) {
      return getUser(id)
    },
    resolved(i) {  // 当前区域为确认状态
      if (i === 0) {
        return this.currentMotion.status === 1
      } else {
        return this.currentMotion.status === -1
      }
    },
    async vote(type, id = this.currentMotion.id) {
      switch (type) {
        case 'for':
          if (this.voted.for || this.voted.against) {
            return
          }
          break
        case 'against':
          if (this.voted.for || this.voted.against) {
            return
          }
          break
        case 'abstain':
          if (this.voted.for || this.voted.against || this.voted.abstain) {
            return
          }
          break
      }
      await this.axios.post(`/motions/${id}/${type}`)
    },
    async resolveMotion() {
      await this.axios.put(`/motions/${this.currentMotion.id}`)
    },
    motionUpdated() {
      this.vote('abstain')
    },
    create(name) {
      this.$refs[name].show = true
    },
  },
  created() {
    bus.on('motionUpdated', this.motionUpdated)
  }
}
</script>

<style scoped>
.vote-page {
  flex: 1;
  margin: 0 1rem;
}

.motion {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

h2 {
  margin-bottom: 0;
}

.author {
  font-style: italic;
}

.description {
  margin: 0.5rem 0;
  width: 90%;
  max-width: 500px;
  text-indent: 2em;
}

.boxes {
  display: flex;
  width: 100%;
  min-height: 16rem;
  margin-top: 1rem;
}

.box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.color {
  cursor: pointer;
  position: relative;
  --color: transparent;
  --opacity: 0.25;
  --image: "";
}

.color:hover {
  border: 2px solid var(--color);
  --opacity: 0.5;
}

.color::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: var(--color);
  opacity: var(--opacity);
}

.color::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;

  background-image: var(--image);
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: var(--opacity);
}

.number {
  padding: 0.5em 0;
}

.abstain {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 2em;
  width: 100%;
  background-color: #61616160;
}

.abstain .name {
  margin: 0 0.5em;
}

.admin {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1rem 0;
  position: relative;
}

.admin .buttons {
  position: absolute;
  right: 0
}

.buttons button {
  margin: 0 0.5rem;
}
</style>
