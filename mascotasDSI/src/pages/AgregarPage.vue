<template>
  <q-page class="q-pa-md">
    <div class="row">
      <!-- Panel izquierdo: Imágenes y listado -->
      <div class="col-12 col-md-4" style="background-color: #3C261B; padding: 20px;">
        <span class="text-white text-h3">Agregar Mascota</span>

        <!-- Botón para agregar imágenes -->
        <q-btn
          rounded
          icon="add_a_photo"
          label="Añadir imagen"
          color="green"
          class="q-mt-md full-width"
          @click="seleccionarImagen"
        />

        <!-- Carrusel -->
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          control-color="secondary"
          navigation
          padding
          arrows
          height="300px"
          class="bg-accent text-white shadow-1 rounded-borders q-mt-md"
        >
          <q-carousel-slide
            v-for="(imagen, index) in imagenes"
            :key="index"
            :name="index.toString()"
            class="column no-wrap flex-center"
          >
            <img :src="imagen.url" class="carousel-image" height="100%">
          </q-carousel-slide>
        </q-carousel>

        <!-- Listado de imágenes subidas -->
        <q-list bordered separator class="q-mt-md">
          <q-item
            v-for="(imagen, index) in imagenes"
            :key="index"
            clickable
            @click="verImagen(index)"
          >
            <q-item-section>
              <q-item-label class="cursor-pointer text-white">
                {{ imagen.nombre }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn icon="delete" color="red" @click.stop="eliminarImagen(index)" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- Panel derecho: Formulario -->
      <div class="col-12 col-md-8 q-pl-md">

        <!-- Sección: Ubicación -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h5">Añadir Ubicación</div>
          </q-card-section>
          <q-card-section>
            <div id="map" class="map-container"></div>
            <p class="q-mt-md">(Arrastre el icono para seleccionar) Ubicación seleccionada: <strong>{{ ubicacion.departamento }}, {{ ubicacion.municipio }} </strong></p>
          </q-card-section>
        </q-card>

        <!-- Sección: Datos Generales -->
        <q-card>
          <q-card-section>
            <div class="text-h5">Datos Generales</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="form.nombre" label="Nombre" outlined />
            <q-input v-model="form.descripcion" label="Descripción" type="textarea" outlined class="q-mt-md" />

            <div class="row q-mt-md">
              <q-select v-model="form.genero" :options="['Macho', 'Hembra']" label="Género" outlined class="col-6 q-pr-sm"/>
              <q-select v-model="form.tipo" :options="['Perro', 'Gato', 'Otro']" label="Tipo" outlined class="col-6 q-pl-sm"/>
            </div>

            <div class="row q-mt-md">
              <q-input v-model="form.raza" label="Raza" outlined class="col-6 q-pr-sm"/>
              <q-input v-model="form.tamano" label="Tamaño" outlined class="col-6 q-pl-sm"/>
            </div>

            <div class="row q-mt-md">
              <q-input v-model="form.color" label="Color" outlined class="col-6 q-pr-sm"/>
              <q-input v-model="form.edad" label="Edad en meses" outlined type="number" class="col-6 q-pl-sm"/>
            </div>

            <q-input v-model="form.vacunas" label="Escriba el tipo de vacunas que tiene (opcional)" type="textarea" outlined class="q-mt-md" />


            <div class="row q-mt-md justify-around">
              <q-btn label="Cancelar" style="background-color: #8C3223; color:white;" @click="cancelar"/>
              <q-btn label="Subir" color="green"  @click="subirFormulario"/>
            </div>

          </q-card-section>
        </q-card>

      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { L } from 'src/boot/leaflet'  // Asegúrate de importar 'L' correctamente

const slide = ref('0')
const imagenes = ref([])

const form = ref({
  nombre: '',
  descripcion: '',
  genero: '',
  tipo: '',
  raza: '',
  tamano: '',
  color: '',
  edad: '',
  vacunas: ''
})

const ubicacion = ref({
  departamento: 'No seleccionado',
  municipio: 'No seleccionado'
})

// Función para seleccionar imagen
const seleccionarImagen = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        imagenes.value.push({ url: e.target.result, nombre: file.name })
        slide.value = (imagenes.value.length - 1).toString()
      }
      reader.readAsDataURL(file)
    }
  }
  input.click()
}

// Ver imagen en el carrusel
const verImagen = (index) => {
  slide.value = index.toString()
}

// Eliminar imagen
const eliminarImagen = (index) => {
  imagenes.value.splice(index, 1)
  slide.value = imagenes.value.length ? '0' : '0'
}

// Inicializar el mapa con Leaflet
onMounted(() => {
  const map = L.map('map').setView([13.69, -89.19], 8);  // Usa L directamente
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  const marker = L.marker([13.69, -89.19], { draggable: true }).addTo(map);

  marker.on('dragend', async (event) => {
    const { lat, lng } = event.target.getLatLng();
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
    const data = await response.json();

    ubicacion.value.departamento = data.address.state || 'Desconocido';
    ubicacion.value.municipio = data.address.city || data.address.town || 'Desconocido';
  });
});

// Subir formulario
const subirFormulario = () => {
  console.log('Datos enviados:', form.value, ubicacion.value)
}

// Cancelar
const cancelar = () => {
  form.value = {}
  imagenes.value = []
}
</script>


<style scoped>
.map-container {
  width: 100%;
  height: 300px;
}
.carousel-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: cover;
}
</style>
