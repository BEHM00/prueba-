<template>
  <div class="page-container">
    <!-- Toolbar con fondo amarillo -->
    <q-toolbar class="custom-toolbar">
      <div class="toolbar-content">
        <img src="../assets/msinfondo.png" alt="Logo" class="logo-image"/>
      </div>
    </q-toolbar>

    <!-- Contenido principal -->
    <div class="main-content">
      <div class="content-wrapper">
        <q-card class="info-card">
          <q-card-section>
            <div class="card-content">
              <p>
                Somos una plataforma dedicada a conectar mascotas en busca de un hogar con personas dispuestas a brindarles amor y cuidado. 
                Creemos que cada animal merece una segunda oportunidad y trabajamos para hacer posible que encuentren una familia que los ame y proteja.
              </p>
              <p>
                Facilitamos el proceso de adopción de manera segura y accesible, brindando a los adoptantes toda la información necesaria para tomar una decisión responsable. 
                Nos enfocamos en promover la adopción como la mejor alternativa para darle un hogar a quienes más lo necesitan, reduciendo el abandono y fomentando el bienestar animal.
              </p>
              <p>
                Además, apoyamos a dueños que, por diversas razones, necesitan encontrar un nuevo hogar para sus mascotas. Entendemos que cada caso es único y buscamos asegurar que la transición sea lo más amable
                y segura posible tanto para los animales como para sus futuras familias.
                Más que una plataforma, somos una comunidad comprometida con el respeto, la empatía y el amor por los animales. Creemos que juntos podemos hacer la diferencia y construir un mundo donde cada mascota tenga
                el hogar que merece.
              </p>
            </div>
          </q-card-section>
        </q-card>

        <!-- Espacio aumentado entre card e imagen -->
        <div class="spacer"></div>

        <img src="../assets/fam.png" alt="Familia" class="family-image"/>
      </div>

      <!-- Sección del título y párrafo -->
      <div class="title-section">
        <h1 class="main-title">Creando Lazos de Amor y Cuidado</h1>
        <p class="main-paragraph">Representa el compromiso de construir relaciones basadas en respeto, empatía y solidaridad, fomentando un entorno donde el amor y el cuidado guíen nuestras acciones para promover el bienestar colectivo y el crecimiento humano.</p>
      </div>

      <!-- Sección de las 4 cards -->
      <div class="cards-container">
        <div class="cards-row">
          <!-- Card 1 -->
          <q-card class="feature-card card-1">
            <q-card-section>
              <h2 class="card-title">Compromisos</h2>
              <q-card-section class="card-description">
                <div class="etiqueta-item">
                  <img src="../assets/etiqueta.png" alt="Etiqueta" class="etiqueta-icon">
                  <p>Garantizar procesos de adopción seguros y confiables.</p>
                </div>
                <div class="etiqueta-item">
                  <img src="../assets/etiqueta.png" alt="Etiqueta" class="etiqueta-icon">
                  <p>Fomentar la adopción responsable y evitar el abandono.</p> 
                </div>
                <div class="etiqueta-item">
                  <img src="../assets/etiqueta.png" alt="Etiqueta" class="etiqueta-icon">
                  <p>Brindar apoyo y orientación a adoptantes y dueños en situaciones difíciles.</p> 
                </div>
                <div class="etiqueta-item">
                  <img src="../assets/etiqueta.png" alt="Etiqueta" class="etiqueta-icon">
                  <p>Sensibilizar a la comunidad sobre la importancia del bienestar animal.</p>
                </div>
                <div class="etiqueta-item">
                  <img src="../assets/etiqueta.png" alt="Etiqueta" class="etiqueta-icon">
                  <p>Seguir innovando y mejorando nuestra plataforma para ayudar a más mascotas.</p>  
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>

          <!-- Card 2 con imagen a la izquierda -->
          <q-card class="feature-card card-2">
            <q-card-section>
              <h2 class="card-title">Misión</h2>
              <p class="card-description">Conectar mascotas en busca de un hogar con personas dispuestas a brindarles amor y cuidado. 
                Nos enfocamos en facilitar el proceso de adopción de manera segura y responsable, promoviendo el bienestar animal y
                fomentando una cultura de respeto y empatía hacia todas las especies.</p>
              <div class="image-container left-image">
                <img src="../assets/mascota1.png" alt="Mascota 1" class="card-image">
              </div>
            </q-card-section>
          </q-card>

          <!-- Card 3 con imagen a la derecha -->
          <q-card class="feature-card card-3">
            <q-card-section>
              <h2 class="card-title">Visión</h2>
              <p class="card-description">Ser la plataforma líder en adopción de mascotas, generando un impacto positivo en la reducción
                del abandono y promoviendo hogares responsables y amorosos. Buscamos construir una comunidad comprometida con el bienestar 
                animal, donde cada mascota tenga la oportunidad de vivir en un entorno seguro y lleno de amor.</p>
              <div class="image-container right-image">
                <img src="../assets/mascota2.png" alt="Mascota 2" class="card-image">
              </div>
            </q-card-section>
          </q-card>

          <!-- Card 4 -->
          <q-card class="feature-card card-4">
            <q-card-section>
              <h2 class="card-title">Valores</h2>
              <q-card-section class="card-description">
                <div class="etiqueta-item">
                  <img src="../assets/etiqueta.png" alt="Etiqueta" class="etiqueta-icon">
                  <p>Compromiso: Trabajamos con dedicación para mejorar la vida de los animales.</p>
                </div>
                <div class="etiqueta-item">
                  <img src="../assets/etiqueta.png" alt="Etiqueta" class="etiqueta-icon">
                  <p>Empatía: Entendemos las necesidades tanto de las mascotas como de las personas.</p> 
                </div>
                <div class="etiqueta-item">
                  <img src="../assets/etiqueta.png" alt="Etiqueta" class="etiqueta-icon">
                  <p>Responsabilidad: Promovemos adopciones conscientes y hogares seguros.</p> 
                </div>
                <div class="etiqueta-item">
                  <img src="../assets/etiqueta.png" alt="Etiqueta" class="etiqueta-icon">
                  <p>Transparencia: Brindamos información clara y confiable en cada proceso de adopción.</p>
                </div>
                <div class="etiqueta-item">
                  <img src="../assets/etiqueta.png" alt="Etiqueta" class="etiqueta-icon">
                  <p>Colaboración: Creemos en el trabajo en equipo con rescatistas, refugios y adoptantes.</p>  
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MiComponente'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orelega+One&family=Libre+Franklin:wght@400;500;600&display=swap');

