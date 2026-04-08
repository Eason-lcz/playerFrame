<script setup>
import playerHeader from "../common/header/index.vue";
defineOptions({
  name: "Container",
})
</script>

<template>
  <div class="playerLayout">
    <el-header class="header">
      <playerHeader></playerHeader>
    </el-header>
    <el-main></el-main>
  </div>
</template>

<style scoped>
.playerLayout{
  width: 100%;
  height: 100%;
}
.header{
  width: 100%;
  height: 10vh;
  max-height: 400px;
}
</style>