<template>
  <q-layout view="hHh lpR lFf">

    <q-header reveal elevated class="bg-primary" style=" height: 50px; max-height: 100px;">
      <q-toolbar>
        <q-btn dense flat round icon="menu" color="dark" @click="toggleLeftDrawer" />

        <q-space />
        <q-btn rounded unelevated color="black" label="Iniciar Sesión" to="/inicio-sesion" />

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered class="bg-secondary">
      <!-- drawer content -->
      <div class="row"
        style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 40px;  padding: 0;">
        <q-avatar size="225px">
          <img src="../assets/logo sin sombra.png">  
        </q-avatar>
      </div>
      <!-- apartado de perfil  -->
      <div class="q-mb-lg text-dark">
        <p class="q-mt-sm q-mb-mb q-ml-lg ">PERFIL</p>

        <router-link to="/miperfil/sobremi" style="text-decoration: none; color: inherit;">
          <div class="flex q-ml-lg q-mb-sm">
            <q-avatar size="25px">
              <img src="../assets/icons8-persona-de-sexo-masculino-32.png">  
            </q-avatar>
            <p class="q-ml-sm">Sobre Mi</p>
          </div>
        </router-link>
        <router-link to="/miperfil/tuspublicaciones" style="text-decoration: none; color: inherit;">
          <div class="flex q-ml-lg q-mb-sm">
            <q-avatar size="25px">
              <img src="../assets/icons8-publicación-96.png">  
            </q-avatar>
            <p class="q-ml-sm">Tus Publicaciones</p>
          </div>
        </router-link>
        <router-link to="/miperfil/tussolicitudes" style="text-decoration: none; color: inherit;">
          <div class="flex q-ml-lg">
            <q-avatar size="25px">
              <img src="../assets/icons8-formulario-de-aplicación-32.png">  
            </q-avatar>
            <p class="q-ml-sm">Mis Solicitudes</p>
          </div>
        </router-link>
      </div>

      <!-- apartado de nosotros  -->
      <div class="q-mb-xl text-dark">
        <p class="q-mt-sm q-mb-mb q-ml-lg">NOSOTROS</p>
        <router-link to="/quienessomos" style="text-decoration: none; color: inherit;">
          <div class="flex q-ml-lg q-mb-sm" style="cursor: pointer;">
            <q-avatar size="25px">
              <img src="../assets/icons8-llamada-de-conferencia-32.png">  
            </q-avatar>
            <p class="q-ml-sm">Quienes Somos</p>
          </div>
        </router-link>

        <router-link to="/quienessomos" style="text-decoration: none; color: inherit;">
          <div class="flex q-ml-lg q-mb-sm">
            <q-avatar size="25px">
              <img src="../assets/icons8-teléfono-48.png">  
            </q-avatar>
            <p class="q-ml-sm">Contactanos</p>
          </div>
        </router-link>
        <router-link to="/tutorial" style="text-decoration: none; color: inherit;">
          <div class="flex q-ml-lg q-mb-sm">
            <q-avatar size="25px">
              <img src="../assets/icons8-cómo-búsqueda-32.png">  
            </q-avatar>
            <p class="q-ml-sm">¿Como Funciona?</p>
          </div>
        </router-link>
        <router-link to="/politicas" style="text-decoration: none; color: inherit;">
          <div class="flex q-ml-lg">
            <q-avatar size="25px">
              <img src="../assets/icons8-flag-48.png">  
            </q-avatar>
            <p class="q-ml-sm">Politicas</p>
          </div>
        </router-link>


      </div>

      <div class="flex q-ml-md text-dark" style="margin-top: 30%;">
        <q-avatar size="25px">
          <img src="../assets/icons8-burbuja-de-diálogo-con-puntos-32.png">  
        </q-avatar>
        <p class="q-ml-sm">Haz una sugerencia o comentario</p>
      </div>


    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-primary" style="max-height:70px;">
      <q-toolbar>
        <div class="row text-dark" style="width: 100%;">
          <!-- Primera columna -->
          <router-link to="/listado" style="text-decoration: none; color: inherit; flex: 1;">
            <div class="col-6"
              style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0; padding: 0;">
              <q-avatar size="25px" class="q-mt-sm">
                <img src="../assets/icons8-huella-de-gato-ios-17-filled-96.png">
              </q-avatar>
              <p style="margin-top: 7px;">INICIO</p>
            </div>
          </router-link>

          <!-- Segunda columna -->
          <router-link to="/miperfil/tuspublicaciones" style="text-decoration: none; color: inherit; flex: 1;">
            <div class="col-6"
              style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0; padding: 0;">
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

<style scoped></style>


<script>
import { ref } from 'vue'

export default {
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>