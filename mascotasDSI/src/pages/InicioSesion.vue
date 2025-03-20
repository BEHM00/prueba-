<template>
  <q-page>
    <div :class="rowClass" style="height: 100vh">
      <!-- Columna Izquierda (bg-dark) -->
      <div class="col-xs-4 col-sm-5 col-md-4 col-lg-3 bg-dark text-white flex flex-center">
        <q-img :src="adoptamesv" alt="Logo" :style="imgStyle"></q-img>
      </div>

      <!-- Columna Derecha -->
      <div class="col-xs-8 col-sm-7 col-md-8 col-lg-9 bg-secondary">
        <div class="column flex flex-left" :style="disenocorreo">
          <div class="col text-accent text-weight-bold" style="font-size: 16px;">
            Dirección de correo electrónico:
          </div>
          <div class="col-8">
            <q-input color="accent" rounded outlined v-model="correoelectronico">
              <template v-slot:append>
                <q-icon name="mail" color="accent" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="column flex flex-left" :style="disenopasswd">
          <div class="col text-accent text-weight-bold" style="font-size: 16px;">
            Contraseña:
          </div>
          <div class="col-6">
            <q-input color="accent" rounded outlined v-model="passwd" :type="showPassword ? 'text' : 'password'">
              <template v-slot:append>
                <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" color="accent" class="cursor-pointer"
                  @click="togglePassword" />
              </template>
            </q-input>
          </div>

          <div class="col text-deep-purple-6 text-weight-bold cursor-pointer" style=" margin-top: 1px; font-size: 16px;"
            @click="forgotPassword">
            ¿Olvido su contraseña?
          </div>
        </div>
        <div class="column flex flex-center" :style="disenocontinuar">
          <div class="col-6">
            <q-btn fab size="20px" rounded class="bg-dark text-white" label="Continuar" style="width: 200px;" />
          </div>
          <div class="row">
            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 text-weight-bold"
              style=" margin-top: 15px; font-size: 16px;">
              ¿No tienes una cuenta?
            </div>
            <router-link to="/inicio-sesion/crear-cuenta" class="col text-deep-purple-6 text-weight-bold cursor-pointer"
              style="text-decoration: none ;margin-top: 15px; font-size: 16px;">
              Regístrese
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import adoptamesv from 'src/assets/logo sin sombra.png';

const passwd = ref("");
const showPassword = ref(false); // Estado para mostrar u ocultar contraseña

const togglePassword = () => {
  showPassword.value = !showPassword.value; // Cambia el estado entre true y false
};

const $q = useQuasar();

// Cambia dinámicamente entre "row" y "column" según el tamaño de la pantalla
const rowClass = computed(() => ($q.screen.lt.md ? "column" : "row"));

// Computada para cambiar el estilo de la imagen
const imgStyle = computed(() => {
  if ($q.screen.lt.sm) {
    // Para tamaños xs o sm, max-width será 70%
    return { maxWidth: '70%', height: 'auto', objectFit: 'contain' };
  } else if ($q.screen.lt.md) {
    // Para tamaños md, max-width será 50%
    return { maxWidth: '50%', height: 'auto', objectFit: 'contain' };
  } else {
    // Para tamaños grandes, max-width será 100%
    return { maxWidth: '100%', height: 'auto', objectFit: 'contain' };
  }
});

//Estilo de div e input correo electronico
const disenocorreo = computed(() => {
  if ($q.screen.lt.sm) {
    return { height: '100px', margin: '30px 30px 0px 50px' };
  } else if ($q.screen.lt.md) {
    return { height: '100px', margin: '50px 100px 0px 100px' };
  } else if ($q.screen.lt.lg) {
    return { height: '100px', margin: '100px 60px 0px 100px' };
  } else {
    return { height: '100px', margin: '100px 100px 0px 130px' };
  }
});
//Estilo de div e input passwd
const disenopasswd = computed(() => {
  if ($q.screen.lt.sm) {
    return { height: '130px', margin: '25px 30px 0px 50px' };
  } else if ($q.screen.lt.md) {
    return { height: '130px', margin: '35px 100px 0px 100px' };
  } else if ($q.screen.lt.lg) {
    return { height: '130px', margin: '40px 60px 0px 100px' };
  } else {
    return { height: '130px', margin: '50px 100px 0px 130px' };
  }
});
//Estilo de div e input passwd
const disenocontinuar = computed(() => {
  if ($q.screen.lt.sm) {
    return { height: '130px', margin: '25px 30px 0px 50px' };
  } else if ($q.screen.lt.md) {
    return { height: '130px', margin: '35px 100px 0px 100px' };
  } else if ($q.screen.lt.lg) {
    return { height: '130px', margin: '40px 60px 0px 100px' };
  } else {
    return { height: '130px', margin: '90px 100px 0px 130px' };
  }
});
//Dialog para cambio de contraseña
const forgotPassword = () => {
  $q.dialog({
    title: 'Recuperar Contraseña',
    message: 'Ingrese su correo electrónico:',
    prompt: {
      model: '',
      isValid: val => val.length > 5 && val.includes('@'), // Validación simple de correo
      type: 'email'
    },
    cancel: true,
    persistent: true
  }).onOk(email => {
    console.log('Correo ingresado:', email)
    // Aquí podrías enviar el correo de recuperación con Firebase o API
  })
}
</script>
