<template>
  <q-page class="flex justify-center no-wrap">
    <div class="column items-center">
      <span class="text-h4" style="color:#3C261B; margin-top: 25px;">TU COMPAÑERO IDEAL TE ESPERA</span>

      <div class="q-pa-md">
        <div style="max-width: 100%;">
          <q-tabs v-model="tab" align="justify" narrow-indicator class="q-mb-lg shadow-3"
            style="background-color: #FEF4EA; max-width: 50%; margin-left: 25%; margin-top: 15px;">
            <!-- Botón con el ícono de filtro -->
            <q-tab style="color:#3C261B" name="perros" label="Perros" />
            <q-tab style="color:#3C261B" name="gatos" label="Gatos" />
            <q-tab style="color:#3C261B" name="otros" label="Otros" />
            <q-btn flat icon="filter_alt" style="color:#50A163;" @click="toggleFilter" />
          </q-tabs>
          <div class="q-gutter-y-sm">
            <q-tab-panels v-model="tab" animated transition-prev="scale" transition-next="scale"
              class="text-black text-center">

              <!-- Cuadrícula de anuncios para "perros" -->
              <q-tab-panel name="perros">

                <!-- Verificar si no hay elementos en la lista -->
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

                <div class="q-gutter-md q-mt-md" style="display: grid; grid-template-columns: repeat(3, 1fr);">
                  <div v-for="(anuncio, index) in perros" :key="index" class="q-pa-md shadow-2"
                    style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background-color: #FEF4EA;">

                    <!-- Imagen -->
                    <img :src="anuncio.imagen" alt="Imagen de mascota"
                      style="width: 50%; height: 100%; border-radius: 8px;" />

                    <!-- Datos -->
                    <div style="flex-grow: 1; margin-left: 16px;">
                      <!-- Nombre -->
                      <div style="font-size: 0.995rem; color: #3C261B;">Hola soy,</div>
                      <h6 class="text-h4 font-weight-bold" style="margin: 0;">¡{{ anuncio.nombre }}!</h6>

                      <!-- Ubicación -->
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Ubicación: San Salvador</p>

                      <!-- Fecha -->
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Publicado el: {{ anuncio.fecha }}</p>

                      <!-- Publicado por -->
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Publicado por: {{ anuncio.publicadoPor }}</p>

                      <!-- Botones -->
                      <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                        <!-- Reportar -->
                        <q-btn flat icon="report_problem" style="color: #8C3223;" />

                        <!-- Ver más detalles -->
                        <q-btn flat icon="arrow_forward" style="color: #50A163;" />
                      </div>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <!-- Cuadrícula de anuncios para "gatos" -->
              <q-tab-panel name="gatos">

                <!-- Verificar si no hay elementos en la lista -->
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

                <div class="q-gutter-md q-mt-md" style="display: grid; grid-template-columns: repeat(3, 1fr);">
                  <div v-for="(anuncio, index) in gatos" :key="index" class="q-pa-md shadow-2"
                    style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background-color: #FEF4EA;">

                    <!-- Imagen -->
                    <img :src="anuncio.imagen" alt="Imagen de mascota"
                      style="width: 50%; height: 100%; border-radius: 8px;" />

                    <!-- Datos -->
                    <div style="flex-grow: 1; margin-left: 16px;">
                      <!-- Nombre -->
                      <div style="font-size: 0.995rem; color: #3C261B;">Hola soy,</div>
                      <h6 class="text-h4 font-weight-bold" style="margin: 0;">¡{{ anuncio.nombre }}!</h6>

                      <!-- Ubicación -->
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Ubicación: San Salvador</p>

                      <!-- Fecha -->
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Publicado el: {{ anuncio.fecha }}</p>

                      <!-- Publicado por -->
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Publicado por: {{ anuncio.publicadoPor }}</p>

                      <!-- Botones -->
                      <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                        <!-- Reportar -->
                        <q-btn flat icon="report_problem" style="color: #8C3223;" />

                        <!-- Ver más detalles -->
                        <q-btn flat icon="arrow_forward" style="color: #50A163;" />
                      </div>
                    </div>
                  </div>
                </div>
              </q-tab-panel>
              <!-- Cuadrícula de anuncios para "otros" -->
              <q-tab-panel name="otros">
                <!-- Verificar si no hay elementos en la lista -->
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

                <div class="q-gutter-md q-mt-md" style="display: grid; grid-template-columns: repeat(3, 1fr);">
                  <div v-for="(anuncio, index) in otros" :key="index" class="q-pa-md shadow-2"
                    style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background-color: #FEF4EA;">

                    <!-- Imagen -->
                    <img :src="anuncio.imagen" alt="Imagen de mascota"
                      style="width: 50%; height: 100%; border-radius: 8px;" />

                    <!-- Datos -->
                    <div style="flex-grow: 1; margin-left: 16px;">
                      <!-- Nombre -->
                      <div style="font-size: 0.995rem; color: #3C261B;">Hola soy,</div>
                      <h6 class="text-h4 font-weight-bold" style="margin: 0;">¡{{ anuncio.nombre }}!</h6>

                      <!-- Ubicación -->
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Ubicación: San Salvador</p>

                      <!-- Fecha -->
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Publicado el: {{ anuncio.fecha }}</p>

                      <!-- Publicado por -->
                      <p style="font-size: 0.75rem; color: #6C6C6C;">Publicado por: {{ anuncio.publicadoPor }}</p>

                      <!-- Botones -->
                      <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                        <!-- Reportar -->
                        <q-btn flat icon="report_problem" style="color: #8C3223;" />

                        <!-- Ver más detalles -->
                        <q-btn flat icon="arrow_forward" style="color: #50A163;" />
                      </div>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

            </q-tab-panels>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

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
  { nombre: 'Mia', descripcion: 'Gata persa', imagen: 'https://via.placeholder.com/200', fecha: '05/01/2025', publicadoPor: 'Usuario E' },
  { nombre: 'Tom', descripcion: 'Gato siamés', imagen: 'https://via.placeholder.com/200', fecha: '06/01/2025', publicadoPor: 'Usuario F' },
  { nombre: 'Kitty', descripcion: 'Gata angora', imagen: 'https://via.placeholder.com/200', fecha: '07/01/2025', publicadoPor: 'Usuario G' },
  { nombre: 'Oliver', descripcion: 'Gato europeo', imagen: 'https://via.placeholder.com/200', fecha: '08/01/2025', publicadoPor: 'Usuario H' }
])

const otros = ref([
  { nombre: 'Conejo', descripcion: 'Conejo enano', imagen: 'https://via.placeholder.com/200', fecha: '09/01/2025', publicadoPor: 'Usuario I' },
  { nombre: 'Tortuga', descripcion: 'Tortuga terrestre', imagen: 'https://via.placeholder.com/200', fecha: '10/01/2025', publicadoPor: 'Usuario J' },
  { nombre: 'Hamster', descripcion: 'Hamster dorado', imagen: 'https://via.placeholder.com/200', fecha: '11/01/2025', publicadoPor: 'Usuario K' },
  { nombre: 'Pajaro', descripcion: 'Pajaro exótico', imagen: 'https://via.placeholder.com/200', fecha: '12/01/2025', publicadoPor: 'Usuario L' }
])

const tab = ref('perros')
</script>
