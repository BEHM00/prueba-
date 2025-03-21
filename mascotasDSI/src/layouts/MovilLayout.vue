<template>
    <q-layout view="hHh lpR lFf">
  
      <q-header reveal elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn dense flat round icon="menu" color="dark" @click="toggleLeftDrawer" />
        </q-toolbar>
      </q-header>
  
      <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered>
        <!-- drawer content -->
      </q-drawer>
  
      <q-page-container>
        <router-view />
      </q-page-container>
  
      <q-footer bordered class="bg-primary text-white">
  <q-toolbar class="min-height: 50px;"> 
    <div class="row" style="width: 100%;"> 
      <div class="col-6 flex items-center justify-center" style="background-color: aqua;">
        <q-avatar>
          <img src="../assets/icons8-huella-de-gato-ios-17-filled-96.png">
        </q-avatar>
        <p>INICIO</p> 
      </div>
      <div class="col-6 flex items-center justify-center" style="background-color: lightgreen;">
        <q-avatar>
          <img src="../assets/icons8-publicación-windows-11-outline-96.png">
        </q-avatar>
        <p>MIS PUBLICACIONES</p> 
      </div>
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