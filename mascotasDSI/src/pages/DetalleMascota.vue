<template>
  <q-page class="bg-white" :class="{ 'page-relative': $q.screen.width >= 769 }">
    <div class="row">

      <!-- contenedor -->
      <div class="col-xs-12" style="min-height: 775px">
        <div class="col-xs-12 bg-blue" style="width: 100%;">

          <!-- boton de regreso -->
          <q-btn dense round icon="arrow_back" color="dark" to="/listado"
            style="position: absolute; top: 16px; left: 16px; z-index: 1000;" />

          <!-- carrusel -->
          <q-carousel style="z-index: 10;" v-model="currentSlide" navigation="" transition-prev="jump-right"
            transition-next="jump-left" swipeable animated control-color="dark" infinite arrows height="270px"
            class="carousel-responsive-web">

            <q-carousel-slide v-for="(imagen, index) in imagenesMascota" :key="index" :name="'slide' + index"
              class="column no-wrap flex-center no-padding">
              <q-img :src="imagen.url" :alt="imagen.caption" style="height: 100%; width: 425px;" fit="cover" />
            </q-carousel-slide>

          </q-carousel>

        </div>

        <!-- nombre y tipo -->
        <div class="flex items-center q-mx-md q-mt-md nombre-responsive-web">
          <p class="text-weight-light text-h6 q-my-none">
            Hola soy <span class="text-uppercase text-weight-bold">{{ mascota.nombre }}</span>
          </p>
          <div style="margin-left: auto;" class="tipo-responsive-web">
            <p class="text-weight-medium q-my-none text-capitalize">{{ mascota.tipo }}</p>
            <p class="text-weight-medium q-my-none text-capitalize responsive-origen">{{ mascota.origen }}</p>

          </div>
        </div>

        <!-- cards de info-->

        <div class="q-gutter-x-md flex items-center col-xs-12 cards-responsive"
          style="height: 100px; display: flex; justify-content: center;">
          <div style="width: 90%;" class="vista-web">
            <p class="text-weight-medium q-mb-xs titulo-especifi">Especificaciones de {{ mascota.nombre }}</p>
          </div>
          <q-card class="my-card bg-secondary card-contenido">
            <q-card-section
              style="margin: 0; padding: 0; margin-top: 10%; display: block; justify-items: center; text-align: center;">
              <p class="q-mb-xs text-weight-light">Edad</p>
              <p class="no-margin text-weight-bold">{{ mascota.detalles.edad }}</p>
            </q-card-section>
          </q-card>

          <q-card class="my-card bg-secondary card-contenido">
            <q-card-section
              style="margin: 0; padding: 0; margin-top: 10%; display: block; justify-items: center; text-align: center;">
              <p class="q-mb-xs text-weight-light">Genero</p>
              <p class="no-margin text-weight-bold">{{ mascota.detalles.genero }}</p>
            </q-card-section>
          </q-card>

          <q-card class="my-card bg-secondary card-contenido">
            <q-card-section
              style="margin: 0; padding: 0; margin-top: 10%; display: block; justify-items: center; text-align: center;">
              <p class="q-mb-xs text-weight-light">Raza</p>
              <p class="no-margin text-weight-bold">{{ mascota.detalles.raza }}</p>
            </q-card-section>
          </q-card>

          <q-card class="my-card bg-secondary gt-xs card-contenido">
            <q-card-section
              style="margin: 0; padding: 0; margin-top: 10%; display: block; justify-items: center; text-align: center;">
              <p class="q-mb-xs text-weight-light">Tamaño</p>
              <p class="no-margin text-weight-bold">{{ mascota.detalles.tamanio }}</p>
            </q-card-section>
          </q-card>

          <q-card class="my-card bg-secondary gt-xs card-contenido">
            <q-card-section
              style="margin: 0; padding: 0; margin-top: 10%; display: block; justify-items: center; text-align: center;">
              <p class="q-mb-xs text-weight-light">Color</p>
              <p class="no-margin text-weight-bold">{{ mascota.detalles.color }}</p>
            </q-card-section>
          </q-card>
        </div>

        <!-- descripcion -->
        <div class="acerca-web">
          <p class=" q-mx-md text-weight-medium q-mb-xs titulo-acerca">Acerca de {{ mascota.nombre }}</p>
          <p class=" q-mx-md text-weight-regular text-justify	">{{ mascota.descripcion }}</p>
        </div>

        <!-- historial veterinario -->
        <div class="col-xs-12 veterinario-web">
          <p class=" q-mx-md text-weight-medium q-mb-xs titulo-veterinario">Historial Veterinario</p>
          <p class=" q-mx-md text-weight-light q-mb-xs q-ml-lg">Tipo de Vacunas</p>
          <p class=" q-mx-md text-weight-regular text-justify	">{{ mascota.historialVeterinario }}</p>

        </div>

        <!-- mapa -->
        <div class="mapa-responsive col-xs-12">
          <MapaUbicacion :coordenadas="mascota.ubicacion?.coordenadas" class="mapa-contenido" />
        </div>

        <!-- fecha publicacion -->
        <div class="publicado-web col-xs-12">
          <p class=" q-mt-md text-weight-light q-mb-xs q-ml-lg">Publicado: {{ mascota.publicacion.fecha }}</p>
          <q-chip class="q-mx-md q-ml-lg q-mb-lg">
            <q-avatar>
              <img
                src="https://lh3.googleusercontent.com/a-/ALV-UjVdXLHUuHuM4rWkGpRyDY2CXDA9wsMOdftdmyRvOJch3AlQLUg=s32-c">
            </q-avatar>
            {{ mascota.publicacion.autor.nombre }}
          </q-chip>
        </div>

        <!-- boton agregar -->
        <div class="q-mx-auto q-mb-lg flex boton-web col-xs-12" style="width: 70%; margin-top: 10px;">
          <q-btn :color="mascota.origen === 'rescatado' ? 'green' : 'primary'"
            :text-color="mascota.origen === 'rescatado' ? 'white' : 'dark'"
            :label="mascota.origen === 'rescatado' ? 'Contactar (WhatsApp)' : 'Solicitar Adoptar'"
            :icon="mascota.origen === 'rescatado' ? 'chat' : 'favorite'" style="width: 100%;" />
        </div>

      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import MapaUbicacion from 'components/MapaUbicacion.vue'
