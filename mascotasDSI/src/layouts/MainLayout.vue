<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="header">
      <q-toolbar>
        <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" size="xl"/> -->

        <q-toolbar-title>
          <q-avatar size="50px">
            <img src="../assets/logo sin sombra.png">
          </q-avatar>
          <span class="q-ml-sm text-h5">Adoptame SV</span>
        </q-toolbar-title>
        <q-btn-group flat>
          <q-btn flat label="Inicio" to="/"/>
          <q-btn flat label="Quienes somos" />
          <q-btn flat label="catalogo de adopcion" to="/listado"/>
          <q-btn flat label="dar en adopcion" />
          <q-btn flat label="politicas" />
          <q-btn flat label="contactanos" />
        </q-btn-group>
        <q-btn rounded unelevated color="black" label="Iniciar Sesión" to="/inicio-sesion" />
      </q-toolbar>
    </q-header>

    <!-- <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>

    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="footer text-white q-pa-md absolute-bottom">
  <q-toolbar class="row justify-between items-center q-gutter-md">

    <!-- Logo -->
    <div class="col text-center q-mt-lg">
      <img height="100px" src="../assets/logo sin sombra.png">
    </div>

    <!-- Contactos -->
    <div class="col text-center">
      <div class="text-h6">Contactos</div>
      <div class="q-mt-xs text-body1">+503 7589-8455</div>
      <div class="q-mt-xs text-body1">adoptamesv@gmail.com</div>
    </div>

    <!-- Redes -->
    <div class="col flex flex-center column">
      <div class="row q-gutter-sm">
        <q-btn round color="white" icon="fab fa-tiktok" text-color="black" />
        <q-btn round color="white" icon="fab fa-facebook-f" text-color="black" />
        <q-btn round color="white" icon="fab fa-whatsapp" text-color="black" />
      </div>
      <div class="q-mt-sm text-center text-body1">Redes</div>
    </div>

  </q-toolbar>
</q-footer>

  </q-layout>
</template>

<script setup>
// import { ref } from 'vue'

// const leftDrawerOpen = ref(false)

// const toggleLeftDrawer = () => {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }
</script>

<style scoped>
.header {
  background-color: #fcca73;
  color: #3c261b;
}
.footer {
  background-color: #8c3223;
  color: white;
}
</style>
