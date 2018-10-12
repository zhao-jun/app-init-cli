<template>
  <div :class="$style.home">{{text}}</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('home')

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['text'])
  },
  mounted () {
  },
  methods: {
    // ...mapMutations([
    //   'updateText'
    // ])
  }
}
</script>

<style lang="less" module scoped>
.home {
  color: aqua;
}
</style>
