<template>
  <q-toolbar class="custom-toolbar">
    <div class="toolbar-content">
      <div class="image-container">
        <div class="image-wrapper">
          <img src="../assets/msinfondo.png" alt="Imagen Principal" class="custom-image"/>
        </div>
        <div class="letrero-wrapper">
          <img src="../assets/letrero.png" alt="Letrero" class="custom-letrero"/>
        </div>
      </div>
      <q-card class="custom-card">
        <q-card-section>
          <div class="q-pa-md">
            <p>
              Somos una plataforma dedicada a conectar mascotas en busca de un hogar con personas dispuestas a brindarles amor y cuidado. 
              Creemos que cada animal merece una segunda oportunidad y trabajamos para hacer posible que encuentren una familia que los ame y proteja.
            </p>
            <p>
              Facilitamos el proceso de adopción de manera segura y accesible, brindando a los adoptantes toda la información necesaria para tomar una decisión responsable.
            </p>
            <p>
              Además, apoyamos a dueños que, por diversas razones, necesitan encontrar un nuevo hogar para sus mascotas. 
            </p>
            <p>
              Más que una plataforma, somos una comunidad comprometida con el respeto, la empatía y el amor por los animales.
            </p>
          </div>
          <!-- Imagen al lado derecho de la tarjeta -->
          <img src="../assets/fam.png" alt="Familia" class="custom-fam"/>
        </q-card-section>
      </q-card>
    </div>
  </q-toolbar>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orelega+One&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  overflow-x: hidden !important; /* Bloquea el scroll horizontal */
  overflow-y: auto; /* Permite scroll vertical normal */
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-toolbar {
  background-color: #fcca73;
  color: #3c261b;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  width: 100%;
}

.toolbar-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 100vw; /* Evita que se expanda fuera del viewport */
  overflow: hidden;
}

/* Contenedor principal */
.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh; /* Asegura que el contenedor ocupe al menos toda la altura de la pantalla */
  position: relative;
}

/* Imagen msinfondo */
.image-wrapper {
  margin-top: 385px; /* Baja la imagen */
  position: relative;
  z-index: 1;
}

/* Imagen letrero */
.letrero-wrapper {
  position: relative;
  z-index: -1;
  margin-top: -130px; /* Sube el letrero */
}

.letrero-wrapper::before {
  content: '';
  background-image: url('../assets/fondoQS.png');
  background-size: cover; /* Hace que la imagen de fondo cubra todo el área */
  background-position: center center; /* Centra la imagen de fondo */
  background-repeat: no-repeat;
  position: fixed; /* Usa fixed para que el fondo cubra toda la pantalla */
  top: 0;
  left: -120px;
  width: 148vw; /* Ocupa todo el ancho de la pantalla */
  height: 100vh; /* Ocupa toda la altura de la pantalla */
  z-index: -1;
  opacity: 0.2; /* Opacidad para que el fondo no sea demasiado fuerte */
}

.custom-image {
  width: 700px;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

.custom-letrero {
  width: 700px;
  max-width: 100%;
  height: auto;
  display: block;
}

/* Estilos para la Card */
.custom-card {
  background-color: rgba(252, 202, 115, 0.7);
  width: 90%;
  max-width: 700px;
  position: absolute;
  z-index: 2;
  top: 290px; /* Ajustado para que no se monte sobre la imagen */
  left: 200px;
  transform: none;
  padding: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.7); /* Agrega una sombra */
}

/* Fuente y tamaño de texto */
.q-pa-md p {
  font-family: 'Orelega One', cursive;
  font-size: 20px;
  line-height: 1.4;
  margin-bottom: 20px;
  text-align: justify;
}

/* Estilos para la imagen fam.web */
.custom-fam {
  position: absolute;
  top: 53%; /* Centra verticalmente */
  right: -800px; /* Mueve la imagen fuera de la tarjeta hacia la derecha */
  transform: translateY(-50%); /* Ajusta el centrado vertical */
  width: 700px; /* Ajusta el tamaño de la imagen */
  height: 410px;
  z-index: 3; /* Asegura que la imagen esté sobre la tarjeta */
   box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.7); /* Agrega una sombra */
}
</style>