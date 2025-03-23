<template>
  <q-page class="flex justify-center no-wrap">
    <div class="column items-center" style="min-width: 100%;">
      <span class="text-h4" style="color:#3C261B; margin-top: 25px; font-size: 3vw;">TU COMPAÑERO IDEAL TE ESPERA</span>

      <div class="q-pa-md" style="min-width: 100%;">
        <div>
          <q-tabs v-model="tab" align="justify" narrow-indicator class="q-mb-lg shadow-3"
            style="background-color: #FEF4EA; max-width: 75%; margin-left: 14%; margin-top: 15px;">
            <q-tab style="color:#3C261B" name="perros" label="Perros" />
            <q-tab style="color:#3C261B" name="gatos" label="Gatos" />
            <q-tab style="color:#3C261B" name="otros" label="Otros" />
            <q-btn flat icon="filter_alt" style="color:#50A163;" @click="filtersVisible = true" />
          </q-tabs>
          <!-- Diálogo de filtros -->
          <q-dialog v-model="filtersVisible">
            <q-card class="bg-primary">
              <q-card-section>
                <div class="text-h6">Filtros de Búsqueda</div>
              </q-card-section>

              <q-card-section>
                <!-- Filtro de Recientes -->
                <q-toggle v-model="filters.recientesFilter" label="Recientes" color="positive" />

                <!-- Filtro de Ubicación -->
                <q-select v-model="filters.ubicacionFilterFilter" :options="ubicacionOptions" label="Ubicacion"
                  filled />

                <!-- Filtro de Género -->
                <q-select v-model="filters.generoFilter" :options="generoOptions" label="Género" filled />

                <!-- Filtro de Tamaño -->
                <q-select v-model="filters.tamanoFilterFilter" :options="tamanoOptions" label="Tamaño" filled />

                <!-- Filtro de Edad -->
                <q-input v-model="filters.edadFilter" label="Edad" type="number" />
              </q-card-section>

              <q-card-actions>
                <!-- Botones de acción -->
                <q-btn flat label="Cancelar" @click="filtersVisible = false" />
                <q-btn flat label="Aplicar" color="positive" @click="applyFilters" />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <div class="q-gutter-y-sm">
            <q-tab-panels v-model="tab" animated transition-prev="scale" transition-next="scale"
              class="text-black text-center">

              <!-- Cuadrícula de anuncios para "perros" -->
              <q-tab-panel name="perros">
                <div v-if="perros.length === 0" class="q-pa-md shadow-2"
                  style="display: flex; justify-content: center; align-items: center; padding: 16px; background-color: #FEF4EA;">
                  <q-card class="q-pa-md" style="max-width: 100%; background-color: #FEF4EA">
                    <q-card-section>
                      <div class="text-center">
                        <p style="color: #3C261B;" class="text-h1">¡No hay anuncios disponibles en esta categoría!</p>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <!-- Cuadrícula de cards con ajuste responsive -->
                <div class="q-gutter-md q-mt-md"
                  style="display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));">
                  <div v-for="(anuncio, index) in perros" :key="index" class="q-pa-md shadow-2"
                    style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background-color: #FEF4EA;">

                    <!-- Imagen -->
                    <img :src="anuncio.imagen" alt="Imagen de mascota"
                      style="width: 50%; height: 100%; border-radius: 8px;" />

                    <!-- Datos -->
                    <div style="flex-grow: 1; margin-left: 16px;">
                      <div style="font-size: 0.995rem; color: #3C261B;">Hola soy,</div>
                      <h6 class="text-h4 font-weight-bold" style="margin: 0;">¡{{ anuncio.nombre }}!</h6>
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Ubicación: San Salvador</p>
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Publicado el: {{ anuncio.fecha }}</p>
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Publicado por: {{ anuncio.publicadoPor }}</p>

                      <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                        <q-btn flat icon="report_problem" style="color: #8C3223;" @click="reportarDialog">
                          <q-tooltip class="bg-negative">Reportar</q-tooltip>
                        </q-btn>
                        <q-btn flat icon="arrow_forward" style="color: #50A163;" to="detalle/:IDMASCOTA">
                          <q-tooltip class="bg-positive">Ver Mas</q-tooltip>
                        </q-btn>
                        <!-- dialog para reportar -->
                        <q-dialog v-model="reportDialogVisible">
                          <q-card style="min-width: 350px;" class="bg-primary">
                            <q-card-section>
                              <div class="text-h6 text-negative">Reportar Anuncio</div>
                              <q-input v-model="reportReason" label="Por que quiere reportar" type="text" :dense="true"
                                autofocus counter maxlength="200" color="white" />
                            </q-card-section>

                            <q-card-actions>
                              <q-btn flat label="Cancelar" color="black" @click="reportDialogVisible = false" />
                              <q-btn flat label="Reportar" color="negative" @click="reportarAnuncio" />
                            </q-card-actions>
                          </q-card>
                        </q-dialog>
                      </div>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <!-- Cuadrícula de anuncios para "gatos" -->
              <q-tab-panel name="gatos">
                <div v-if="gatos.length === 0" class="q-pa-md shadow-2"
                  style="display: flex; justify-content: center; align-items: center; padding: 16px; background-color: #FEF4EA;">
                  <q-card class="q-pa-md" style="max-width: 100%; background-color: #FEF4EA">
                    <q-card-section>
                      <div class="text-center">
                        <p style="color: #3C261B;" class="text-h1">¡No hay anuncios disponibles en esta categoría!</p>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <!-- Cuadrícula de cards con ajuste responsive -->
                <div class="q-gutter-md q-mt-md"
                  style="display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));">
                  <div v-for="(anuncio, index) in gatos" :key="index" class="q-pa-md shadow-2"
                    style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background-color: #FEF4EA;">

                    <!-- Imagen -->
                    <img :src="anuncio.imagen" alt="Imagen de mascota"
                      style="width: 50%; height: 100%; border-radius: 8px;" />

                    <!-- Datos -->
                    <div style="flex-grow: 1; margin-left: 16px;">
                      <div style="font-size: 0.995rem; color: #3C261B;">Hola soy,</div>
                      <h6 class="text-h4 font-weight-bold" style="margin: 0;">¡{{ anuncio.nombre }}!</h6>
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Ubicación: San Salvador</p>
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Publicado el: {{ anuncio.fecha }}</p>
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Publicado por: {{ anuncio.publicadoPor }}</p>

                      <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                        <q-btn flat icon="report_problem" style="color: #8C3223;" @click="reportarDialog">
                          <q-tooltip class="bg-negative">Reportar</q-tooltip>
                        </q-btn>
                        <q-btn flat icon="arrow_forward" style="color: #50A163;" to="detalle/:IDMASCOTA">
                          <q-tooltip class="bg-positive">Ver Mas</q-tooltip>
                        </q-btn>
                        <!-- dialog para reportar -->
                        <q-dialog v-model="reportDialogVisible">
                          <q-card style="min-width: 350px;" class="bg-primary">
                            <q-card-section>
                              <div class="text-h6 text-negative">Reportar Anuncio</div>
                              <q-input v-model="reportReason" label="Por que quiere reportar" type="text" :dense="true"
                                autofocus counter maxlength="200" color="white" />
                            </q-card-section>

                            <q-card-actions>
                              <q-btn flat label="Cancelar" color="black" @click="reportDialogVisible = false" />
                              <q-btn flat label="Reportar" color="negative" @click="reportarAnuncio" />
                            </q-card-actions>
                          </q-card>
                        </q-dialog>
                      </div>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <!-- Cuadrícula de anuncios para "otros" -->
              <q-tab-panel name="otros">
                <div v-if="otros.length === 0" class="q-pa-md shadow-2"
                  style="display: flex; justify-content: center; align-items: center; padding: 16px; background-color: #FEF4EA;">
                  <q-card class="q-pa-md" style="max-width: 100%; background-color: #FEF4EA">
                    <q-card-section>
                      <div class="text-center">
                        <p style="color: #3C261B;" class="text-h1">¡No hay anuncios disponibles en esta categoría!</p>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <!-- Cuadrícula de cards con ajuste responsive -->
                <div class="q-gutter-md q-mt-md"
                  style="display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));">
                  <div v-for="(anuncio, index) in otros" :key="index" class="q-pa-md shadow-2"
                    style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background-color: #FEF4EA;">

                    <!-- Imagen -->
                    <img :src="anuncio.imagen" alt="Imagen de mascota"
                      style="width: 50%; height: 100%; border-radius: 8px;" />

                    <!-- Datos -->
                    <div style="flex-grow: 1; margin-left: 16px;">
                      <div style="font-size: 0.995rem; color: #3C261B;">Hola soy,</div>
                      <h6 class="text-h4 font-weight-bold" style="margin: 0;">¡{{ anuncio.nombre }}!</h6>
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Ubicación: San Salvador</p>
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Publicado el: {{ anuncio.fecha }}</p>
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Publicado por: {{ anuncio.publicadoPor }}</p>

                      <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                        <q-btn flat icon="report_problem" style="color: #8C3223;" @click="reportarDialog">
                          <q-tooltip class="bg-negative">Reportar</q-tooltip>
                        </q-btn>
                        <q-btn flat icon="arrow_forward" style="color: #50A163;" to="detalle/:IDMASCOTA">
                          <q-tooltip class="bg-positive">Ver Mas</q-tooltip>
                        </q-btn>
                        <!-- dialog para reportar -->
                        <q-dialog v-model="reportDialogVisible">
                          <q-card style="min-width: 350px;" class="bg-primary">
                            <q-card-section>
                              <div class="text-h6 text-negative">Reportar Anuncio</div>
                              <q-input v-model="reportReason" label="Por que quiere reportar" type="text" :dense="true"
                                autofocus counter maxlength="200" color="white" />
                            </q-card-section>

                            <q-card-actions>
                              <q-btn flat label="Cancelar" color="black" @click="reportDialogVisible = false" />
                              <q-btn flat label="Reportar" color="negative" @click="reportarAnuncio" />
                            </q-card-actions>
                          </q-card>
                        </q-dialog>
                      </div>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

            </q-tab-panels>
          </div>
        </div>
      </div>

      <!-- pagination -->
      <div class="q-pa-lg flex flex-center">
        <q-pagination v-model="current" :max="5" />
      </div>
    </div>
  </q-page>
