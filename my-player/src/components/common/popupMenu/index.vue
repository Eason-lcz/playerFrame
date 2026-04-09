<template>
  <div class="popup-menu-container">
    <!-- 触发元素插槽 -->
    <div ref="triggerRef" @click.stop="handleTriggerClick">
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
import {ref, onMounted, onUnmounted, computed ,reactive} from 'vue';
import eventBus from '../../../utils/eventBus';

defineOptions({
  name: "PopupMenu",
})
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
  },
  menuId: {
    type: String,
    default: () => `menu_${Date.now()}_${Math.random()}`
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

const closeMenu = () => {
  if (visible.value) {
    visible.value = false;
    emit('visible-change', false);
  }
};

const openMenu = () => {
  // 先通知其他菜单关闭
  eventBus.emit('closeAllMenus', props.menuId);
  visible.value = true;
  emit('visible-change', true);
};

const toggleMenu = () => {
  if (visible.value) {
    closeMenu();
  } else {
    openMenu();
  }
};
const handleTriggerClick = (event) => {
  event.stopPropagation();
  toggleMenu();
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
// 监听全局关闭事件
const handleGlobalClose = (exceptMenuId) => {
  if (exceptMenuId !== props.menuId && visible.value) {
    closeMenu();
  }
};
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleEscapeKey);
  eventBus.on('closeAllMenus', handleGlobalClose);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleEscapeKey);
  eventBus.off('closeAllMenus', handleGlobalClose);
});

defineExpose({
  close: closeMenu,
  open: openMenu,
  toggle: toggleMenu,
  visible
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
  min-width: 100px;
}

</style>