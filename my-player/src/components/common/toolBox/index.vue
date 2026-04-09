<template>
  <div class="toolBox">
    <div class="tool-box">
      <el-button class="add_btn" circle></el-button>
      <el-button class="qrCode_btn" circle></el-button>
      <PopupMenu placement="bottom-end" class="setting_menu">
        <template #trigger>
          <el-button class="setting_btn" circle></el-button>
        </template>

        <template #menu>
          <ul class="menu-list">
            <li >筛选</li>
            <li >内容封面</li>
            <li >水印</li>
            <li >语音控制</li>
            <li >开机自启</li>
          </ul>
        </template>
      </PopupMenu>
      <PopupMenu placement="bottom-end"  class="account_menu" >
        <template #trigger>
          <el-button class="account_btn" @click="handleClickOutside" circle></el-button>
        </template>

        <template #menu>
          <ul class="menu-list">
            <li >设备编码</li>
            <li >用户</li>
          </ul>
        </template>
      </PopupMenu>
    </div>
    <div class="windows_btn">
      <el-button class="minimize_btn" @click="handleMinimize" circle></el-button>
      <el-button class="close_btn" @click="handleClose" circle></el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import PopupMenu from "../popupMenu/index.vue";

const handleMinimize = () => {
  window.electronAPI.minimizeWindow();
};

const handleClose = () => {
  window.electronAPI.closeWindow();
};
onMounted(() => {
  if (window.electronAPI) {
    window.electronAPI.onWindowStateChange();
  }
});

onUnmounted(() => {
  if (window.electronAPI) {
    window.electronAPI.removeWindowStateListener();
  }
});
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
.qrCode_btn{
  background: url('../../../assets/img/qrCode.png');
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
ul{
  padding: 0;
}
li{
  list-style-type: none;
  line-height: 40px;
}
</style>