</template>


<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const reportDialogVisible = ref(false)
const filtersVisible = ref(false)
const current = ref(2)

// Datos para cada categoría de animales
const perros = ref([
  { nombre: 'Rex', descripcion: 'Perro pastor alemán', imagen: '/src/assets/confirmado.png', fecha: '01/01/2025', publicadoPor: 'Usuario A' },
  { nombre: 'Fido', descripcion: 'Perro mestizo', imagen: '/src/assets/Tux.png', fecha: '02/01/2025', publicadoPor: 'Usuario B' },
  { nombre: 'Luna', descripcion: 'Perra labrador', imagen: '/src/assets/perros.jpg', fecha: '03/01/2025', publicadoPor: 'Usuario C' },
  { nombre: 'Max', descripcion: 'Perro bulldog', imagen: '/src/assets/dog_1.png', fecha: '04/01/2025', publicadoPor: 'Usuario D' },
  { nombre: 'Rex', descripcion: 'Perro pastor alemán', imagen: 'https://via.placeholder.com/200', fecha: '01/01/2025', publicadoPor: 'Usuario A' },
  { nombre: 'Fido', descripcion: 'Perro mestizo', imagen: 'https://via.placeholder.com/200', fecha: '02/01/2025', publicadoPor: 'Usuario B' },
  { nombre: 'Luna', descripcion: 'Perra labrador', imagen: 'https://via.placeholder.com/200', fecha: '03/01/2025', publicadoPor: 'Usuario C' },
  { nombre: 'Max', descripcion: 'Perro bulldog', imagen: 'https://via.placeholder.com/200', fecha: '04/01/2025', publicadoPor: 'Usuario D' }

])

