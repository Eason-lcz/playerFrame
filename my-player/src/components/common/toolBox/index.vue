<template>
  <div class="toolBox">
    <div class="tool-box">
      <el-button class="add_btn" circle></el-button>
      <el-button class="layout_btn" circle></el-button>
      <el-button class="setting_btn" @click="showSettingMenu" circle></el-button>
      <el-button class="account_btn" circle></el-button>
    </div>
    <div class="windows_btn">
      <el-button class="minimize_btn" circle></el-button>
      <el-button class="close_btn" circle></el-button>
    </div>
  </div>
</template>

<script setup>
// import {ref} from 'vue'

const showSettingMenu = () => {
  console.log('设置按钮被点击了')
  showSettingMenu.value = true
  // 显示设置菜单
  document.querySelector('.setting_menu').style.display = 'block'
}

defineProps({
  name: "toolBox",
})
</script>

<style scoped>
.toolBox{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.tool-box{
  width:200px;
  height:20px;
  padding: 10px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  border-radius:10px;
  background-color: #e0e0e0;
  color: #555;
  box-shadow:
      6px 6px 16px rgba(0, 0, 0, 0.2), /* 外阴影 */
      -6px -6px 16px rgba(255, 255, 255, 0.8); /* 内阴影 */
  transition: all 0.3s ease-in-out;
}
.windows_btn{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.add_btn{
  background: url('../../../assets/img/add.png');
  background-size: cover;
}
.layout_btn{
  background: url('../../../assets/img/layout.png');
  background-size: cover;
}
.setting_btn{
  background: url('../../../assets/img/setting.png');
  background-size: cover;
}
.account_btn{
  background: url('../../../assets/img/account.png');
  background-size: cover;
}
.minimize_btn{
  background: url('../../../assets/img/minimize.png');
  background-size: cover;
}
.close_btn{
  background: url('../../../assets/img/close.png');
  background-size: cover;
}
</style>