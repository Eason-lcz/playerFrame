<template>
  <div class="searchBox">
    <el-input
        v-model="searchBoxText"
        placeholder="select"
        :suffix-icon="Search"
    />
  </div>
</template>

<script setup>
import {ref} from "vue";
import {Search} from '@element-plus/icons-vue'

const searchBoxText = ref("");

defineOptions(
    name = "searchBox"
)
</script>

<style scoped>
.searchBox {
  width: 50vw;
  min-width: 500px;
}
.el-input{
  border-top: 5px solid rgba(225,225,225,0.5);
  border-bottom: 5px solid rgba(225,225,225,0.5);
  border-left: 30px solid rgba(225,225,225,0.5);
  border-right: 30px solid rgba(225,225,225,0.5);
  border-radius: 15px;
}
</style>