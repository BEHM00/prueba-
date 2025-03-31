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
            <div id="map" class="map-container q-mt-md"></div>
            <p class="q-mt-md">Ubicación seleccionada: <strong>{{ ubicacion.departamento }}, {{ ubicacion.municipio }}</strong></p>
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
import { ref, onMounted, nextTick } from 'vue'
import { L } from 'src/boot/leaflet'  // Asegúrate de importar 'L' correctamente
import { useQuasar } from 'quasar'
import FloatingFeedbackBtn from 'src/components/FloatingFeedbackBtn.vue'

const $q = useQuasar()

const slide = ref('0')
const imagenes = ref([])

const esAbandonada = ref(false)

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

//mapa
const ubicacion = ref({
  departamento: 'No seleccionado',
  municipio: 'No seleccionado'
})

// Inicializar el mapa con Leaflet
const inicializarMapa =() => {
  const map = L.map('map').setView([13.69, -89.19], 8);  // Usa L directamente
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  const marker = L.marker([13.69, -89.19], { draggable: true }).addTo(map);

  marker.on('dragend', async (event) => {
    const { lat, lng } = event.target.getLatLng();
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
    const data = await response.json();

    const departamento = data.address.state || 'Desconocido';
    let municipio = data.address.city || data.address.town || data.address.village || 'Desconocido';

    // Mapeo de municipios antiguos a nuevos
    const conversionMunicipios = {
  // Departamento de San Salvador
  "Aguilares": "San Salvador Norte",
  "El Paisnal": "San Salvador Norte",
  "Guazapa": "San Salvador Norte",
  "Apopa": "San Salvador Oeste",
  "Nejapa": "San Salvador Oeste",
  "Ilopango": "San Salvador Este",
  "San Martín": "San Salvador Este",
  "Soyapango": "San Salvador Este",
  "Tonacatepeque": "San Salvador Este",
  "Ayutuxtepeque": "San Salvador Centro",
  "Mejicanos": "San Salvador Centro",
  "Cuscatancingo": "San Salvador Centro",
  "Ciudad Delgado": "San Salvador Centro",
  "San Salvador": "San Salvador Centro",
  "San Marcos": "San Salvador Sur",
  "Santo Tomás": "San Salvador Sur",
  "Santiago Texacuangos": "San Salvador Sur",
  "Panchimalco": "San Salvador Sur",
  "Rosario de Mora": "San Salvador Sur",

  // Departamento de La Libertad
  "Quezaltepeque": "La Libertad Norte",
  "San Matías": "La Libertad Norte",
  "San Pablo Tacachico": "La Libertad Norte",
  "San Juan Opico": "La Libertad Centro",
  "Ciudad Arce": "La Libertad Centro",
  "Colón": "La Libertad Oeste",
  "Jayaque": "La Libertad Oeste",
  "Sacacoyo": "La Libertad Oeste",
  "Tepecoyo": "La Libertad Oeste",
  "Talnique": "La Libertad Oeste",
  "Antiguo Cuscatlán": "La Libertad Este",
  "Huizúcar": "La Libertad Este",
  "Nuevo Cuscatlán": "La Libertad Este",
  "San José Villanueva": "La Libertad Este",
  "Zaragoza": "La Libertad Este",
  "Chiltiupán": "La Libertad Costa",
  "Jicalapa": "La Libertad Costa",
  "La Libertad": "La Libertad Costa",
  "Tamanique": "La Libertad Costa",
  "Teotepeque": "La Libertad Costa",
  "Santa Tecla": "La Libertad Sur",
  "Comasagua": "La Libertad Sur",

  // Departamento de Ahuachapán
  "Atiquizaya": "Ahuachapán Norte",
  "El Refugio": "Ahuachapán Norte",
  "San Lorenzo": "Ahuachapán Norte",
  "Turín": "Ahuachapán Norte",
  "Ahuachapán": "Ahuachapán Centro",
  "Apaneca": "Ahuachapán Centro",
  "Concepción de Ataco": "Ahuachapán Centro",
  "Tacuba": "Ahuachapán Centro",
  "Guaymango": "Ahuachapán Sur",
  "Jujutla": "Ahuachapán Sur",
  "San Francisco Menéndez": "Ahuachapán Sur",
  "San Pedro Puxtla": "Ahuachapán Sur",

  // Departamento de Chalatenango
  "Citalá": "Chalatenango Norte",
  "La Palma": "Chalatenango Norte",
  "San Ignacio": "Chalatenango Norte",
  "Agua Caliente": "Chalatenango Centro",
  "Dulce Nombre de María": "Chalatenango Centro",
  "El Paraíso": "Chalatenango Centro",
  "La Reina": "Chalatenango Centro",
  "Nueva Concepción": "Chalatenango Centro",
  "San Fernando": "Chalatenango Centro",
  "San Francisco Morazán": "Chalatenango Centro",
  "San Rafael": "Chalatenango Centro",
  "Santa Rita": "Chalatenango Centro",
  "Tejutla": "Chalatenango Centro",
  "Arcatao": "Chalatenango Sur",
  "Azacualpa": "Chalatenango Sur",
  "Cancasque": "Chalatenango Sur",
  "Chalatenango": "Chalatenango Sur",
  "Comalapa": "Chalatenango Sur",
  "Concepción Quezaltepeque": "Chalatenango Sur",
  "El Carrizal": "Chalatenango Sur",
  "La Laguna": "Chalatenango Sur",
  "Las Vueltas": "Chalatenango Sur",
  "Las Flores": "Chalatenango Sur",
  "Nombre de Jesús": "Chalatenango Sur",
  "Nueva Trinidad": "Chalatenango Sur",
  "Ojos de Agua": "Chalatenango Sur",
  "Potonico": "Chalatenango Sur",
  "San Antonio de la Cruz": "Chalatenango Sur",
  "San Antonio Los Ranchos": "Chalatenango Sur",
  "San Francisco Lempa": "Chalatenango Sur",
  "San Isidro Labrador": "Chalatenango Sur",
  "San Luis del Carmen": "Chalatenango Sur",
  "San Miguel de Mercedes": "Chalatenango Sur",

  // Departamento de Cabañas
  "Guacotecti": "Cabañas Este",
  "San Isidro": "Cabañas Este",
  "Sensuntepeque": "Cabañas Este",
  "Victoria": "Cabañas Este",
  "Dolores": "Cabañas Este",
  "Cinquera": "Cabañas Oeste",
  "Ilobasco": "Cabañas Oeste",
  "Jutiapa": "Cabañas Oeste",
  "Tejutepeque": "Cabañas Oeste",

  // Departamento de Cuscatlán
  "Suchitoto": "Cuscatlán Norte",
  "San José Guayabal": "Cuscatlán Norte",
  "Oratorio de Concepción": "Cuscatlán Norte",
  "San Bartolomé Perulapía": "Cuscatlán Norte",
  "San Pedro Perulapán": "Cuscatlán Norte",
  "Cojutepeque": "Cuscatlán Sur",
  "Candelaria": "Cuscatlán Sur",
  "El Carmen": "Cuscatlán Sur",
  "El rosario": "Cuscatlán Sur",
  "Monte San Juan": "Cuscatlán Sur",
  "San Cristóbal": "Cuscatlán Sur",
  "San Rafael Cedros": "Cuscatlán Sur",
  "San Ramón": "Cuscatlán Sur",
  "Santa Cruz Analquito": "Cuscatlán Sur",
  "Santa Cruz Michapa": "Cuscatlán Sur",
  "Tenancingo": "Cuscatlán Sur",

    // Departamento de La Paz
  "Cuyultitán": "La Paz Oeste",
  "Olocuilta": "La Paz Oeste",
  "San Juan Talpa": "La Paz Oeste",
  "San Luis Talpa": "La Paz Oeste",
  "San Pedro Masahuat": "La Paz Oeste",
  "Tapalhuaca": "La Paz Oeste",
  "San Francisco Chinameca": "La Paz Oeste",
  "El Rosario": "La Paz Centro",
  "Jerusalén": "La Paz Centro",
  "Mercedes La Ceiba": "La Paz Centro",
  "Paraíso de Osorio": "La Paz Centro",
  "San Antonio Masahuat": "La Paz Centro",
  "San Emigdio": "La Paz Centro",
  "San Juan Tepezontes": "La Paz Centro",
  "San Luis La Herradura": "La Paz Centro",
  "San Miguel Tepezontes": "La Paz Centro",
  "San Pedro Nonualco": "La Paz Centro",
  "Santa María Ostuma": "La Paz Centro",
  "Santiago Nonualco": "La Paz Centro",
  "San Juan Nonualco": "La Paz Este",
  "San Rafael Obrajuelo": "La Paz Este",
  "Zacatecoluca": "La Paz Este",

  // Departamento de Morazán
  "Arambala": "Morazán Norte",
  "Cacaopera": "Morazán Norte",
  "Corinto": "Morazán Norte",
  "el rosario": "Morazán Norte",
  "Joateca": "Morazán Norte",
  "Jocoaitique": "Morazán Norte",
  "Meanguera": "Morazán Norte",
  "Perquín": "Morazán Norte",
  "San fernando": "Morazán Norte",
  "San isidro": "Morazán Norte",
  "Torola": "Morazán Norte",
  "Chilanga": "Morazán Sur",
  "Delicias de Concepción": "Morazán Sur",
  "El Divisadero": "Morazán Sur",
  "Gualococti": "Morazán Sur",
  "Guatajiagua": "Morazán Sur",
  "Jocoro": "Morazán Sur",
  "Lolotiquillo": "Morazán Sur",
  "Osicala": "Morazán Sur",
  "San Carlos": "Morazán Sur",
  "San Francisco Gotera": "Morazán Sur",
  "San Simón": "Morazán Sur",
  "Sensembra": "Morazán Sur",
  "Sociedad": "Morazán Sur",
  "Yamabal": "Morazán Sur",
  "Yoloaiquín": "Morazán Sur",

  // Departamento de San Miguel
  "Ciudad Barrios": "San Miguel Norte",
  "Sesori": "San Miguel Norte",
  "Nuevo Edén de San Juan": "San Miguel Norte",
  "San Gerardo": "San Miguel Norte",
  "San Luis de la Reina": "San Miguel Norte",
  "Carolina": "San Miguel Norte",
  "San Antonio": "San Miguel Norte",
  "Chapeltique": "San Miguel Norte",
  "San Miguel": "San Miguel Centro",
  "Comacarán": "San Miguel Centro",
  "Uluazapa": "San Miguel Centro",
  "Moncagua": "San Miguel Centro",
  "Quelepa": "San Miguel Centro",
  "Chirilagua": "San Miguel Centro",
  "Chinameca": "San Miguel Oeste",
  "El Tránsito": "San Miguel Oeste",
  "Lolotique": "San Miguel Oeste",
  "Nueva Guadalupe": "San Miguel Oeste",
  "San Jorge": "San Miguel Oeste",
  "San Rafael Oriente": "San Miguel Oeste",

  // Departamento de Santa Ana
  "Masahuat": "Santa Ana Norte",
  "Metapán": "Santa Ana Norte",
  "Santa Rosa Guachipilín": "Santa Ana Norte",
  "Texistepeque": "Santa Ana Norte",
  "Santa Ana": "Santa Ana Centro",
  "Coatepeque": "Santa Ana Este",
  "El Congo": "Santa Ana Este",
  "Candelaria de la Frontera": "Santa Ana Oeste",
  "Chalchuapa": "Santa Ana Oeste",
  "El Porvenir": "Santa Ana Oeste",
  "San Antonio Pajonal": "Santa Ana Oeste",
  "San Sebastián Salitrillo": "Santa Ana Oeste",
  "Santiago de la Frontera": "Santa Ana Oeste",

  // Departamento de Sonsonate
  "Juayúa": "Sonsonate Norte",
  "Nahuizalco": "Sonsonate Norte",
  "Salcoatitán": "Sonsonate Norte",
  "Santa Catarina Masahuat": "Sonsonate Norte",
  "Sonsonate": "Sonsonate Centro",
  "Sonzacate": "Sonsonate Centro",
  "Nahulingo": "Sonsonate Centro",
  "San Antonio del Monte": "Sonsonate Centro",
  "Santo Domingo de Guzmán": "Sonsonate Centro",
  "Armenia": "Sonsonate Este",
  "Caluco": "Sonsonate Este",
  "Cuisnahuat": "Sonsonate Este",
  "Izalco": "Sonsonate Este",
  "San Julián": "Sonsonate Este",
  "Santa Isabel Ishuatán": "Sonsonate Este",
  "Acajutla": "Sonsonate Oeste",

  // Departamento de Usulután
  "Alegría": "Usulután Norte",
  "Berlín": "Usulután Norte",
  "El Triunfo": "Usulután Norte",
  "Estanzuelas": "Usulután Norte",
  "Jucuapa": "Usulután Norte",
  "Mercedes Umaña": "Usulután Norte",
  "Nueva Granada": "Usulután Norte",
  "San Buenaventura": "Usulután Norte",
  "Santiago de María": "Usulután Norte",
  "California": "Usulután Este",
  "Concepción Batres": "Usulután Este",
  "Ereguayquín": "Usulután Este",
  "Jucuarán": "Usulután Este",
  "Ozatlán": "Usulután Este",
  "Santa Elena": "Usulután Este",
  "San Dionisio": "Usulután Este",
  "Santa María": "Usulután Este",
  "Tecapán": "Usulután Este",
  "Usulután": "Usulután Este",
  "Jiquilisco": "Usulután Oeste",
  "Puerto El Triunfo": "Usulután Oeste",
  "San Agustín": "Usulután Oeste",
  "San Francisco Javier": "Usulután Oeste",

    // Departamento de San Vicente
  "Apastepeque": "San Vicente Norte",
  "Santa Clara": "San Vicente Norte",
  "San Ildefonso": "San Vicente Norte",
  "San Esteban Catarina": "San Vicente Norte",
  "San Sebastián": "San Vicente Norte",
  "San lorenzo": "San Vicente Norte",
  "Santo Domingo": "San Vicente Norte",
  "San Vicente": "San Vicente Sur",
  "Guadalupe": "San Vicente Sur",
  "San Cayetano Istepeque": "San Vicente Sur",
  "Tecoluca": "San Vicente Sur",
  "Tepetitán": "San Vicente Sur",
  "Verapaz": "San Vicente Sur",

  // Departamento de La Unión
  "Anamorós": "La Unión Norte",
  "Bolívar": "La Unión Norte",
  "Concepción de Oriente": "La Unión Norte",
  "El Sauce": "La Unión Norte",
  "Lislique": "La Unión Norte",
  "Nueva Esparta": "La Unión Norte",
  "Pasaquina": "La Unión Norte",
  "Polorós": "La Unión Norte",
  "San José": "La Unión Norte",
  "Santa Rosa de Lima": "La Unión Norte",
  "Conchagua": "La Unión Sur",
  "El carmen": "La Unión Sur",
  "Intipucá": "La Unión Sur",
  "La Unión": "La Unión Sur",
  "Meanguera del Golfo": "La Unión Sur",
  "San Alejo": "La Unión Sur",
  "Yayantique": "La Unión Sur",
  "Yucuaiquín": "La Unión Sur"
};

    if (conversionMunicipios[municipio]) {
      municipio = conversionMunicipios[municipio];
    }

    ubicacion.value.departamento = departamento;
    ubicacion.value.municipio = municipio;
  });
};

const actualizarMapa = () => {
  if (esAbandonada.value) {
    nextTick(() => {
      inicializarMapa();
    });
  }
}

onMounted(() => {
  if (esAbandonada.value) {
    inicializarMapa()
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
