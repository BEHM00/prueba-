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

        <!-- Sección: ¿Es una mascota abandonada? -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h5">Estado de la mascota</div>
          </q-card-section>
          <q-card-section>
            <q-toggle v-model="esAbandonada" label="¿Es una mascota abandonada?" @update:model-value="actualizarMapa" />
          </q-card-section>
        </q-card>

        <!-- Sección: Ubicación (solo si es abandonada) -->
        <q-card v-if="esAbandonada" class="q-mb-md">
          <q-card-section>
            <div class="text-h5">Añadir Ubicación</div>
          </q-card-section>
          <q-card-section>
            <q-select
              v-model="ubicacion.departamento"
              :options="departamentos"
              label="Departamento"
              outlined
              @update:model-value="actualizarMunicipios"
            />
            <q-select
              v-model="ubicacion.municipio"
              :options="municipios"
              label="Municipio"
              outlined
              class="q-mt-md"
            />
            <div id="map" class="map-container q-mt-md"></div>
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

            <q-input v-model="form.color" label="Color" outlined class="q-mt-md" />
            <q-input v-model="form.edad" label="Edad en meses" outlined type="number" class="q-mt-md"/>

            <q-input v-model="form.vacunas" label="Escriba el tipo de vacunas que tiene (opcional)" type="textarea" outlined class="q-mt-md" />

            <div class="row q-mt-md justify-around">
              <q-btn label="Cancelar" style="background-color: #8C3223; color:white;" to="/" @click="cancelar"/>
              <q-btn label="Subir" color="green"  @click="subirFormulario"/>
            </div>

          </q-card-section>
        </q-card>

      </div>
    </div>
  </q-page>
   <!-- Botón flotante de feedback -->
   <FloatingFeedbackBtn />
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { L } from 'src/boot/leaflet'  // Asegúrate de importar 'L' correctamente
import { useQuasar } from 'quasar'
import FloatingFeedbackBtn from 'src/components/FloatingFeedbackBtn.vue'

const $q = useQuasar()

const slide = ref('0')
const imagenes = ref([])

const esAbandonada = ref(false)
const mapInstance = ref(null)
const markerInstance = ref(null)

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
  departamento: '',
  municipio: ''
})

const departamentos = ref([
  'San Salvador', 'La Libertad', 'Santa Ana', 'Sonsonate', 'Ahuachapán',
  'San Vicente', 'Cuscatlán', 'Chalatenango', 'Usulután', 'San Miguel',
  'Morazán', 'La Unión', 'Cabañas', 'La Paz'
])