const gatos = ref([
  { nombre: 'Mia', descripcion: 'Gata persa', imagen: '/src/assets/confirmado.png', fecha: '05/01/2025', publicadoPor: 'Usuario E' },
  { nombre: 'Tom', descripcion: 'Gato siamés', imagen: '/src/assets/Tux.png', fecha: '06/01/2025', publicadoPor: 'Usuario F' },
  { nombre: 'Kitty', descripcion: 'Gata angora', imagen: '/src/assets/dog_1.png', fecha: '07/01/2025', publicadoPor: 'Usuario G' },
  { nombre: 'Oliver', descripcion: 'Gato europeo', imagen: 'https://via.placeholder.com/200', fecha: '08/01/2025', publicadoPor: 'Usuario H' }
])

const otros = ref([
  { nombre: 'Conejo', descripcion: 'Conejo enano', imagen: 'https://via.placeholder.com/200', fecha: '09/01/2025', publicadoPor: 'Usuario I' },
  { nombre: 'Tortuga', descripcion: 'Tortuga terrestre', imagen: 'https://via.placeholder.com/200', fecha: '10/01/2025', publicadoPor: 'Usuario J' },
  { nombre: 'Hamster', descripcion: 'Hamster dorado', imagen: 'https://via.placeholder.com/200', fecha: '11/01/2025', publicadoPor: 'Usuario K' },
  { nombre: 'Pajaro', descripcion: 'Pajaro exótico', imagen: 'https://via.placeholder.com/200', fecha: '12/01/2025', publicadoPor: 'Usuario L' }
])

