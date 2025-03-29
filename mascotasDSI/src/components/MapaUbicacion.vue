<template>
    <div class="q-ma-md">
        <p class="q-mx-md text-weight-medium q-mb-xs titulo-ubicacion">Ubicación</p>
        <div class="map-container" style="height: 200px; border-radius: 8px;">
            <div v-if="coordenadas" ref="mapContainer" style="height: 100%;"></div>
            <p v-else class="text-grey">No hay datos de ubicación disponibles</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import L from 'leaflet'

const props = defineProps({
    coordenadas: {
        type: Object,
        default: null
    }
})

const mapContainer = ref(null)
let mapa = null

onMounted(() => {
    if (props.coordenadas && mapContainer.value) {
        mapa = L.map(mapContainer.value).setView(
            [props.coordenadas.lat, props.coordenadas.lng],
            15
        )

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapa)

        L.marker([props.coordenadas.lat, props.coordenadas.lng])
            .addTo(mapa)
            .bindPopup("Ubicación de la mascota")
    }
})

onBeforeUnmount(() => {
    if (mapa) {
        mapa.remove()
    }
})
</script>

<style scoped>
@media (min-width: 769px) {
    .titulo-ubicacion {
        background-color: #fef4ea;
        padding: 5px;
        text-align: left;
        width: 100%;
        margin-left: 0;
        margin-bottom: 10px;
        font-size: 20px;
    }
}
</style>