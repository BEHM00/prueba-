<template>
  <q-page>
    <div :class="rowClass" style=" min-height: 100vh; overflow: auto;">
      <div v-if="$q.screen.lt.md" class="column bg-secondary"
          style="min-height: 200px; border-bottom: 3px solid #8d3527;">

        <!-- Contenedor del texto alineado a la izquierda -->
        <div style="margin-left: 50px;margin-top: 15px;">
          <div class="text-h6 text-dark">Cuenta</div>
          <div class="text-subtitle2 text-grey">Edita tu nombre, avatar, etc.</div>
        </div>

        <!-- Contenedor del q-card centrado -->
        <div class="flex flex-center q-mt-md ">
          <q-card class="my-card flex flex-center column transparent" flat
                  style="width: 250px; padding: 20px;">
            <img :src="imgpredeterminado" :style="sizeimg" class="q-mb-md" />

            <q-card-actions align="center">
              <q-btn size="10px" round color="positive" icon="add" />
              <q-btn size="10px" round color="negative" icon="delete" />
            </q-card-actions>
          </q-card>
        </div>

      </div>
      <q-carousel v-model="slide" swipeable animated control-color="accent" navigation padding arrows
        class="col-12 col-sm-8 col-md-12 col-lg-12 text-dark rounded-borders">
        <!--Slide 1-->
        <q-carousel-slide name="slide1" class="full-height">
         <div class="text-h4">Sobre mi</div>
         <div class="q-col-gutter-md">
            <div class="column q-mb-md" :style="customeslide1">
              <div class="text-accent text-weight-bold text-md text-sm">Nombre completo</div>
              <q-input color="accent" rounded outlined v-model="nombreusuario">
                <template v-slot:append>
                  <q-icon name="person" color="accent" />
                </template>
              </q-input>
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6" :style="customeslide1">
                <div class="text-accent text-weight-bold text-md text-sm">Teléfono</div>
                <q-input color="accent" rounded outlined v-model="telefono">
                  <template v-slot:append>
                    <q-icon name="phone" color="accent" />
                  </template>
                </q-input>
              </div>

              <div class="col-12 col-sm-6" :style="customeslide1">
                <div class="text-accent text-weight-bold text-md text-sm">Edad</div>
                <q-slider switch-label-side label label-always v-model="edad" :min="16" :max="60" color="accent" />
              </div>
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6" :style="customeslide1">
                <div class="text-accent text-weight-bold text-md text-sm">Departamento</div>
                <q-select color="accent" filled v-model="departamento" label="Seleccione" :options="optionsdep"
                  behavior="menu" />
              </div>

              <div class="col-12 col-sm-6" :style="customeslide1">
                <div class="text-accent text-weight-bold text-md text-sm">Municipio</div>
                <q-select color="accent" filled v-model="municipio" label="Seleccione" :options="optionsmun"
                  behavior="menu" :disable="!departamento" />
              </div>
            </div>

            <div class="column q-mt-md" :style="customeslide1">
              <div class="text-accent text-weight-bold text-md text-sm">Complemento de dirección (opcional)</div>
              <q-input color="accent" rounded outlined v-model="complementodireccion">
                <template v-slot:append>
                  <q-icon name="edit_note" color="accent" />
                </template>
              </q-input>
            </div>
            <div class="column q-mt-md" :style="customeslide1">
              <div class="text-accent text-weight-bold text-md text-sm">"Cuéntanos más sobre ti, ¿Por qué consideras que estás listo para asumir esta responsabilidad?"</div>
              <q-input color="accent" rounded outlined v-model="aboutme"
               >
                <template v-slot:append>
                  <q-icon name="handshake" color="accent" />
                </template>
              </q-input>
            </div>

            <div class="column q-mt-md" :style="customeslide1">
              <div class="text-accent text-weight-bold text-md text-sm">¿Qué te ha motivado a adoptar?</div>
              <q-input color="accent" rounded outlined v-model="adopt">
                <template v-slot:append>
                  <q-icon name="pets" color="accent" />
                </template>
              </q-input>
            </div>
         </div>
        </q-carousel-slide>
        <!-- Slide 2 -->
        <q-carousel-slide name="slide2" class="full-height" style="height: 100vh; overflow: hidden;">
          <div class="q-col-gutter-md">
            <div class="column q-mb-md" :style="paddingslide2">
              <q-toggle
                  v-model="showPasswordField"
                  label="Inicio de sesion con google"
                  color="accent"
                />
            </div>
            <div class="column q-mb-md" :style="paddingslide2">
              <div class="text-accent text-weight-bold text-md text-sm">Correo electrónico:</div>
              <q-input color="accent" rounded outlined v-model="correoelectronico">
                <template v-slot:append>
                  <q-icon name="mail" color="accent" />
                </template>
              </q-input>
            </div>

            <div  v-if="showPasswordField" class="row">
              <div class="col-9 col-sm-7" :style="paddingslide2">
                <div class="text-accent text-weight-bold text-md text-sm">Contraseña:</div>
                <q-input color="accent" rounded outlined v-model="password" :type="showPassword ? 'text' : 'password'">
                  <template v-slot:append>
                    <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" color="accent" class="cursor-pointer" @click="togglePassword" />
                  </template>
                </q-input>
              </div>
              <div class="col-3 col-sm-5" :style="paddingslide2">
                <!-- Botón "Cambiar contraseña" -->
                <q-btn icon="edit" round @click="changePassword" color="dark" style="margin-top: 25px; margin-left: 20px;" />
              </div>
            </div>
            <div v-else>
              <p class="text-accent">Se ha registrado con un correo electrónico de Google</p>
            </div>
            <!-- Botón Guardar cambios Cuenta -->
            <div class="q-mt-md q-mb-md text-center" style="margin-top: 50px;">
              <q-btn label="Guardar cambios" color="positive" rounded  @click="crearCuenta" />
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-page>
</template>

