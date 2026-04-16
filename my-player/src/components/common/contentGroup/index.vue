<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item :title="title" :name="name">
      <div class="collapse-anti-jitter-wrapper">
        <div class="collapse-item">
          <slot></slot>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import {ref} from "vue"

const props = defineProps({
  title: {
    type: String,
    default: '展开查看卡片列表'
  },
  name: {
    type: [String, Number],
    default: 1
  }
})

// 默认展开当前面板
const activeNames = ref([props.name])
defineOptions({
  name: "ContentGroup",
})
</script>

<style scoped>
.ContentGroup {
  width: calc(100% - 20px);
  border: 1px solid #ccc;
  margin: 10px;
}

.collapse {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.collapse-item {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  padding: 10px;
}
.collapse-anti-jitter-wrapper {
  /* 1. 形成独立的 BFC (块级格式化上下文)，彻底杜绝高度计算误差 */
  overflow: hidden;
  /* 2. 避免上下 margin 穿透导致计算错误 */
  padding-top: 1px;
  padding-bottom: 1px;
}

/* 3. 强制覆盖 Element Plus 内部 wrap 的行为，让浏览器提前优化 */
:deep(.el-collapse-item__wrap) {
  will-change: height;
  /* 避免展开瞬间出现内部的局部滚动条闪烁 */
  overflow: hidden !important;
}

</style>