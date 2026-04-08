<template>
  <div class="playerHeader">
    <el-row class="row" :gutter="20">
      <el-col :span="4">
        <div class="logo">
<!--          <img src="../../../assets/img/logo.png" alt="" />-->
          <el-image :src="logoUrl" alt="" fit="cover"/>
        </div>
      </el-col>
      <el-col :span="14">
        <searchBox/>
      </el-col>
      <el-col :span="6">
        <toolBox/>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

import searchBox from "../searchBox/index.vue";
import toolBox from "../toolBox/index.vue";
import logoUrl from  "../../../assets/img/logo.png"

defineOptions({
  name: "playerHeader",
})
</script>

<style scoped>
.playerHeader {
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  height: 100%;
}
.el-row{
  height: 100%;
  align-items: center;
}
.logo{
  width: 200px;

}
.logo img{
  width: auto;
}
</style>