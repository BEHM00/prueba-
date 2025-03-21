<template>
    <component :is="layout">
      <router-view />
    </component>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import MainLayout from 'layouts/MainLayout.vue';
  import MovilLayout from 'layouts/MovilLayout.vue';
  
  export default {
    setup() {
      const layout = ref(null);
  
      const updateLayout = () => {
        layout.value = window.innerWidth <= 768 ? MovilLayout : MainLayout;
      };
  
      onMounted(() => {
        updateLayout();
        window.addEventListener('resize', updateLayout);
      });
  
      onUnmounted(() => {
        window.removeEventListener('resize', updateLayout);
      });
  
      return {
        layout,
      };
    },
  };
  </script>