const tab = ref('perros')

//filtros
const filters = ref({
  recientesFilter: false,
  ubicacionFilter: '',
  generoFilter: '',
  tamanoFilter: '',
  edadFilter: ''
});

const generoOptions = [
  { label: 'Macho', value: 'macho' },
  { label: 'Hembra', value: 'hembra' },
  { label: 'Otro', value: 'otro' }
];

const ubicacionOptions = [
  { label: 'Ahuachapán', value: 'ahuachapan' },
  { label: 'Cabañas', value: 'cabanas' },
  { label: 'Chalatenango', value: 'chalatenango' },
  { label: 'Cuscatlán', value: 'cuscatlan' },
  { label: 'La Libertad', value: 'la_libertad' },
  { label: 'La Paz', value: 'la_paz' },
  { label: 'La Unión', value: 'la_union' },
  { label: 'Morazán', value: 'morazan' },
  { label: 'San Miguel', value: 'san_miguel' },
  { label: 'San Salvador', value: 'san_salvador' },
  { label: 'San Vicente', value: 'san_vicente' },
  { label: 'Santa Ana', value: 'santa_ana' },
  { label: 'Sonsonate', value: 'sonsonate' },
  { label: 'Usulután', value: 'usulutan' }
];

const tamanoOptions = [
  { label: 'Pequeño', value: 'pequeno' },
  { label: 'Mediano', value: 'mediano' },
  { label: 'Grande', value: 'grande' }
];



const applyFilters = () => {
  // Aquí puedes aplicar los filtros seleccionados
  $q.notify({
    message: 'Filtros aplicados exitosamente',
    type: 'positive'
  })
  filtersVisible.value = false; // Cierra el diálogo
};

const reportarDialog = () => {
  reportDialogVisible.value = true;
}

const reportarAnuncio = () => {
  $q.notify({
    message: 'Anuncio reportado exitosamente',
    type: 'positive'
  })
  reportDialogVisible.value = false;
}

</script>
