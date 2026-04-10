<template>
  <div class="ContentGroup">
    <el-collapse :expand-icon-position="'left'" class="collapse">
      <el-collapse-item title="全部" name="all" class="collapse-item">
        <slot></slot>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
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
.collapse{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.collapse-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

</style>