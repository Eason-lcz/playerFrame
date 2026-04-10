<template>
  <div class="ContentCard">
    <el-skeleton style="width: 240px" :loading="loading" animated>
      <template #template>
        <el-skeleton-item variant="image" style="width: 240px; height: 240px;border-radius: 10px" />
        <div style="padding: 14px">
          <el-skeleton-item variant="h3"  />
        </div>
      </template>
      <template #default>
        <div class="ContentCardImage">
          <el-card shadow="hover">
            <slot name="cardContent"></slot>
          </el-card>
        </div>
        <div class="ContentCardTitle">
          <el-text type="primary">
            <slot name="carTitle"></slot>
          </el-text>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
import { ref } from "vue"

const loading = ref(false)
defineOptions({
  name: "ContentCard",
})
</script>

<style scoped>
.ContentCard {
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
}
</style>