const municipiosPorDepartamento = {
'Ahuachapán': {
  municipios: [
    'Ahuachapán', 'Apaneca', 'Atiquizaya', 'Concepción de Ataco', 'El Refugio',
    'Guaymango', 'Jujutla', 'San Francisco Menéndez', 'San Lorenzo', 'San Pedro Puxtla',
    'Tacuba', 'Turín'
  ],
  coords: {
    'Ahuachapán': [13.9215, -89.8451],
    'Apaneca': [13.8686, -89.7503],
    'Atiquizaya': [13.9767, -89.7594],
    'Concepción de Ataco': [13.8708, -89.8494],
    'El Refugio': [13.8939, -89.6731],
    'Guaymango': [13.7939, -89.8553],
    'Jujutla': [13.7947, -89.8689],
    'San Francisco Menéndez': [13.7675, -89.9475],
    'San Lorenzo': [13.8942, -89.8267],
    'San Pedro Puxtla': [13.8442, -89.7936],
    'Tacuba': [13.9150, -89.9064],
    'Turín': [13.8886, -89.7242]
  }
},
'Cabañas': {
  municipios: [
    'Cinquera', 'Dolores', 'Guacotecti', 'Ilobasco', 'Jutiapa', 'San Isidro',
    'Sensuntepeque', 'Tejutepeque', 'Victoria'
  ],
  coords: {
    'Cinquera': [13.8786, -88.6306],
    'Dolores': [13.8461, -88.7942],
    'Guacotecti': [13.8628, -88.7267],
    'Ilobasco': [13.8425, -88.8489],
    'Jutiapa': [13.9861, -88.7692],
    'San Isidro': [13.9353, -88.7711],
    'Sensuntepeque': [13.8867, -88.6286],
    'Tejutepeque': [13.8831, -88.6667],
    'Victoria': [13.9478, -88.6339]
  }
}
,
'Chalatenango': {
  municipios: [
    'Agua Caliente', 'Arcatao', 'Azacualpa', 'Citalá', 'Comalapa', 'Concepción Quezaltepeque',
    'Dulce Nombre de María', 'El Carrizal', 'El Paraíso', 'La Laguna', 'La Palma', 'La Reina',
    'Las Vueltas', 'Nombre de Jesús', 'Nueva Concepción', 'Nueva Trinidad', 'Ojos de Agua', 'Potonico',
    'San Antonio de La Cruz', 'San Fernando', 'San Francisco Lempa', 'San Francisco Morazán',
    'San Ignacio', 'San Isidro Labrador', 'San José Cancasque', 'San José Las Flores', 'San Luis del Carmen',
    'San Miguel de Mercedes', 'San Rafael', 'Santa Rita', 'Tejutla'
  ],
  coords: {
    'Agua Caliente': [14.0333, -89.1000],
    'Arcatao': [14.0333, -89.0333],
    'Azacualpa': [13.9500, -89.0667],
    'Citalá': [14.0833, -89.1500],
    'Comalapa': [14.0167, -89.2167],
    'Concepción Quezaltepeque': [13.9000, -89.1333],
    'Dulce Nombre de María': [14.0500, -89.2333],
    'El Carrizal': [14.1667, -89.0667],
    'El Paraíso': [14.1667, -89.2000],
    'La Laguna': [14.2000, -89.1500],
    'La Palma': [14.3167, -89.1500],
    'La Reina': [14.0333, -89.1667],
    'Las Vueltas': [14.1000, -89.1167],
    'Nombre de Jesús': [14.0333, -89.2500],
    'Nueva Concepción': [14.1667, -89.3000],
    'Nueva Trinidad': [14.1167, -89.2167],
    'Ojos de Agua': [14.2500, -89.1667],
    'Potonico': [14.0833, -89.2000],
    'San Antonio de La Cruz': [14.0833, -89.2667],
    'San Fernando': [14.1667, -89.3667],
    'San Francisco Lempa': [14.0500, -89.2833],
    'San Francisco Morazán': [14.1000, -89.2500],
    'San Ignacio': [14.1333, -89.1500],
    'San Isidro Labrador': [14.0667, -89.2500],
    'San José Cancasque': [14.2000, -89.3000],
    'San José Las Flores': [14.0667, -89.2167],
    'San Luis del Carmen': [14.1000, -89.3000],
    'San Miguel de Mercedes': [14.1667, -89.3667],
    'San Rafael': [14.0833, -89.3333],
    'Santa Rita': [14.2000, -89.2500],
    'Tejutla': [14.1500, -89.2000]
  }
}
,
  'Cuscatlán': {
    municipios: ['Cojutepeque', 'Candelaria', 'El Carmen', 'El Rosario', 'Monte San Juan', 'Oratorio de Concepción', 'San Bartolomé Perulapía', 'San Cristóbal', 'San José Guayabal', 'San Pedro Perulapán', 'San Rafael Cedros', 'San Ramón', 'Santa Cruz Analquito', 'Santa Cruz Michapa', 'Suchitoto', 'Tenancingo'],
    coords: { 'Cojutepeque': [13.7167, -88.9333], 'Suchitoto': [13.9436, -89.0275] }//Las demas no especificadas
  },
  'La Libertad': {
    municipios: ['Antiguo Cuscatlán', 'Chiltiupán', 'Ciudad Arce', 'Colón', 'Comasagua', 'Huizúcar', 'Jayaque', 'Jicalapa', 'La Libertad', 'Nuevo Cuscatlán', 'Quezaltepeque', 'San Juan Opico', 'Sacacoyo', 'San José Villanueva', 'San Matías', 'San Pablo Tacachico', 'Santa Tecla', 'Tamanique', 'Talnique', 'Teotepeque', 'Tepecoyo', 'Zaragoza'],
    coords: { 'Santa Tecla': [13.6764, -89.2797], 'Quezaltepeque': [13.831, -89.2785], 'San Juan Opico': [13.8667, -89.3333] }
  },//solo esas coords disponibles
  'San Salvador': {
    municipios: ['Aguilares', 'Apopa', 'Ayutuxtepeque', 'Cuscatancingo', 'Ciudad Delgado', 'El Paisnal', 'Guazapa', 'Ilopango', 'Mejicanos', 'Nejapa', 'Panchimalco', 'Rosario de Mora', 'San Marcos', 'San Martín', 'San Salvador', 'Santiago Texacuangos', 'Santo Tomás', 'Soyapango', 'Tonacatepeque'],
    coords: { 'San Salvador': [13.6989, -89.1914], 'Mejicanos': [13.749, -89.215], 'Soyapango': [13.7106, -89.1182], 'Apopa': [13.8072, -89.1797] }
  },//solo esas disponibles
  'San Miguel': {
    municipios: ['Carolina', 'Chapeltique', 'Chinameca', 'Chirilagua', 'Ciudad Barrios', 'Comacarán', 'El Tránsito', 'Lolotique', 'Moncagua', 'Nueva Guadalupe', 'Nuevo Edén de San Juan', 'Quelepa', 'San Antonio', 'San Gerardo', 'San Jorge', 'San Luis de La Reina', 'San Miguel', 'San Rafael Oriente', 'Sesori', 'Uluazapa'],
    coords: { 'San Miguel': [13.4833, -88.1833], 'Chirilagua': [13.2172, -88.1381], 'El Tránsito': [13.4333, -88.35] }
  },
  'Santa Ana': {
    municipios: ['Candelaria de la Frontera', 'Chalchuapa', 'Coatepeque', 'El Congo', 'El Porvenir', 'Masahuat', 'Metapán', 'San Antonio Pajonal', 'San Sebastián Salitrillo', 'Santa Ana', 'Santa Rosa Guachipilín', 'Santiago de La Frontera', 'Texistepeque'],
    coords: { 'Santa Ana': [13.977, -89.5631], 'Metapán': [14.3333, -89.4456], 'Chalchuapa': [13.9864, -89.6819] }
  },
  'Sonsonate': {
    municipios: ['Acajutla', 'Armenia', 'Caluco', 'Cuisnahuat', 'Izalco', 'Juayúa', 'Nahuizalco', 'Nahulingo', 'Salcoatitán', 'San Antonio del Monte', 'San Julián', 'Santa Catarina Masahuat', 'Santa Isabel Ishuatán', 'Santo Domingo de Guzmán', 'Sonsonate', 'Sonzacate'],
    coords: { 'Sonsonate': [13.7189, -89.7247], 'Izalco': [13.7444, -89.6736] }
  },
  'San Vicente': {
    municipios: ['Apastepeque', 'Guadalupe', 'San Cayetano Istepeque', 'San Esteban Catarina', 'San Sebastián', 'Santa Clara', 'Santa Cruz Michapa', 'Santiago Nonualco', 'Tecoluca', 'Zacatecoluca'],
    coords: { 'Zacatecoluca': [13.5228, -88.9922], 'San Vicente': [13.5333, -88.9500], 'Tecoluca': [13.6019, -88.9408] }
  },
  'Usulután': {
    municipios: ['Alegría', 'Berlín', 'California', 'Concepción Batres', 'El Triunfo', 'Ereguayquín', 'Jiquilisco', 'Jucuapa', 'La Unión', 'Mercedes Umaña', 'San Agustín', 'San Buenaventura', 'San Esteban Catarina', 'San Dionisio', 'San Lorenzo'],
    coords: { 'Alegría': [13.4567, -88.3944], 'San Agustín': [13.4333, -88.4567], 'Jiquilisco': [13.4572, -88.4481] }
  },
  'Morazán': {
    municipios: ['Arambala', 'Chilanga', 'Corinto', 'Cacaopera', 'El Divisadero', 'El Rosario', 'Gotera', 'Joateca', 'La Unión', 'Lolotique', 'Meanguera', 'San Carlos', 'San Fernando', 'San Simón', 'Yamabal'],
    coords: { 'La Unión': [13.3217, -87.9808], 'Corinto': [13.2933, -87.8814], 'Gotera': [13.5825, -88.2214] }
  },
  'La Unión': {
    municipios: ['Anamorós', 'Conchagua', 'El Carmen', 'El Sauce', 'La Unión', 'Luisiana', 'Pasaquina', 'San Alejo', 'San José', 'San Miguelito', 'Santa Rosa de Lima', 'Yucuaiquín'],
    coords: { 'La Unión': [13.3217, -87.9808], 'Santa Rosa de Lima': [13.3172, -87.8275], 'Pasaquina': [13.3119, -87.8275] }
  },
  'La Paz': {
    municipios: ['Cuyultitán', 'El Rosario', 'Jerusalén', 'La Paz', 'San Antonio Masahuat', 'San Emigdio', 'San Esteban Catarina', 'San Juan Tepezontes', 'San Luis Talpa', 'San Luis La Herradura', 'San Miguel Tepezontes', 'San Pedro Masahuat', 'San Pedro Nonualco', 'San Santiago Nonualco', 'Zaragoza'],
    coords: { 'La Paz': [13.8783, -88.9188], 'San Juan Tepezontes': [13.7806, -88.8367], 'San Luis Talpa': [13.825, -88.8908] }
  }
}


