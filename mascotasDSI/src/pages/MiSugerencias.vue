<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md bg-orange-2 text-dark">
      <q-card-section class="text-h6 text-bold flex justify-between">
        Sugerencias y comentarios
        <q-btn flat dense icon="close" color="red" @click="cerrarFormulario" />
      </q-card-section>

      <q-card-section>
        <div class="text-bold text-center">Razón</div>
        <q-select 
          v-model="razon" 
          :options="opcionesRazon" 
          label="Selecciona una razón" 
          class="custom-label"
        />
      </q-card-section>

      <q-card-section class="flex justify-center">
        <q-icon name="pets" size="xl" color="black" />
      </q-card-section>

      <q-card-section>
  <div class="text-bold text-center">Comentario</div>
  <q-input v-model="comentario" filled type="textarea" placeholder="Escribe tu comentario...">
    <template v-slot:prepend>
      <q-img src="https://minifreemarket.com/upload/thumbs/user/ogimage/dibujo-perro-dalmanta.webp" width="30px" height="30px" class="rounded-borders" />
    </template>
  </q-input>
</q-card-section>

      <q-card-actions align="center">
        <q-btn label="Enviar" color="black" glossy @click="enviarComentario" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const razon = ref(null);
const comentario = ref('');
const opcionesRazon = ref([
  'Sugerencia',
  'Comentario',
  
]);

const enviarComentario = () => {
  console.log('Razón:', razon.value);
  console.log('Comentario:', comentario.value);
};

const cerrarFormulario = () => {
  console.log('Formulario cerrado');
};
</script>