.page-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* Fondo de pantalla FULLY RESPONSIVE */
.page-container::before {
  content: "";
  background-image: url('../assets/fondoQS.png');
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  opacity: 0.2;
  background-size: cover;
  background-position: center;
  
  /* Ajustes para desktop */
  background-size: cover;
  background-position: center;
  
  /* Ajustes específicos para móvil */
  @media (max-width: 768px) {
    background-size: auto 100%;
    background-position: center center;
  }
  
  /* Ajustes para tablets */
  @media (min-width: 769px) and (max-width: 1024px) {
    background-size: cover;
    background-position: 60% center;
  }
}

/* Toolbar con logo que sobresale */
.custom-toolbar {
  background-color: #fcca73;
  color: #3c261b;
  display: flex;
  justify-content: center;
  height: 100px;
  width: 100%;
  position: relative;
  overflow: visible;
  z-index: 2;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.toolbar-content {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.logo-image {
  position: absolute;
  height: 210px;
  width: auto;
  max-width: 80%;
  object-fit: contain;
  bottom: -130px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}

/* Contenido principal */
.main-content {
  margin-top: 60px;
  position: relative;
  z-index: 1;
  flex-grow: 1;
  padding-bottom: 40px;
}

.content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 85%;
  max-width: 1400px;
  margin: 40px auto;
  padding: 30px 0;
  flex-wrap: nowrap;
  gap: 20px;
}

/* Espacio entre card e imagen */
.spacer {
  width: 100%;
  height: 80px;
  display: none;
}

/* Card más grande */
.info-card {
  background-color: rgba(252, 202, 115, 0.95);
  width: 50%;
  min-width: 350px;
  text-align: justify;
  padding: 5fr;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  border-radius: 12px;
  margin-right: auto;
  margin-left: 0;
  max-height: 365px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.card-content {
  padding: 10px;
}

.card-content p {
  margin-bottom: 15px;
  font-size: 0.85rem;
  line-height: 1.5;
  font-family: 'Orelega One', cursive;
}

/* Imagen family más grande y con borde */
.family-image {
  width: 45%;
  min-width: 450px;
  max-width: 800px;
  height: auto;
  max-height: 800px;
  object-fit: contain;
  margin: 15px 0;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  align-self: flex-start;
  position: relative;
  z-index: 1;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

/* Sección del título y párrafo */
.title-section {
  width: 85%;
  max-width: 1000px;
  margin: 50px auto;
  text-align: center;
  padding: 0 20px;
}

.main-title {
  font-family: 'Orelega One', cursive;
  font-size: 4.0rem;
  color: #3C261B;
  margin-bottom: 20px;
  line-height: 1.2;
}

.main-paragraph {
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1.1rem;
  color: #3C261B;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

/* Sección de las 4 cards */
.cards-container {
  width: 100%;
  padding: 0 50px;
  margin: 40px auto;
  max-width: 1400px;
}

.cards-row {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  border-radius: 0;
  overflow: hidden;
}

.feature-card {
  flex: 1;
  min-width: 200px;
  margin: 0;
  border-radius: 12px !important;
  box-shadow: none;
  color: white;
  padding: 25px;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
  margin-right: -1px;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.card-title {
  font-size: 1.6rem !important;
  text-align: center !important;
  width: 100%;
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  font-family: 'Orelega One', cursive;
}

.card-1 .card-title {
  color: white !important;
}

.card-description {
  font-size: 0.85rem;
  line-height: 1.4;
  color: white !important;
  text-align: left;
  padding: 5px;
}

/* Estilos para las etiquetas */
.etiqueta-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
}

.etiqueta-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  margin-top: 3px;
  flex-shrink: 0;
}

.card-1 .etiqueta-icon {
  filter: brightness(0) invert(1);
}

/* Estilos para posicionamiento de imágenes */
.image-container {
  margin-top: 25px;
  width: 100%;
  display: flex;
}

.left-image {
  justify-content: flex-start;
  padding-left: 0;
  margin-left: -20px;
  margin-bottom: -20px;
  margin-top: 10px;
}

.right-image {
  justify-content: flex-end;
  padding-right: 0;
  margin-right: -20px;
  margin-bottom: -20px;
  margin-top: 10px;
}

.card-image {
  max-height: 200px;
  width: auto;
  object-fit: contain;
}

/* Colores específicos para cada card */
.card-1 {
  background-color: #FCCA73;
  color: #3C261B;
}

.card-2 {
  background-color: #8D3527;
}

.card-3 {
  background-color: #CE7C2A;
}

.card-4 {
  background-color: #3C261B;
}

/* Ajustes responsive para el título y párrafo */
@media (max-width: 1200px) {
  .title-section {
    width: 90%;
  }
  
  .main-title {
    font-size: 2.2rem;
  }
  
  .main-paragraph {
    font-size: 1rem;
  }
  
  .card-title {
    font-size: 1.4rem !important;
  }

  .card-image {
    max-height: 180px;
  }
  
  .etiqueta-icon {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 992px) {
  .main-title {
    font-size: 2rem;
  }
  
  .main-paragraph {
    font-size: 0.95rem;
  }
  
  .card-title {
    font-size: 1.3rem !important;
  }
  
  .card-image {
    max-height: 160px;
  }
  
  .left-image, .right-image {
    justify-content: center;
    padding: 0;
    margin-left: -10px;
    margin-right: -10px;
  }
  
  .etiqueta-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
}

@media (max-width: 768px) {
  
  .title-section {
    width: 95%;
    margin: 40px auto;
  }
  
  .main-title {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }
  
  .main-paragraph {
    font-size: 0.9rem;
  }
  
  .card-title {
    font-size: 1.2rem !important;
  }

  .card-image {
    max-height: 140px;
  }
  
  .etiqueta-item {
    margin-bottom: 6px;
  }
  
  .etiqueta-icon {
    width: 14px;
    height: 14px;
    margin-right: 6px;
  }
}

@media (max-width: 576px) {
  .main-title {
    font-size: 1.6rem;
  }
  
  .main-paragraph {
    font-size: 0.85rem;
    line-height: 1.5;
  }
  
  .card-title {
    font-size: 1.1rem !important;
  }

  .card-image {
    max-height: 120px;
  }
  
  .left-image, .right-image {
    margin-left: -5px;
    margin-right: -5px;
    margin-bottom: -15px;
  }
  
  .etiqueta-icon {
    width: 12px;
    height: 12px;
    margin-right: 5px;
  }
}

/* Ajustes responsive para las cards */
@media (max-width: 1200px) {
  .cards-container {
    padding: 0;
  }
  
  .feature-card {
    padding: 12px;
  }
}

@media (max-width: 992px) {
  .cards-row {
    flex-wrap: wrap;
  }
  
  .feature-card {
    flex: 1 1 50%;
    min-width: 50%;
  }
}

@media (max-width: 768px) {
  .cards-container {
    padding: 0 15px;
    margin: 40px auto;
  }
  
  .feature-card {
    flex: 1 1 100%;
    min-width: 100%;
    padding: 10px;
  }
  
  .card-description {
    font-size: 0.85rem;
  }
}

@media (max-width: 576px) {
  .cards-container {
    margin: 20px auto;
  }
  
  .feature-card {
    padding: 10px;
  }
}

/* Ajustes responsive existentes */
@media (max-width: 1600px) {
  .content-wrapper {
    width: 90%;
    max-width: 1200px;
    flex-wrap: wrap;
  }
}

@media (max-width: 1400px) {
  .content-wrapper {
    align-items: center;
  }
  
  .family-image {
    max-height: 750px;
  }
  
  .spacer {
    height: 70px;
  }
}

@media (max-width: 1200px) {
  .content-wrapper {
    width: 95%;
  }
  
  .family-image {
    max-height: 700px;
    min-width: 400px;
  }
  
  .info-card {
    width: 20%;
  }
}

@media (max-width: 992px) {
  .info-card, .family-image {
    width: 100%;
    max-width: 100%;
  }
  
  .info-card {
    max-height: none;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
  
  .family-image {
    max-height: 650px;
    margin-top: 40px;
    min-width: unset;
  }
  
  .spacer {
    height: 60px;
  }
}

@media (max-width: 768px) {
  .page-container::before {
    background-size: auto 95%;
    background-position: 60% center;
  }
  
  .family-image {
    max-height: 600px;
  }
  
  .logo-image {
    max-width: 90%;
    height: auto;
    bottom: -110px;
  }
  
  .info-card {
    width: 90%;
    padding: 20px;
  }
  
  .spacer {
    height: 50px;
  }
}

@media (max-width: 576px) {
  .content-wrapper {
    width: 95%;
    margin: 30px auto;
  }
  
  .logo-image {
    max-width: 95%;
    bottom: -130px;
  }
  
  .main-content {
    margin-top: 90px;
  }
  
  .family-image {
    max-height: 500px;
    min-width: 300px;
  }
  
  .info-card {
    width: 100%;
    padding: 15px;
  }
  
  .spacer {
    height: 40px;
  }
}

@media (max-width: 480px) {
  .page-container::before {
    background-size: auto 98%;
    background-position: 70% center;
  }
  
  .logo-image {
    max-width: 100%;
    bottom: -75px;
  }
  
  .main-content {
    margin-top: 75px;
  }
  
  .family-image {
    max-height: 450px;
  }
  
  .info-card {
    padding: 12px;
    margin-top: -30px;
  }
  
  .card-content p {
    font-size: 0.85rem;
  }
  
  .spacer {
    height: 30px;
  }
}
</style>