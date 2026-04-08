<template>
  <div class="popup-menu-container">
    <!-- 触发元素插槽 -->
    <div ref="triggerRef" @click.stop="toggleMenu">
      <slot name="trigger"></slot>
    </div>

    <!-- 菜单内容插槽 -->
    <transition name="menu-fade">
      <div
          v-if="visible"
          ref="menuRef"
          class="popup-menu-panel"
          :style="menuStyle"
      >
        <slot name="menu"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  // 菜单位置：bottom-start, bottom-end, top-start, top-end
  placement: {
    type: String,
    default: 'bottom-end'
  },
  // 点击菜单项后是否自动关闭
  autoClose: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['visible-change']);

const visible = ref(false);
const triggerRef = ref(null);
const menuRef = ref(null);

const menuStyle = computed(() => {
  const styles = {
    position: 'absolute',
    zIndex: 1000
  };

  switch (props.placement) {
    case 'bottom-end':
      styles.top = '100%';
      styles.right = '0';
      styles.marginTop = '8px';
      break;
    case 'bottom-start':
      styles.top = '100%';
      styles.left = '0';
      styles.marginTop = '8px';
      break;
    case 'top-end':
      styles.bottom = '100%';
      styles.right = '0';
      styles.marginBottom = '8px';
      break;
    case 'top-start':
      styles.bottom = '100%';
      styles.left = '0';
      styles.marginBottom = '8px';
      break;
  }

  return styles;
});

const toggleMenu = () => {
  visible.value = !visible.value;
  emit('visible-change', visible.value);
};

const closeMenu = () => {
  if (visible.value) {
    visible.value = false;
    emit('visible-change', false);
  }
};

const handleClickOutside = (event) => {
  if (!visible.value) return;

  const isClickOnTrigger = triggerRef.value?.contains(event.target);
  const isClickOnMenu = menuRef.value?.contains(event.target);

  if (!isClickOnTrigger && !isClickOnMenu) {
    closeMenu();
  }
};

const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && visible.value) {
    closeMenu();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleEscapeKey);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleEscapeKey);
});

// 如果 autoClose 为 true，监听菜单项点击
const handleMenuItemClick = (event) => {
  if (props.autoClose) {
    closeMenu();
  }
};

// 提供关闭方法给父组件
defineExpose({
  close: closeMenu,
  open: () => { visible.value = true; },
  toggle: toggleMenu
});
</script>

<style scoped>
.popup-menu-container {
  position: relative;
  display: inline-block;
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.menu-fade-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.popup-menu-panel {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 160px;
}
</style>