const municipios = ref([])

// Función para inicializar el mapa
const inicializarMapa = () => {
  if (mapInstance.value) {
    mapInstance.value.remove()
  }

  nextTick(() => {
    mapInstance.value = L.map('map').setView([13.69, -89.19], 8)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance.value)
  })
}

// Función para actualizar los municipios y limpiar selección
const actualizarMunicipios = () => {
  municipios.value = municipiosPorDepartamento[ubicacion.value.departamento]?.municipios || []
  ubicacion.value.municipio = ''
}

// Función para actualizar el marcador en el mapa
const actualizarMarcador = () => {
  if (!ubicacion.value.departamento || !ubicacion.value.municipio) return

  const coordsMunicipio = municipiosPorDepartamento[ubicacion.value.departamento]?.coords[ubicacion.value.municipio]
  const coordsDepartamento = municipiosPorDepartamento[ubicacion.value.departamento]?.coords[ubicacion.value.departamento]

  if (!coordsMunicipio) {
    // Si el municipio no tiene coordenadas, coloca el marcador en el centro del departamento
    if (markerInstance.value) {
      markerInstance.value.remove() // Eliminar marcador anterior
    }

    // Mostrar mensaje de que el municipio no tiene coordenadas disponibles
    markerInstance.value = L.marker(coordsDepartamento).addTo(mapInstance.value)
      .bindPopup(`${ubicacion.value.municipio}, ${ubicacion.value.departamento} (El municipio no tiene coordenadas disponibles)`)
      .openPopup()

    mapInstance.value.setView(coordsDepartamento, 12) // Centrar el mapa en el centro del departamento
  } else {
    // Si tiene coordenadas, coloca el marcador en el municipio
    if (markerInstance.value) {
      markerInstance.value.remove() // Eliminar marcador anterior
    }

    markerInstance.value = L.marker(coordsMunicipio).addTo(mapInstance.value)
      .bindPopup(`${ubicacion.value.municipio}, ${ubicacion.value.departamento}`)
      .openPopup()

    mapInstance.value.setView(coordsMunicipio, 12) // Centrar el mapa en la nueva ubicación
  }
}

// Cargar el mapa cuando el toggle cambia
const actualizarMapa = () => {
  if (esAbandonada.value) {
    inicializarMapa()
  }
}

onMounted(() => {
  if (esAbandonada.value) {
    inicializarMapa()
  }
})

// Detectar cambios en el municipio y actualizar el marcador
watch(() => ubicacion.value.municipio, () => {
  // Verificar si el municipio tiene coordenadas antes de actualizar el marcador
  if (municipiosPorDepartamento[ubicacion.value.departamento]?.coords[ubicacion.value.municipio]) {
    actualizarMarcador() // Si tiene coordenadas, actualizar el marcador
  } else {
    // Si no tiene coordenadas, solo mostrar mensaje pero permitir continuar con la selección
    actualizarMarcador()
  }
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

const subirFormulario = () => {
  console.log('Datos enviados:', form.value, esAbandonada.value ? ubicacion.value : 'Sin ubicación')
  $q.notify({
    message: 'Formulario enviado correctamente',
    type: 'positive'
  })
}

const cancelar = () => {
  form.value = {}
  imagenes.value = []
  $q.notify({
    message: 'Formulario cancelado',
    type: 'negative'
  })
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
