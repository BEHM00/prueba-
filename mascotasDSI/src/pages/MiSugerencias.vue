<template>
  <!-- Botón flotante arrastrable  en toda la pantalla  -->
  <div
    ref="floatingBtn"
    class="floating-btn-container"
    :style="btnStyle"
    @mousedown="startBtnDrag"
    @click="handleBtnClick"
  >
    <q-btn 
      fab 
      icon="pets" 
      style="background-color: #FCCA73; color: white"   
      class="non-draggable-btn"
    />
  </div>

  <!-- Modal arrastrable -->
  <q-dialog v-model="modalVisible" persistent>
    <div 
      class="dialog-container"
      :style="modalStyle"
      @mousedown="startModalDrag"
    >
      <q-card class="draggable-modal">
        <q-card-section class="modal-header cursor-move">
          <div class="text-h6">Sugerencias y Comentarios</div>
          <q-btn flat round dense style="color: white" icon="close" @click="cerrarModal" />
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="razon"
            :options="opcionesRazon"
            label="Selecciona una razón"
            outlined
            class="q-mb-md"
          />

          <div class="flex justify-center q-mb-md">
            <q-icon name="pets" size="xl" style="color: #333333" />
          </div>

          <q-input
            v-model="comentario"
            label="Comentario"
            type="textarea"
            outlined
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" style="color: #FF5252" @click="cerrarModal" />
          <q-btn label="Enviar" style="background-color: #2196F3; color: white" @click="enviarComentario" />
        </q-card-actions>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup>
import { ref, reactive, onUnmounted } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const floatingBtn = ref(null);

// Estado del modal
const modalVisible = ref(false);
const razon = ref(null);
const comentario = ref('');
const opcionesRazon = ref(['Sugerencia', 'Comentario']);

// Estado para el arrastre del botón
const btnDrag = reactive({
  isDragging: false,
  startX: 0,
  startY: 0,
  posX: 20,
  posY: window.innerHeight * 0.3
});

const btnStyle = reactive({
  position: 'fixed',
  right: `${btnDrag.posX}px`,
  bottom: `${btnDrag.posY}px`,
  zIndex: 6000,
  cursor: 'move'
});

// Estado para el arrastre del modal
const modalDrag = reactive({
  isDragging: false,
  startX: 0,
  startY: 0,
  posX: 0,
  posY: 0
});

const modalStyle = reactive({
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 7000,
  cursor: 'auto'
});

// Variables para controlar el clic en el botón
let btnClickAllowed = true;
let btnDragDistance = 0;
const DRAG_THRESHOLD = 5;

const startBtnDrag = (e) => {
  btnDrag.isDragging = true;
  btnDrag.startX = e.clientX;
  btnDrag.startY = e.clientY;
  btnStyle.cursor = 'grabbing';
  btnClickAllowed = true;
  btnDragDistance = 0;
  
  document.addEventListener('mousemove', moveBtn);
  document.addEventListener('mouseup', stopBtnDrag);
};

const moveBtn = (e) => {
  if (!btnDrag.isDragging) return;
  
  const dx = e.clientX - btnDrag.startX;
  const dy = e.clientY - btnDrag.startY;
  
  btnDragDistance = Math.sqrt(dx * dx + dy * dy);
  
  if (btnDragDistance > DRAG_THRESHOLD) {
    btnClickAllowed = false;
  }
  
  btnDrag.posX = Math.max(0, Math.min(window.innerWidth - 56, btnDrag.posX - dx));
  btnDrag.posY = Math.max(0, Math.min(window.innerHeight - 56, btnDrag.posY - dy));
  
  btnDrag.startX = e.clientX;
  btnDrag.startY = e.clientY;
  
  btnStyle.right = `${btnDrag.posX}px`;
  btnStyle.bottom = `${btnDrag.posY}px`;
};

const stopBtnDrag = () => {
  btnDrag.isDragging = false;
  btnStyle.cursor = 'move';
  
  document.removeEventListener('mousemove', moveBtn);
  document.removeEventListener('mouseup', stopBtnDrag);
};

const handleBtnClick = () => {
  if (btnClickAllowed && btnDragDistance <= DRAG_THRESHOLD) {
    abrirModal();
  }
};

// Métodos para el modal
const abrirModal = () => {
  modalVisible.value = true;
  setTimeout(centrarModal, 0);
};

const centrarModal = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  modalDrag.posX = (windowWidth - 400) / 2;
  modalDrag.posY = (windowHeight - 500) / 2;
  
  updateModalPosition();
};

const startModalDrag = (e) => {
  if (e.target.closest('button') || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('label')) {
    return;
  }
  
  modalDrag.isDragging = true;
  modalDrag.startX = e.clientX;
  modalDrag.startY = e.clientY;
  modalStyle.cursor = 'grabbing';
  
  document.addEventListener('mousemove', moveModal);
  document.addEventListener('mouseup', stopModalDrag);
};

const moveModal = (e) => {
  if (!modalDrag.isDragging) return;
  
  const dx = e.clientX - modalDrag.startX;
  const dy = e.clientY - modalDrag.startY;
  
  modalDrag.posX += dx;
  modalDrag.posY += dy;
  
  modalDrag.posX = Math.max(0, Math.min(modalDrag.posX, window.innerWidth - 400));
  modalDrag.posY = Math.max(0, Math.min(modalDrag.posY, window.innerHeight - 500));
  
  modalDrag.startX = e.clientX;
  modalDrag.startY = e.clientY;
  
  updateModalPosition();
};

const stopModalDrag = () => {
  modalDrag.isDragging = false;
  modalStyle.cursor = 'move';
  
  document.removeEventListener('mousemove', moveModal);
  document.removeEventListener('mouseup', stopModalDrag);
};

const updateModalPosition = () => {
  modalStyle.left = `${modalDrag.posX}px`;
  modalStyle.top = `${modalDrag.posY}px`;
  modalStyle.transform = 'none';
};

const enviarComentario = () => {
  if (!razon.value || !comentario.value) {
    $q.notify({
      type: 'negative',
      message: 'Por favor completa todos los campos'
    });
    return;
  }
  
  $q.notify({
    type: 'positive',
    message: '¡Gracias por tus comentarios!'
  });
  
  cerrarModal();
};

const cerrarModal = () => {
  modalVisible.value = false;
  razon.value = null;
  comentario.value = '';
};

// Limpieza
onUnmounted(() => {
  document.removeEventListener('mousemove', moveBtn);
  document.removeEventListener('mouseup', stopBtnDrag);
  document.removeEventListener('mousemove', moveModal);
  document.removeEventListener('mouseup', stopModalDrag);
});
</script>

<style scoped>
.floating-btn-container {
  width: 56px;
  height: 56px;
}

.dialog-container {
  width: 400px;
  max-width: 90vw;
}

.draggable-modal {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FCCA73; /*color adrnto en el modal  sugerencias y comentarios */
  color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 12px 16px;
}

.cursor-move {
  cursor: move;
}

.cursor-move:active {
  cursor: grabbing;
}

.draggable-modal * {
  user-select: none;
  -webkit-user-select: none;
}

.draggable-modal input,
.draggable-modal textarea {
  user-select: text;
  -webkit-user-select: text;
  cursor: text;
}

.non-draggable-btn {
  pointer-events: none;
}
</style>