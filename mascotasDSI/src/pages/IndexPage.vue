<template>
  <q-page class="col q-pa-md">
    <!-- Sección 1: Banner con imagen de fondo -->
    <FullBackgroundBanner :image="imagen" height="300px">
      <div class="col text-white text-center">
        <h1>Adopta y salva una vida</h1>
        <q-btn label="Inicio" color="primary" />
      </div>
    </FullBackgroundBanner>

    <!-- Sección 2: Quienes somos-->
    <div class="q-mb-lg row items-center q-gutter-md justify-center">
      <q-banner class="text-center" rounded>
        <template v-slot:avatar>
          <img :src=imagenQuienesSomos alt="Imagen de salvar una vida" class="full-width" />
        </template>

        <div class="col-12 col-md-6 text-left">
          <h5>¡Salva una vida!</h5>
          <p style="max-width: 300px; ">
            En AdoptameS Lorem ipsum dolor sit amet consectetur adipisicing
            elit.
            Dolores
            quibusdam
            consequuntur
            tenetur
            reiciendis ab dolor odit eligendi ut. Repellendus ex laboriosam molestiae necessitatibus reprehenderit
            fugiat
            nesciunt, alias similique. Fugiat, assumenda!
          </p>
        </div>

        <template v-slot:action>
          <q-btn label="Ver más" color="primary" text-color="white" />
        </template>
      </q-banner>
    </div>

    <!-- Sección 3: Mascotas disponibles -->
    <div class="q-pa-md">
      <q-carousel v-model="activeSlide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
        control-color="amber" navigation padding arrows height="500px" class="bg-white-9 shadow-2 rounded-borders"
        infinite>
        <q-carousel-slide v-for="pet in pets" :key="pet.id" :name="pet.id" class="no-padding">
          <div class="row no-wrap justify-evenly items-stretch q-pa-sm full-height">
            <!-- Repeat for 5 pets per slide -->
            <div v-for="n in 5" :key="n" class="col" style="width: 20%; min-width: 200px; padding: 8px;">
              <div class="column full-height">
                <q-img class="rounded-borders" :src="getPetByOffset(n - 1).image"
                  style="height: 350px; object-fit: cover;" :alt="'Imagen de ' + getPetByOffset(n - 1).name" />
                <div class="text-center q-mt-md q-px-sm" style="min-height: 100px;"> <!-- Added min-height -->
                  <h5 class="q-my-none">{{ getPetByOffset(n - 1).name }}</h5> <!-- Changed from h6 to h5 -->
                  <p class="text-body1 q-my-none">{{ getPetByOffset(n - 1).description }}</p> <!-- Larger text -->
                </div>
              </div>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <!-- Sección 4: Ayuda a rescatistas -->
    <div class="q-mb-xl q-pa-lg"> <!-- Added padding and margin -->
      <div class="row q-col-gutter-lg justify-center">
        <!-- Image Card -->
        <div class="col-12 col-md-6">
          <q-card class="overflow-hidden">
            <img :src="imagenRescate" alt="Imagen nuestros servicios" class="full-width" />
          </q-card>
        </div>

        <!-- Text Card -->
        <div class="col-12 col-md-6 flex items-center">
          <q-card class="full-width q-pa-lg">
            <h2 class="text-h4">¿Salvaste una vida?</h2>
            <p class="text-body1 q-mt-md">Te ayudamos a encontrarle un hogar.</p>
            <q-btn label="Más información" color="primary" class="q-mt-md" />
          </q-card>
        </div>
      </div>
    </div>

    <!-- Sección 5: Contactanos para soporte-->
    <FullBackgroundBanner :image="imagenSoporte" height="300px">
      <div class="col text-white text-center">
        <h1>¿Tienes alguna duda o necesitas soporte?</h1>
        <q-btn label="Contactar" color="primary" />
      </div>
    </FullBackgroundBanner>
  </q-page>
</template>

<script setup>
// Se ha creado un componente que funciona como imagen de banner
import FullBackgroundBanner from 'src/components/FullBackgroundBanner.vue';
import { ref } from 'vue';

// Variables
const imagenRescate = "https://cdn.quasar.dev/img/mountains.jpg";
const imagenQuienesSomos = 'path/to/image.jpg';
const imagenSoporte = "https://cdn.quasar.dev/img/mountains.jpg";
const imagen = "https://cdn.quasar.dev/img/mountains.jpg"; // Add this line

// Lista de mascotas quemadas para el carrusel
const activeSlide = ref(1); // Controls the active slide



function getPetByOffset(offset) {
  const currentIndex = this.pets.findIndex(p => p.id === this.activeSlide);
  const targetIndex = (currentIndex + offset) % this.pets.length;
  return this.pets[targetIndex >= 0 ? targetIndex : this.pets.length + targetIndex];
}

const pets = ref([
  { id: 1, name: 'Mascota 1', description: 'Descripción de la mascota 1', image: 'https://cdn.quasar.dev/img/mountains.jpg' },
  { id: 2, name: 'Mascota 2', description: 'Descripción de la mascota 2', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
  { id: 3, name: 'Mascota 3', description: 'Descripción de la mascota 3', image: 'https://cdn.quasar.dev/img/parallax1.jpg' },
  { id: 4, name: 'Mascota 4', description: 'Descripción de la mascota 4', image: 'https://cdn.quasar.dev/img/mountains.jpg' },
  { id: 5, name: 'Mascota 5', description: 'Descripción de la mascota 5', image: 'https://cdn.quasar.dev/img/linux-avatar.png' },
]);

console.log(pets.value);
</script>

<style scope>
/* Prevent horizontal scrolling */
.q-carousel__slide {
  overflow: hidden !important;
}

/* Ensure cards stay within bounds */
.q-carousel__slide-content {
  width: 100% !important;
}
</style>