<template>
    <div class="full-background-banner" :style="bannerStyle">
        <div class="overlay">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

// Propiedades del componente
const props = defineProps({
    // Imagen de fondo
    image: {
        type: String,
        required: true,
    },
    // Altura del banner
    height: {
        type: String,
        default: '300px',
    },
    // Color del overlay
    overlayColor: {
        type: String,
        default: 'rgba(0, 0, 0, 0.5)',
    },
});

// Desestructuración de las propiedades
const { image, height } = props;

// Estilos del banner
const bannerStyle = computed(() => ({
    position: 'relative',
    height: height,
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));
</script>

<style scoped>
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--overlay-color, rgba(0, 0, 0, 0.5));
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
