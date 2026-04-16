<template>
  <el-card class="custom-card" shadow="hover">
    <div class="card-content">
      <slot name="content">{{ content }}</slot>
    </div>
    <div class="card-footer">
      <slot name="card-title">{{ title }}</slot>
    </div>
  </el-card>
</template>

<script setup>
import {ref} from "vue"

const loading = ref(false)
defineOptions({
  name: "ContentCard",
})

defineProps({
  title: {
    type: String,
    default: '默认标题'
  },
  content: {
    type: String,
    default: '暂无内容'
  }
})
</script>

<style scoped>
.card-content {
  width: calc(100vw / 6);
  height: 200px;
  display: flex;
  flex-direction: column;

}

.card-content {
  width: 100%;
  height: 200px;
}
</style>