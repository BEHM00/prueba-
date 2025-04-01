<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import MovilLayout from 'layouts/MovilLayout.vue';
import InicioMovilLayout from 'layouts/InicioMovilLayout.vue';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const screenWidth = ref(window.innerWidth);

    // Función para actualizar el ancho de pantalla
    const updateScreenWidth = () => {
      screenWidth.value = window.innerWidth;

      // Si la pantalla es menor o igual a 768 y la ruta es / mandar a /listado
      if (screenWidth.value <= 768 && route.path === '/') {
        router.replace('/listado');
      }
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
        return route.path.startsWith('/inicio-sesion') ? InicioMovilLayout : MovilLayout;
      } else {
        return route.path.startsWith('/inicio-sesion') ? MainLayout : MainLayout;
      }
    });

    return { layout };
  },
};
</script>
