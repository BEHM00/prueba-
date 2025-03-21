<template>
  <q-page>
    <div :class="rowClass" style="min-height: 100vh; overflow: auto;">
      <!-- Columna Izquierda (bg-dark) -->
      <div class="col-12 col-sm-4 col-md-4 col-lg-3 bg-dark text-white flex flex-center"
        style="min-height: 200px; display: flex !important;">
        <q-img :src="adoptamesv" alt="Logo" :style="imgStyle"></q-img>
      </div>

      <!-- Columna Derecha -->
      <div class="col-xs-8 col-sm-9 col-md-8 col-lg-9 bg-secondary">
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
        <div class="row">
          <div class="col-6">
            <q-separator :style="line1" color="dark" /><!--Line 1-->
          </div>
          <div class="col">
            <q-icon name="radio_button_unchecked" :style="circulo" />
          </div>
          <div class="col-6">
            <q-separator :style="line2" color="dark" /><!--Line 2-->
          </div>
        </div>
        <div class="row">
          <div class="col flex flex-center">
            <q-btn fab rounded class="bg-dark text-white flex items-center" :class="buttonSizeClass"
              :style="buttonStyle">
              <q-avatar :size="avatarSize" class="q-mr-sm">
                <img src="/src/assets/google.png" />
              </q-avatar>
              <span :style="textStyle">Continuar con Google</span>
            </q-btn>
          </div>
        </div>
        <div class="row">
          <div class="col flex flex-center" style="margin: 45px;">
            <span class="q-ml-sm text-dark" style="font-size: 30px;">"En cada huella, un corazón que late por
              ti."</span>
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
    return { maxWidth: '45%', height: 'auto', objectFit: 'contain' };
  } else if ($q.screen.lt.md) {
    // Para tamaños md, max-width será 50%
    return { maxWidth: '30%', height: 'auto', objectFit: 'contain' };
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
    return { height: '100px', margin: '40px 100px 0px 100px' };
  } else if ($q.screen.lt.lg) {
    return { height: '100px', margin: '65px 60px 0px 100px' };
  } else {
    return { height: '100px', margin: '65px 100px 0px 130px' };
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
    return { height: '130px', margin: '15px 100px 0px 100px' };
  } else if ($q.screen.lt.lg) {
    return { height: '130px', margin: '30px 60px 0px 100px' };
  } else {
    return { height: '130px', margin: '50px 100px 0px 130px' };
  }
});
const line1 = computed(() => {
  if ($q.screen.lt.sm) {
    return { margin: '25px 13px 0px 60px' };
  } else if ($q.screen.lt.md) {
    return { margin: '15px 30px 0px 130px' };
  } else if ($q.screen.lt.lg) {
    return { margin: '25px 20px 0px 125px' };
  } else {
    return { margin: '25px 27px 10px 180px' };
  }
});
const circulo = computed(() => {
  if ($q.screen.lt.sm) {
    return { margin: '19px 1px 0px 2px' };
  } else if ($q.screen.lt.md) {
    return { margin: '9px 1px 0px 0px' };
  } else if ($q.screen.lt.lg) {
    return { margin: '17px 2px 0px 7px' };
  } else {
    return { margin: '18px 2px 10px 1px' };
  }
});
const line2 = computed(() => {
  if ($q.screen.lt.sm) {
    return { margin: '25px 40px 0px 30px' };
  } else if ($q.screen.lt.md) {
    return { margin: '15px 130px 0px 30px' };
  } else if ($q.screen.lt.lg) {
    return { margin: '25px 110px 0px 40px' };
  } else {
    return { margin: '25px 180px 10px 33px' };
  }
});

const buttonSizeClass = computed(() => $q.screen.lt.sm ? "w-72" : "w-96");

const buttonStyle = computed(() => ({
  marginTop: "20px",
  height: $q.screen.lt.sm ? "40px" : "50px",
  width: $q.screen.lt.sm ? "250px" : "300px"
}));

const avatarSize = computed(() => ($q.screen.lt.sm ? "20px" : "30px"));

const textStyle = computed(() => ({
  fontSize: $q.screen.lt.sm ? "12px" : "16px",
  marginRight: $q.screen.lt.sm ? "10px" : "26px"
}));
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
