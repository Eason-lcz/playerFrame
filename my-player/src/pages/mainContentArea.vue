<template>
  <div class="ContentArea"></div>
  <ContentGroup>
    <ContentCard v-for="item in 5" :key="item">
      <template #cardContent>
        <el-image src="@/assets/img/officialQrcode.png" alt=""></el-image>
      </template>
      <template #carTitle>
        内容名{{item}}
      </template>
    </ContentCard>
  </ContentGroup>
</template>

<script setup>
import ContentGroup from "@/components/common/contentGroup/index.vue"
import ContentCard from "@/components/common/contentCard/index.vue"

defineOptions({
  name: "MainContentArea",
})
</script>

<style scoped>
.ContentArea{
  width: 100%;
  margin: 0 ;
  padding: 0;

}
</style>