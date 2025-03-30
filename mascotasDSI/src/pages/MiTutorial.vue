<template>
  <div class="new-page-container">
    <div class="main-content">
      <div class="intro-section">
        <h1 class="main-title">¿CÓMO FUNCIONA?</h1>
        <p class="main-description">
          ¡Sigue estos pasos para adoptar o dar en adopción una mascota!
          Nuestra app web te ayuda a conectar con personas que buscan adoptar
          o dar en adopción mascotas de forma rápida, segura y responsable.
        </p>
      </div>
      
      <div class="cards-section">
        <div class="cards-container">
          <!-- Card 1 -->
          <q-card class="feature-card card-1">
            <q-card-section class="card-content">
              <div class="image-container">
                <img src="../assets/login.png" alt="Login" class="card-image">
              </div>
              <h3 class="card-text">INICIA SESIÓN</h3>
            </q-card-section>
          </q-card>

          <!-- Card 2 -->
          <q-card class="feature-card card-2">
            <q-card-section class="card-content">
              <div class="image-container">
                <img src="../assets/opciones.png" alt="Opciones" class="card-image">
              </div>
              <h3 class="card-text">SELECCIONA</h3>
            </q-card-section>
          </q-card>

          <!-- Card 3 -->
          <q-card class="feature-card card-3">
            <q-card-section class="card-content">
              <div class="image-container">
                <img src="../assets/lista.png" alt="Lista" class="card-image">
              </div>
              <h3 class="card-text">LLENA LOS REQUISITOS</h3>
            </q-card-section>
          </q-card>

          <!-- Card 4 -->
          <q-card class="feature-card card-4">
            <q-card-section class="card-content">
              <div class="image-container">
                <img src="../assets/reloj.png" alt="Reloj" class="card-image">
              </div>
              <h3 class="card-text">ESPERA TU RESPUESTA</h3>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="ready-section">
        <img src="../assets/listo.png" alt="Listo" class="ready-image">
        <div class="ready-text-content">
          <h3 class="ready-text">¡LISTO! ESTÁS A PUNTO DE CAMBIAR UNA VIDA</h3>
          <p class="ready-description">
            Una vez completados estos pasos, estarás listo para vivir esta hermosa experiencia de adopción.
            Recuerda que al adoptar estás dando una segunda oportunidad a un ser que te amará incondicionalmente.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewPage'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orelega+One&family=Libre+Franklin:wght@400;500;600&display=swap');

.new-page-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background-color: #f9f5f0;
}

.new-page-container::before {
  content: "";
  background-image: url('../assets/fondoQS.png');
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  opacity: 0.15;
  background-size: cover;
  background-position: center;
}

.main-content {
  position: relative;
  z-index: 1;
  flex-grow: 1;
  padding: 40px 0;
}

.intro-section {
  width: 90%;
  max-width: 800px;
  margin: 0 auto 60px;
  text-align: center;
  padding: 0 20px;
}

.main-title {
  font-family: 'Orelega One', cursive;
  font-size: 2.8rem;
  color: #3C261B;
  margin-bottom: 20px;
  line-height: 1.2;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
  animation: fadeInDown 1s ease both;
}

.main-description {
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1.1rem;
  color: #3C261B;
  line-height: 1.6;
  opacity: 0.9;
  animation: fadeIn 1.5s ease both;
}

.cards-section {
  width: 100%;
  padding: 0 20px;
  margin-bottom: 0;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  width: 250px;
  height: 350px;
  border-radius: 20px !important;
  overflow: hidden;
  transition: all 0.5s ease;
  position: relative;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  margin: 10px;
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255,255,255,0.3);
  animation: cardEntrance 0.8s ease-out both;
}

.feature-card:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
  z-index: 2;
}

.feature-card:hover .card-image {
  transform: scale(1.1) rotate(5deg);
}

.feature-card:hover .card-text {
  text-shadow: 0 0 8px rgba(0,0,0,0.5);
}

