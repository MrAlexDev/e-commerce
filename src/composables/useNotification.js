// src/composables/useNotification.js
import { onMounted } from 'vue'

export function useNotification() {
  // при монтировании сразу спросим разрешение
  onMounted(() => {
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  })

  function notify(title, options = {}) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options)
    }
  }

  return { notify }
}
