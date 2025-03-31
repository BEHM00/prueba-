<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="contact-card q-pa-lg" flat bordered>
      <q-card-section>
        <div class="text-h5 text-center q-mb-md">Contáctanos</div>

        <q-form 
          @submit.prevent="submitForm" 
          ref="formRef" 
          class="q-gutter-md"
        >
          <q-input
            v-model.trim="form.name"
            label="Nombre completo"
            filled
            :rules="[ 
              val => !!val || 'El nombre es requerido',
              val => val.length >= 2 || 'El nombre debe tener al menos 2 caracteres'
            ]"
          />
          
          <q-input
            v-model.trim="form.email"
            label="Correo electrónico"
            type="email"
            filled
            :rules="[ 
              val => !!val || 'El correo es requerido',
              val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Correo electrónico inválido'
            ]"
          />
          
          <q-input
            v-model.trim="form.subject"
            label="Asunto"
            filled
            :rules="[val => !!val || 'El asunto es requerido']"
          />
          
          <q-input
            v-model.trim="form.message"
            label="Mensaje"
            type="textarea"
            filled
            :rules="[ 
              val => !!val || 'El mensaje es requerido',
              val => val.length >= 10 || 'El mensaje debe tener al menos 10 caracteres'
            ]"
          />

          <q-btn 
            label="Enviar" 
            type="submit" 
            color="primary" 
            class="full-width" 
            :loading="isSubmitting"
          />
        </q-form>

        <q-banner 
          v-if="submitStatus === 'success'" 
          class="bg-green-3 text-black q-mt-md" 
          dense
        >
          ¡Tu mensaje ha sido enviado con éxito!
        </q-banner>

        <q-banner 
          v-if="submitStatus === 'error'" 
          class="bg-red-3 text-black q-mt-md" 
          dense
        >
          ¡Hubo un error al enviar tu mensaje. Inténtalo nuevamente!
        </q-banner>
        <div ref="animationContainer" class="animation-container"></div>
      </q-card-section>
    </q-card>
  </q-page>
  <FloatingFeedbackBtn />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import lottie from 'lottie-web';
import animationData from '../assets/Animation - 1742937049224.json';
import FloatingFeedbackBtn from 'src/components/FloatingFeedbackBtn.vue'; 

// Declaración de la variable animationContainer solo una vez
const animationContainer = ref(null);

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const formRef = ref(null);
const $q = useQuasar();
const isSubmitting = ref(false);
const submitStatus = ref(null);

onMounted(() => {
  lottie.loadAnimation({
    container: animationContainer.value,
    animationData: animationData,
    loop: true,
    autoplay: true,
  });
});

const submitContactForm = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    return true
  } catch {
    return false
  }
}

const submitForm = async () => {
  const isValid = await formRef.value.validate()
  
  if (isValid) {
    isSubmitting.value = true
    submitStatus.value = null

    try {
      const success = await submitContactForm()
      
      if (success) {
        submitStatus.value = 'success'
        
        formRef.value.reset()
        Object.keys(form).forEach(key => form[key] = '')
        
        $q.notify({
          type: 'positive',
          message: 'Mensaje enviado exitosamente',
          position: 'top'
        })
      } else {
        submitStatus.value = 'error'
        $q.notify({
          type: 'negative',
          message: 'Error al enviar el mensaje',
          position: 'top'
        })
      }
    } catch {
      submitStatus.value = 'error'
      $q.notify({
        type: 'negative',
        message: 'Error de red. Inténtalo de nuevo.',
        position: 'top'
      })
    } finally {
      isSubmitting.value = false
      
      setTimeout(() => {
        submitStatus.value = null
      }, 3000)
    }
  }
}
</script>

<style scoped>
.contact-card {
  width: 100%;
  max-width: 500px;
  background: #fffdf5;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.animation-container {
  width: 200px;
  height: 200px;
  margin: 20px;
}
</style>
