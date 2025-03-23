<template>
    <q-layout view="hHh lpR lFf">
  
      <q-header reveal elevated class="bg-primary" style=" height: 50px; max-height: 100px;">
        <q-toolbar>
          <q-btn dense flat round icon="menu" color="dark" @click="toggleLeftDrawer" />

          <q-space/>

          <router-link to="/miperfil" style="text-decoration: none; color: inherit;">
          <q-avatar>
            <img src="../assets/logo sin sombra.png"> <!-- Ruta de la imagen de perfil -->
          </q-avatar>
        </router-link>
        </q-toolbar>
      </q-header>
  
      <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered>
        <!-- drawer content -->
         <h2>hola</h2>
      </q-drawer>
  
      <q-page-container>
        <router-view />
      </q-page-container>
  
      <q-footer bordered class="bg-primary" style="max-height:70px;">
  <q-toolbar>
    <div class="row text-dark" style="width: 100%;">
      <!-- Primera columna -->
      <router-link to="/" style="text-decoration: none; color: inherit; flex: 1;">
      <div class="col-6" style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0; padding: 0;">
        <q-avatar size="25px" class="q-mt-sm">
          <img src="../assets/icons8-huella-de-gato-ios-17-filled-96.png">
        </q-avatar>
        <p style="margin-top: 7px;">INICIO</p>
      </div>
      </router-link>

      <!-- Segunda columna -->
      <router-link to="/miperfil" style="text-decoration: none; color: inherit; flex: 1;">
      <div class="col-6" style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0; padding: 0;">
        <q-avatar size="30px" class="q-mt-sm">
          <img src="../assets/icons8-publicación-windows-11-outline-96.png">
        </q-avatar>
        <p style="margin-top: 5px;">MIS PUBLICACIONES</p>
      </div>
      </router-link>

    </div>
  </q-toolbar>
</q-footer>
    </q-layout>
  </template>

<style scoped>
</style>
  
  
  <script>
import { ref } from 'vue'
  
  export default {
    setup () {
      const leftDrawerOpen = ref(false)
  
      return {
        leftDrawerOpen,
        toggleLeftDrawer () {
          leftDrawerOpen.value = !leftDrawerOpen.value
        }
      }
    }
  }
  </script>