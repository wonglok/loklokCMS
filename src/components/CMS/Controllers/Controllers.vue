<template>
  <div class="controllers">
    <div>
    </div>
  </div>
</template>

<script>
import { appState } from '@/backend/firebase'
export default {
  data () {
    return {
      appState
    }
  },
  created () {
    this.$emit('api', this)
  },
  methods: {
    glClick (args) {
      console.log(args)
    }
  }
}
</script>

<style>

</style>