.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  text-align: center;
}

.card-1 {
  background-color: #8D3527;
  animation-delay: 0.2s;
}

.card-2 {
  background-color: #FCCA73;
  animation-delay: 0.4s;
}

.card-3 {
  background-color: #8D3527;
  animation-delay: 0.6s;
}

.card-4 {
  background-color: #FCCA73;
  animation-delay: 0.8s;
}

.image-container {
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  overflow: hidden;
}

.card-2 .image-container {
  height: 400px;
  align-items: flex-start;
}

.card-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: all 0.5s ease;
  animation: float 3s ease-in-out infinite;
}

.card-1 .card-image{
  transform: scale(1.3);
  animation: float 3s ease-in-out infinite, pulse 2s ease infinite;
}

.card-2 .card-image {
  transform: scale(4.5);
  margin-top: 0;
  margin-bottom: 30px;
  animation: float 3.5s ease-in-out infinite;
}

.card-3 .card-image {
  animation: float 4s ease-in-out infinite;
}

.card-4 .card-image {
  animation: float 3.2s ease-in-out infinite;
}

.card-text {
  font-family: 'Orelega One', cursive;
  font-size: 1.4rem;
  font-weight: 600;
  color: white;
  margin: 0;
  transition: all 0.3s ease;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5), 
              -1px -1px 0 rgba(0,0,0,0.3),
              1px -1px 0 rgba(0,0,0,0.3),
              -1px 1px 0 rgba(0,0,0,0.3);
}

.card-3 .card-text,
.card-4 .card-text {
  font-size: 1.1rem;
}

.ready-section {
  text-align: center;
  margin: -280px auto 30px;
  max-width: 700px;
  padding: 0 20px;
  position: relative;
  z-index: 10;
}

.ready-image {
  width: 430px;
  max-width: 90%;
  height: auto;
  margin-bottom: 5px;
  transition: transform 0.3s ease;
  animation: bounce 2s ease infinite;
}

.ready-image:hover {
  transform: scale(1.05);
}

.ready-text-content {
  margin-top: -300px;
  animation: fadeInUp 1s ease both;
}

.ready-text {
  font-family: 'Orelega One', cursive;
  font-size: 1.8rem;
  color: #3C261B;
  margin-bottom: 10px;
  animation: textGlow 2s ease infinite alternate;
}

.ready-description {
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1.1rem;
  color: #3C261B;
  line-height: 1.6;
  margin-top: 0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 0.9; }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1.3);
  }
  50% {
    transform: scale(1.35);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes textGlow {
  from {
    text-shadow: 0 0 5px rgba(60, 38, 27, 0.3);
  }
  to {
    text-shadow: 0 0 15px rgba(60, 38, 27, 0.7);
  }
}

@media (max-width: 992px) {
  .cards-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 600px;
  }
  
  .feature-card {
    width: 100%;
    height: 320px;
    margin: 0;
  }
  
  .image-container {
    height: 160px;
  }
  
  .card-2 .image-container {
    height: 180px;
  }
  
  .ready-section {
    margin: -200px auto 30px;
  }
  
  .ready-image {
    width: 350px;
  }

  .ready-text-content {
    margin-top: -250px;  
  }
}

@media (max-width: 576px) {
  .main-title {
    font-size: 2.2rem;
  }

  .cards-container {
    grid-template-columns: 1fr;
    max-width: 300px;
  }
  
  .feature-card {
    height: 300px;
  }
  
  .card-2 .image-container {
    height: 170px;
  }
  
  .ready-section {
    margin: -150px auto 20px;
  }

  .ready-text-content {
    margin-top: 2px;
  }
  
  .ready-image {
    width: 280px;
    margin-top: -220;
  }
  
  .ready-text {
    font-size: 1.5rem;
    margin-top: -150px;
  }
  
  .ready-description {
    font-size: 1rem;
  }
}
</style>