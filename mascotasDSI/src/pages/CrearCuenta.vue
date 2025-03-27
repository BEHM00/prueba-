<template>
  <q-page>
    <div :class="rowClass" style="min-height: 100vh; overflow: auto;">
      <div class="col-12 col-sm-4 col-md-4 col-lg-3 bg-dark text-white flex flex-center"
        style="min-height: 200px; display: flex !important;">
        <div class="column" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
          <div class="col text-center">
            <h3 class="text-white q-mb-none" :style="tamañopantalla">Creando tu cuenta</h3>
          </div>
          <q-img :src="crearcuenta" alt="Logo" :style="imgStyle" />
        </div>
      </div>

      <q-carousel v-model="slide" swipeable animated control-color="accent" navigation padding arrows
        class="col-12 col-sm-8 col-md-8 col-lg-9 text-purple rounded-borders">

        <!-- Slide 1 -->
        <q-carousel-slide name="slide1">
          <div class="q-col-gutter-md">
            <div class="column q-mb-md" :style="customecolumnslide1">
              <div class="text-accent text-weight-bold text-md text-sm">Ingrese su nombre completo:</div>
              <q-input color="accent" rounded outlined v-model="nombreusuario">
                <template v-slot:append>
                  <q-icon name="person" color="accent" />
                </template>
              </q-input>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6" :style="customecolumnslide1">
                <div class="text-accent text-weight-bold text-md text-sm">Ingrese su teléfono:</div>
                <q-input color="accent" rounded outlined v-model="telefono">
                  <template v-slot:append>
                    <q-icon name="phone" color="accent" />
                  </template>
                </q-input>
              </div>

              <div class="col-12 col-sm-6" :style="customecolumnslide1">
                <div class="text-accent text-weight-bold text-md text-sm">Ingrese su edad:</div>
                <q-slider switch-label-side label label-always v-model="edad" :min="16" :max="60" color="accent" />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6" :style="customecolumnslide1">
                <div class="text-accent text-weight-bold text-md text-sm">Departamento:</div>
                <q-select color="accent" filled v-model="departamento" label="Seleccione" :options="optionsdep"
                  behavior="menu" />
              </div>

              <div class="col-12 col-sm-6" :style="customecolumnslide1">
                <div class="text-accent text-weight-bold text-md text-sm">Municipio:</div>
                <q-select color="accent" filled v-model="municipio" label="Seleccione" :options="optionsmun"
                  behavior="menu" :disable="!departamento" />
              </div>
            </div>

            <div class="column q-mt-md" :style="customecolumnslide1">
              <div class="text-accent text-weight-bold text-md text-sm">Complemento de dirección (opcional):</div>
              <q-input color="accent" rounded outlined v-model="complementodireccion">
                <template v-slot:append>
                  <q-icon name="edit_note" color="accent" />
                </template>
              </q-input>
            </div>

            <div class="column q-mt-md" :style="customecolumnslide1">
              <div class="text-accent text-weight-bold text-md text-sm">"Cuéntanos más sobre ti, ¿Por qué consideras que estás listo para asumir esta responsabilidad?":</div>
              <q-input color="accent" rounded outlined v-model="aboutme"
               >
                <template v-slot:append>
                  <q-icon name="handshake" color="accent" />
                </template>
              </q-input>
            </div>

            <div class="column q-mt-md" :style="customecolumnslide1">
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

            <div class="column q-mb-md"  :style="paddingslide2" >
              <div class="text-accent text-weight-bold text-md text-sm">Ingrese su correo electrónico:</div>
              <q-input color="accent" rounded outlined v-model="correoelectronico">
                <template v-slot:append>
                  <q-icon name="mail" color="accent" />
                </template>
              </q-input>
            </div>

            <div class="row q-col-gutter-md" >
              <div class="col-12 col-sm-6" :style="paddingslide2">
                <div class="text-accent text-weight-bold text-md text-sm">Ingrese su contraseña:</div>
                <q-input color="accent" rounded outlined v-model="password" :type="showPassword ? 'text' : 'password'">
                  <template v-slot:append>
                    <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" color="accent" class="cursor-pointer"
                      @click="togglePassword" />
                  </template>
                </q-input>
              </div>

              <div class="col-12 col-sm-6" :style="paddingslide2">
                <div class="text-accent text-weight-bold text-md text-sm">Confirme su contraseña:</div>
                <q-input color="accent" rounded outlined v-model="checkpassword" :type="confirmshowPassword ? 'text' : 'password'">
                  <template v-slot:append>
                    <q-icon :name="confirmshowPassword ? 'visibility' : 'visibility_off'" color="accent" class="cursor-pointer"
                      @click="confirmtogglePassword" />
                  </template>
                </q-input>
              </div>
            </div>
            <!-- Botón Crear Cuenta -->
            <div class="q-mt-md q-mb-md text-center">
              <q-btn label="Crear cuenta" color="positive" rounded  @click="crearCuenta" />
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-page>
</template>


