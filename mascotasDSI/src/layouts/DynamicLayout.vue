<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import MovilLayout from 'layouts/MovilLayout.vue';

import InicioMovilLayout from 'layouts/InicioMovilLayout.vue';

export default {
  setup() {
    const route = useRoute();
    const screenWidth = ref(window.innerWidth);

    // Función para actualizar el ancho de pantalla
    const updateScreenWidth = () => {
      screenWidth.value = window.innerWidth;
    };

    onMounted(() => {
      updateScreenWidth();
      window.addEventListener('resize', updateScreenWidth);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateScreenWidth);
    });

    // Computed para seleccionar el layout adecuado
    const layout = computed(() => {
      if (screenWidth.value <= 768) {
        // Si es móvil (768px o menos)
        return route.path.startsWith('/inicio-sesion') ? InicioMovilLayout : MovilLayout;
      } else {
        // Si es escritorio (769px o más)
        return route.path.startsWith('/inicio-sesion') ? MainLayout : MainLayout;
      }
    });

    return { layout };
  },
};
</script>