<script setup>
import {ref,computed,watch } from "vue";
import { useQuasar } from "quasar";
import { departamentosConMunicipios } from 'src/components/ColeccionDepart.js'
import imgpredeterminado from 'src/assets/imgpredeterminada.png';

const showPasswordField = ref(false);
const nombreusuario=ref("");
const telefono = ref("");
const edad = ref(16);
const departamento = ref(null);
const municipio = ref(null);
const complementodireccion=ref("")
const aboutme = ref("");
const adopt = ref("");
const slide = ref("slide1");
const $q = useQuasar();
const rowClass = computed(() => ($q.screen.lt.md ? "column" : "row"));
const password = ref("");
const showPassword = ref(false);


const togglePassword = () => {
  showPassword.value = !showPassword.value; // Cambia el estado entre true y false
};


const optionsdep = departamentosConMunicipios.map(d => d.nombre);
const optionsmun = computed(() => {
  const selectedDept = departamentosConMunicipios.find(d => d.nombre === departamento.value);
  return selectedDept ? selectedDept.municipios : [];
});

watch(departamento, () => {
  municipio.value = null;  // Limpiar el municipio al seleccionar un nuevo departamento
});

const customeslide1 = computed(() => {
  if  ($q.screen.lt.sm) {
    return { margin: '12px 0px 12px 0px' };
  } else if ($q.screen.lt.md) {
    return { margin: '20px 0px 18px 0px' };
  } else if ($q.screen.lt.lg) {
    return { margin: '25px 0px 25px 0px' };
  } else {
    return {margin: '25px 0px 25px 0px' };
  }
});
const paddingslide2 = computed(() => {
  if ($q.screen.lt.sm) {
    return { margin: '12px 0px 12px 0px' };
  } else if ($q.screen.lt.md) {
    return { margin: '45px 0px 18px 0px' };
  } else if ($q.screen.lt.lg) {
    return { margin: '36px 0px 25px 0px' };
  } else {
    return {margin: '40px 0px 25px 0px' };
  }
});

const sizeimg = computed(() => {
  if ($q.screen.lt.lg) {
    return { width: "100px", height: "90px", objectFit: "contain" };  // Tamaño pequeño para pantallas pequeñas
  }
  return { maxWidth: "150px", maxHeight: "150px", objectFit: "contain" };  // Tamaño grande para pantallas grandes
});

// Función para mostrar el diálogo de recuperación de contraseña
const changePassword = () => {
  $q.dialog({
    title: 'Cambio de Contraseña',
    message: 'Ingrese su correo electrónico:',
    prompt: {
      model: '',
      isValid: val => val.length > 5 && val.includes('@'), // Validación simple de correo
      type: 'email'
    },
    cancel: true,
    persistent: true
  }).onOk(email => {
    console.log('Correo ingresado:', email);
    // Aquí podrías enviar el correo de recuperación con Firebase o alguna API
    // Por ejemplo:
    // firebase.auth().sendPasswordResetEmail(email).then(() => {
    //   console.log('Correo de recuperación enviado');
    // }).catch(error => {
    //   console.error('Error al enviar el correo de recuperación:', error);
    // });
  });
};
</script>

<style scoped>

</style>