// import { useQuasar } from 'quasar'

// const $q = useQuasar();  

const mascota = ref({
  nombre: 'Firulais',
  tipo: 'perro',
  origen: 'domestico',
  detalles: {
    edad: '3 años',
    genero: 'Macho',
    raza: 'Pug',
    tamanio: 'Grande',
    color: 'Gris'
  },
  ubicacion: {
    direccion: "Atiquiz Miquiz",
    coordenadas: {
      lat: 13.972597311480738,
      lng: -89.75937711733103
    }
  },
  descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...Lorem ipsum dolor sit amet consectetur adipisicing elit...Lorem ipsum dolor sit amet consectetur adipisicing elit...Lorem ipsum dolor sit amet consectetur adipisicing elit...',
  historialVeterinario: 'Lorem ipsum dolor sit amet consectetur adipisicing elit..Lorem ipsum dolor sit amet consectetur adipisicing elit...Lorem ipsum dolor sit amet consectetur adipisicing elit...Lorem ipsum dolor sit amet consectetur adipisicing elit....',
  publicacion: {
    fecha: '02/02/2002',
    autor: {
      nombre: 'Anelina Miramontes Malave',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVdXLHUuHuM4rWkGpRyDY2CXDA9wsMOdftdmyRvOJch3AlQLUg=s32-c'
    }
  },

})

const imagenesMascota = ref([
  {
    url: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/15665/production/_107435678_perro1.jpg.webp',
    caption: 'Firulais jugando en el parque'
  },
  {
    url: 'https://cdn.sanity.io/images/5vm5yn1d/pro/5cb1f9400891d9da5a4926d7814bd1b89127ecba-1300x867.jpg?fm=webp&q=80',
    caption: 'Firulais descansando'
  }
])

const currentSlide = ref('slide0')

</script>

<style scoped>
@media (min-width: 769px) {
  .web-col-4 {
    flex: 0 0 33.3333%;
    max-width: 33.3333%;
  }
}

@media (min-width: 768px) {
  .card-tablet {
    display: block !important;
  }
}

.vista-web {
  display: block;
}

@media (max-width: 769px) {
  .vista-web {
    display: none !important;
  }
}

.movil-card {
  width: 93px;
  height: 65px;
}

.web-card {
  width: 120px;
  height: 80px;
}


@media (min-width: 769px) {
  .page-relative {
    position: relative;
  }
}

@media (min-width: 769px) {
  .carousel-responsive-web {
    position: absolute;
    top: 130px;
    left: 20px;
    width: 30%;
  }
}

@media (min-width: 769px) {
  .tipo-responsive-web {
    position: absolute;
    top: 30px;
    left: 20px;
    width: 30%;
    display: flex;
  }

  .responsive-origen {
    margin-left: 5px;
  }
}

@media (min-width: 769px) {
  .nombre-responsive-web {
    position: absolute;
    top: 50px;
    left: 20px;
    width: 30%;
  }
}

@media (min-width: 769px) {
  .acerca-web {
    position: absolute;
    top: 70%;
    left: 20px;
    width: 30%;
  }

  .titulo-acerca {
    background-color: #fef4ea;
    padding: 5px;
    text-align: left;
    font-size: 20px;
  }

  .titulo-especifi {
    background-color: #fef4ea;
    padding: 5px;
    text-align: left;
    font-size: 20px;
  }

}

@media (min-width: 769px) {
  .veterinario-web {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(65%);
    width: 30%;
  }

  .titulo-veterinario {
    background-color: #fef4ea;
    padding: 5px;
    text-align: left;
    font-size: 20px;
  }
}

@media (min-width: 769px) {
  .boton-web {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translateX(85%);
    width: 25% !important;
  }
}

@media (min-width: 769px) {
  .publicado-web {
    position: absolute;
    top: 53%;
    left: 5px;
    width: 30%;
  }
}

@media (min-width: 769px) {
  .nombre-web {
    position: absolute;
    top: 50%;
    left: 20px;
    width: 30%;
  }
}

.mapa-responsive {
  position: relative;
  width: 100%;
}

.mapa-contenido {
  width: 100%;
  margin: 0 auto;
}

@media (min-width: 769px) {
  .mapa-responsive {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
  }

  .mapa-contenido {
    width: 30%;
    max-width: 600px;
  }
}

.cards-responsive {
  position: relative;
  width: 100%;
  margin: auto;
}

/* Estilos base del mapa (móvil) */
.card-contenido {
  width: 96px;
  height: 63px;
  margin: 5px;
}

/* Estilos para desktop (≥ 769px) */
@media (min-width: 769px) {
  .cards-responsive {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    z-index: 1000;
    max-width: 35%;
  }

  .card-contenido {
    width: 42%;
    height: 81px;
    margin: 10px;
  }
}
</style> 