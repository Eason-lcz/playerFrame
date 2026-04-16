<template>
  <div class="ContentArea">
    <ContentGroup title="全部" :name="1" position="left">
      <div class="add-Content">
        <button class="add-btn" @click="addContent"></button>
      </div>
      <ContentCard
          v-for="item in contentData.length"
          :key="item.id"
          @contextmenu.prevent="handleRightClick(item)"
      >
        <template #content>
          <el-image></el-image>
        </template>
        <template #card-title>
          内容{{ item }}
        </template>
      </ContentCard>

    </ContentGroup>
  </div>
</template>

<script setup>
import ContentGroup from "@/components/common/contentGroup/index.vue"
import ContentCard from "@/components/common/contentCard/index.vue"
import {ElMessageBox} from "element-plus"
import {ref} from "vue"

let DataLength = 1
const contentData = ref([])
for (let i = 0; i < DataLength; i++) {
  contentData.value.push({
    id: i,
    title: `内容${i}`,
    content: `这是内容${i}`
  })
}
const addContent = () => {
  const newId = contentData.value.length + 1
  contentData.value.push({
    id: newId,
    title: `内容${newId}`,
    content: `这是内容${newId}`,
    image: ''
  })
  console.log("添加内容", DataLength)
}
// 右键删除处理
const handleRightClick = (item) => {
  ElMessageBox.confirm(`确定删除 “内容${item} 吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
      .then(() => {
        // 通过 id 找到索引并删除
        const index = contentData.value.findIndex(data => data.id === item)
        if (index !== -1) {
          contentData.value.splice(index, 1)
        }
      })
      .catch(() => {
        // 用户取消删除，不做操作
      })
}

defineOptions({
  name: "MainContentArea",
})
</script>

<style scoped>
.ContentArea {
  width: 100%;
  margin: 0;
  padding: 0;
}

.info-row {
  margin-bottom: 8px;
  font-size: 14px;
  color: #606266;
}

.info-row .label {
  margin-right: 8px;
  font-weight: bold;
}

.add-Content{
  border: 1px solid #e4e7ed;
  position: relative;
  width: calc(100vw / 6);
  height: 100%;
}
.add-btn {
  width: 50%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("@/assets/img/add.png");
  background-size: cover;
}
</style>