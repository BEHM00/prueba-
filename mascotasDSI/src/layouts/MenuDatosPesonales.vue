<template>
  <q-layout view="hHh lpR fFf">
    <!-- Menú lateral en pantallas grandes -->
    <q-drawer show-if-above side="left" elevated class="menu-container" style="border-right: 3px solid #8d3527;">
      <div class="menu-profile">
        <!-- Sección de Perfil -->
        <div class="account-section" style="margin-bottom: 40px; margin-top: 10px;">
          <div class="text-h6 text-dark" style="text-align: left;">Cuenta</div>
          <div class="text-subtitle2 text-grey">Edita tu nombre, avatar, etc.</div>
          <q-card class="my-card" flat style="width: 100%; margin-top: 25px;">
            <div class="flex flex-center">
              <!-- Imagen con tamaño dinámico -->
              <img :src="imgpredeterminado" :style="sizeimg" />
            </div>
            <q-card-actions style="margin-top: 10px;" align="center">
              <q-btn size="10px" round color="positive" icon="add" />
              <q-btn size="10px" round color="negative" icon="delete" />
            </q-card-actions>
          </q-card>
        </div>

        <!-- Botones de navegación -->
        <div class="flex flex-center">
          <q-btn color="accent" unelevated rounded :style="customizebtn" class="q-mb-md" icon="person" label="Sobre mí" to="/miperfil/sobremi" />
          <q-btn color="accent" unelevated rounded :style="customizebtn" class="q-mb-md" icon="image" label="Tus publicaciones" to="/miperfil/tuspublicaciones" />
          <q-btn color="accent" unelevated rounded :style="customizebtn" class="q-mb-md" icon="description" label="Mis solicitudes" to="/miperfil/tussolicitudes" />
          <q-btn color="accent" unelevated rounded :style="customizebtn" icon="logout" label="Cerrar Sesión" />
        </div>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed } from "vue";
import { useQuasar } from "quasar";
import imgpredeterminado from 'src/assets/imgpredeterminada.png';
const $q = useQuasar();

const customizebtn = computed(() => {
  if ($q.screen.lt.lg) {
    return { margin: "30px 0px 5px 0px", width: "75%" };
  }
  return { margin: "40px 0px 35px 10px", width: "70%" };
});

// Cambiar tamaño de imagen según la resolución
const sizeimg = computed(() => {
  if ($q.screen.lt.lg) {
    return { width: "100px", height: "90px", objectFit: "contain" };  // Tamaño pequeño para pantallas pequeñas
  }
  return { maxWidth: "150px", maxHeight: "150px", objectFit: "contain" };  // Tamaño grande para pantallas grandes
});
</script>



<style scoped>
.menu-container {
  background-color:#fef4ea;
  width: 250px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.menu-profile {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.account-section {
  position: relative;
  text-align: center;
  margin-bottom: 20px;
}


/* Responsive */
@media (max-width: 1024px) {
  .menu-container {
    width: 100%;
    height: auto;
    padding-bottom: 20px;
  }
}
</style>


