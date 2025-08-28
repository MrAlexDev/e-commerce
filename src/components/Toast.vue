<template>
  <div class="toast-wrapper">
    <transition-group name="toast" tag="div">
      <div
        v-for="(t, index) in toasts"
        :key="t.id"
        :class="['toast', t.type]"
        :style="{ top: `${10 + index * 60}px` }"
      >
        {{ t.message }}
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    toasts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.toast-wrapper {
  position: fixed;
  right: 20px;
  z-index: 1000;
  pointer-events: none;
}
.toast {
  position: absolute;

  right: 0;
  width: 250px;
  padding: 12px 20px;
  margin-bottom: 10px;
  border-radius: 6px;
  color: #fff;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 14px;
}
.toast.success { background-color: #4caf50; }
.toast.info    { background-color: #2196f3; }
.toast.error   { background-color: #f44336; }

/* Enter/Leave Animations */
.toast-enter-active, .toast-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.toast-enter-from, .toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.toast-enter-to, .toast-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
