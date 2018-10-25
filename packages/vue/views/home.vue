<template>
  <div :class="$style.home">
    {{text}}
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("home");

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["text"])
  },
  mounted() {
    this.getHomeList();
  },
  methods: {
    ...mapMutations(["updateText"]),
    ...mapActions(["getHomeList"])
  }
};
</script>

<style lang="less" module scoped>
.home {
  color: aqua;
  .test {
    color: #000;
  }
}
</style>
