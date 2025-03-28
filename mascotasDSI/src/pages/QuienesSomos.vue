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
    </div>
  </div>
</template>

<script>
export default {
  name: 'MiComponente'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orelega+One&display=swap');

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

/* Ajustes responsive */
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
    background-size: auto 95%; /* Ajuste especial para móviles */
    background-position: 60% center;
  }
  
  .family-image {
    max-height: 600px;
  }
  
  .logo-image {
    max-width: 90%; /* Hace la imagen más ancha */
    height: auto; /* Mantiene la proporción */
    bottom: -110px; /* Baja un poco más la imagen */
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
    max-width: 95%; /* Aún más ancha en pantallas más pequeñas */
    bottom: -130px; /* Baja un poco más */
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
    background-size: auto 98%; /* Más zoom para móviles pequeños */
    background-position: 70% center;
  }
  
  .logo-image {
    max-width: 100%; /* Ocupará casi todo el ancho */
    bottom: -75px; /* Se baja más */
  }
  
  .main-content {
    margin-top: 75px;
  }
  
  .family-image {
    max-height: 450px;
  }
  
  .info-card {
    padding: 12px;
    margin-top: -30px; /* Sube más la card en pantallas más pequeñas */
  }
  
  .card-content p {
    font-size: 0.85rem;
  }
  
  .spacer {
    height: 30px;
}
}
</style>