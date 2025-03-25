<template>
  <q-layout view="hHh lpR fFf">
    <!-- Menú lateral en pantallas grandes -->
    <q-drawer v-if="!isMobile" show-if-above side="left" elevated class="menu-container">
      <div class="menu-profile">
        <!-- Sección de Perfil -->
        <div class="account-section">
          <q-avatar size="100px" class="bg-white text-primary">
            <q-icon name="person" size="50px" />
          </q-avatar>
          <q-btn fab dense size="sm" color="brown" icon="edit" class="edit-avatar-btn" />
          <div class="text-h6 text-dark">Cuenta</div>
          <div class="text-subtitle2 text-grey">Edita tu nombre, avatar, etc.</div>
        </div>

        <!-- Botones de navegación -->
        <div class="menu-buttons">
          <q-btn color="brown" unelevated rounded class="full-width q-mb-md" icon="person" label="Sobre mí" to="/miperfil/sobremi" />
          <q-btn color="brown" unelevated rounded class="full-width q-mb-md" icon="image" label="Tus publicaciones" to="/miperfil/tuspublicaciones" />
          <q-btn color="brown" unelevated rounded class="full-width q-mb-md" icon="description" label="Mis solicitudes" to="/miperfil/tussolicitudes" />
          <q-btn color="brown" unelevated rounded class="full-width" icon="logout" label="Cerrar Sesión" />
        </div>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const isMobile = ref(false);

onMounted(() => {
  isMobile.value = $q.screen.lt.md; // Detecta si la pantalla es menor a 'md' (móviles y tabletas)
});
</script>

<style scoped>
.menu-container {
  background-color: #fef4ea;
  width: 250px;
  height: 100vh;
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

.edit-avatar-btn {
  position: absolute;
  bottom: 10px;
  right: 120px;
}

.menu-buttons {
  width: 80%;
}

.full-width {
  width: 100%;
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


