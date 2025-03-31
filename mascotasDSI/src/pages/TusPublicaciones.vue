<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <router-link to="/listado" style="text-decoration: none; color: inherit;">
          <div class="flex items-center q-mb-sm q-mt-lg q-ml-lg">
            <q-btn dense flat round icon="arrow_back" color="dark" />
            <span style="text-decoration: underline; font-size: 16px;">Tus publicaciones</span>
          </div>
        </router-link>

        <div class="flex items-center q-mb-xs q-mt-lg q-mx-auto" style="width: 85%;">
          <q-btn color="accent" text-color="white" icon="add" label="Crear publicación de adopción" style="width: 100%;"
            to="/" />
        </div>

        <!-- seccion de filtros -->

        <div class="flex items-center q-mb-lg q-mt-lg q-mx-auto q-gutter-x-xs" style="width: 85%;">
          <span style="margin-right: 5%;">Filtros:</span>
          <q-select style="width: 25%;" dense standout="bg-primary text-dark" v-model="modelTipos" :options="tipos"
            label="Tipo" />
          <q-select style="width: 28%;" dense standout="bg-primary text-dark" v-model="modelEstados" :options="estados"
            label="Estado" />
          <q-btn style="width: 20%; font-size: 11px; margin-right: 3%" dense flat label="Limpiar filtros"
            color="dark" />
        </div>

        <!-- Contadores (solo visible en pantallas grandes) -->
        <div class="contador-publicaciones q-mb-xl">
          <div class="contador-item">
            <span class="contador-numero">{{ publicaciones.length }}</span>
            <span class="contador-texto">Publicaciones Totales</span>
          </div>
          <div class="contador-item">
            <span class="contador-numero">{{publicaciones.filter(p => p.estado === 'Activo').length}}</span>
            <span class="contador-texto">Publicaciones Activas</span>
          </div>
          <div class="contador-item">
            <span class="contador-numero">{{publicaciones.filter(p => p.estado === 'Adoptado').length}}</span>
            <span class="contador-texto">Mascotas Adoptadas</span>
          </div>
        </div>

        <!-- Lista de publicaciones -->
        <div class="q-mx-auto" style="width: 85%;">
          <q-list separator>
            <q-card v-for="publicacion in publicaciones" :key="publicacion.id" class="q-mb-md bg-secondary">
              <q-chip class="tipo-chip" color="dark" text-color="white">
                {{ publicacion.tipo }}
              </q-chip>

              <q-card-section class="row items-center">
                <q-img :src="publicacion.imagen" class="imagen-mascota" />

                <div class="col q-ml-md">
                  <p class="text-h6 text-weight-bold q-mb-none">{{ publicacion.nombre }}</p>
                  <p class="text-caption text-grey">Publicado el {{ publicacion.fecha }}</p>
                  <q-chip :color="publicacion.estado === 'Activo' ? 'green-10' : 'orange-9'" text-color="white">
                    {{ publicacion.estado }}
                  </q-chip>
                </div>
              </q-card-section>

              <q-card-actions class="q-px-md q-pb-md">
                <q-btn color="primary" text-color="dark" label="Marcar como adoptado" icon="check"
                  style="width: 48%;" />
                <q-btn color="negative" text-color="white" label="Eliminar publicación" icon="delete"
                  style="width: 48%;" />
              </q-card-actions>
            </q-card>
          </q-list>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const modelTipos = ref(null)
const modelEstados = ref(null)
const tipos = ['Perro', 'Gato', 'Otro']
const estados = ['Activo', 'Adoptado']

const publicaciones = ref([
  { id: 1, nombre: 'Firulais', tipo: 'Perro', fecha: '28/03/2025', estado: 'Activo', imagen: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/15665/production/_107435678_perro1.jpg.webp' },
  { id: 2, nombre: 'Mishi', tipo: 'Gato', fecha: '25/03/2025', estado: 'Adoptado', imagen: 'https://cdn.sanity.io/images/5vm5yn1d/pro/5cb1f9400891d9da5a4926d7814bd1b89127ecba-1300x867.jpg?fm=webp&q=80' },
  { id: 3, nombre: 'Tommy', tipo: 'Otro', fecha: '20/03/2025', estado: 'Activo', imagen: 'https://www.animalesyanimales.com/uploads/images/animales-exoticos-que-se-pueden-tener-en-casa.jpg' }
])
</script>

<style scoped>
.imagen-mascota {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
}

.tipo-chip {
  position: absolute;
  top: 10px;
  right: 10px;
}

.contador-publicaciones {
  display: none;
  justify-content: space-between;
  width: 85%;
  margin: 30px auto;
  gap: 10px;
}

.contador-item {
  flex: 1;
  border: 2px solid #3c261b;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  color: #3c261b;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
}

.contador-numero {
  font-size: 24px;
  margin-bottom: 4px;
}

.contador-texto {
  font-size: 14px;
}

@media (min-width: 769px) {
  .contador-publicaciones {
    display: flex;
  }
}
</style>