<script setup>
import { ref, computed, watch } from "vue";
import { useQuasar } from "quasar";
import crearcuenta from 'src/assets/crearcuenta.png';
import { departamentosConMunicipios } from 'src/components/ColeccionDepart.js'

const nombreusuario = ref("");
const edad = ref(16);
const telefono = ref("");
const departamento = ref(null);
const municipio = ref(null);
const complementodireccion = ref("");
const correoelectronico = ref("");
const password = ref("");
const checkpassword = ref("");
const aboutme = ref("");
const adopt = ref("");
const slide = ref("slide1");
const $q = useQuasar();
const showNotify = ref(false);
const showPassword = ref(false);
const confirmshowPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value; // Cambia el estado entre true y false
};
const confirmtogglePassword = () => {
  confirmshowPassword.value = !confirmshowPassword.value; // Cambia el estado entre true y false
};
const crearCuenta = () => {
  showNotify.value = true;

  // Mostrar notificación de éxito
  $q.notify({
    color: 'green',
    position: 'bottom-right',
    icon: 'check_circle',
    message: 'Cuenta creada exitosamente',
    timeout: 1000 // Tiempo que se mostrará la notificación (en milisegundos)
  });
};

const optionsdep = departamentosConMunicipios.map(d => d.nombre);
const optionsmun = computed(() => {
  const selectedDept = departamentosConMunicipios.find(d => d.nombre === departamento.value);
  return selectedDept ? selectedDept.municipios : [];
});
watch(departamento, () => {
  municipio.value = null;  // Limpiar el municipio al seleccionar un nuevo departamento
});



// Detecta si es móvil o tablet para cambiar el diseño
const rowClass = computed(() => ($q.screen.lt.md ? "column" : "row"));

// Computada para cambiar el estilo de la imagen
const imgStyle = computed(() => {
  if ($q.screen.lt.sm) {
    // Para tamaños xs o sm, max-width será 70%
    return { maxWidth: '80%', height: 'auto', objectFit: 'contain', margin: 'auto' };
  } else if ($q.screen.lt.md) {
    // Para tamaños md, max-width será 50%
    return { maxWidth: '80%', height: 'auto', objectFit: 'contain', margin: 'auto'  };
  } else {
    // Para tamaños grandes, max-width será 100%
    return { maxWidth: '100%', height: 'auto', objectFit: 'contain', margin: 'auto' };
  }
});
const tamañopantalla = computed(() => {
  if ($q.screen.lt.sm) {
    // Para tamaños xs o sm, fontSize será 30px
    return { fontSize: '35px', margin: '30px 0px 0px 0px' };
  } else if ($q.screen.lt.md) {
    // Para tamaños md, fontSize será 45px
    return { fontSize: '45px' };
  } else {
    // Para tamaños grandes, no se aplica un cambio de tamaño
    return { fontSize: '' }; // Deja el valor predeterminado si es mayor a md
  }
});

const customecolumnslide1 = computed(() => {
  if ($q.screen.lt.sm) {
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

</script>
