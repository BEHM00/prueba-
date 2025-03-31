<template>
  <div class="politicas-container">
    <header class="policy-header" v-animate-fade>
      <h1>Políticas de {{ appName }}</h1>
      <p class="mision">"{{ mision }}"</p>
    </header>

    <section class="policy-section" v-animate-slide-up>
      <h2>1. Nuestra Filosofía</h2>
      <p>{{ appName }} es una plataforma dedicada a conectar mascotas en busca de un hogar con personas dispuestas a brindarles amor y cuidado. Creemos que cada animal merece una segunda oportunidad.</p>
      
      <h3>Principios Fundamentales</h3>
      <ul class="principios">
        <li v-for="(principio, index) in principios" :key="'principio-'+index" v-animate-stagger="index">
          <i class="fas fa-paw"></i> {{ principio }}
        </li>
      </ul>
    </section>

    <section class="policy-section" v-animate-slide-up>
      <h2>2. Requisitos para Adoptar</h2>
      <ul class="requisitos">
        <li v-for="(requisito, index) in requisitos" :key="'requisito-'+index" v-animate-stagger="index">
          <i class="fas fa-check-circle"></i> {{ requisito }}
        </li>
      </ul>
    </section>

    <section class="policy-section" v-animate-slide-up>
      <h2>3. Política de Reubicación</h2>
      <p>Para dueños que necesitan reubicar a sus mascotas:</p>
      <div class="reubicacion">
        <div class="flip-card" v-for="(item, index) in politicaReubicacion" :key="'reubicacion-'+index" v-animate-stagger="index">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div class="card-content">
                <h3>{{ item.titulo }}</h3>
                <div class="paw-border"></div>
              </div>
            </div>
            <div class="flip-card-back">
              <div class="card-content">
                <p>{{ item.descripcion }}</p>
                <div class="paw-border"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="policy-section" v-animate-slide-up>
      <h2>4. Compromisos del Adoptante</h2>
      <ul class="compromisos">
        <li v-for="(compromiso, index) in compromisos" :key="'compromiso-'+index" v-animate-stagger="index">
          <i class="fas fa-heart"></i> {{ compromiso }}
        </li>
      </ul>
    </section>

    <!-- Botón flotante de feedback -->
    <FloatingFeedbackBtn />
  </div>
</template>

<script>
import FloatingFeedbackBtn from 'src/components/FloatingFeedbackBtn.vue';

export default {
  name: 'PoliticasPage',
  components: {
    FloatingFeedbackBtn
  },
  data() {
    return {
      appName: 'Adóptame SV',
      mision: 'Conectando mascotas con hogares amorosos para crear segundas oportunidades',
      principios: [
        'Respeto por la vida animal',
        'Transparencia en los procesos',
        'Responsabilidad en la tenencia',
        'Empatía hacia todas las partes',
        'Compromiso con el bienestar animal'
      ],
      requisitos: [
        'Ser mayor de 16 años',
        'Contar con espacio adecuado para la mascota',
        'Comprometerse a proveer cuidados veterinarios',
        'Tener capacidad económica para su mantenimiento',
        'No tener antecedentes de maltrato animal'
      ],
      politicaReubicacion: [
        {
          titulo: 'Verificación',
          descripcion: 'Validamos la información de la mascota y motivos de reubicación'
        },
        {
          titulo: 'Perfil Completo',
          descripcion: 'Requiere historial médico, comportamiento y necesidades especiales'
        },
        {
          titulo: 'Prohibición de Comercio',
          descripcion: 'No permitimos transacciones económicas por las mascotas'
        }
      ],
      compromisos: [
        'Proveer alimentación adecuada y atención veterinaria',
        'Brindar espacio, ejercicio y estimulación mental',
        'Mantener un ambiente libre de maltrato y negligencia',
        'Considerar a la mascota como un compromiso a largo plazo',
        'Notificar cualquier cambio de situación que afecte a la mascota'
      ]
    }
  },
  directives: {
    'animate-fade': {
      inserted: (el) => {
        el.style.opacity = 0
        setTimeout(() => {
          el.style.transition = 'opacity 0.8s ease'
          el.style.opacity = 1
        }, 100)
      }
    },
    'animate-slide-up': {
      inserted: (el) => {
        el.style.opacity = 0
        el.style.transform = 'translateY(30px)'
        setTimeout(() => {
          el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
          el.style.opacity = 1
          el.style.transform = 'translateY(0)'
        }, 200)
      }
    },
    'animate-stagger': {
      inserted: (el, binding) => {
        const delay = 100 + (binding.value * 100)
        el.style.opacity = 0
        el.style.transform = 'translateY(20px)'
        setTimeout(() => {
          el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`
          el.style.opacity = 1
          el.style.transform = 'translateY(0)'
        }, 200)
      }
    }
  }
}
</script>

<style scoped>
.politicas-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Arial', sans-serif;
  color: #0f0f0f;
  line-height: 1.6;
  box-sizing: border-box;
  position: relative;
}

.policy-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #000000;
  background: linear-gradient(135deg, #f5f7fa 0%, #FCCA73 100%);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.policy-header h1 {
  color: #070707;
  margin-bottom: 0.5rem;
  font-size: 2.2rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.mision {
  font-style: italic;
  color: #666;
  font-size: 1.1rem;
}

.policy-section {
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.policy-section:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.policy-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.policy-section:hover::before {
  transform: scaleX(1);
}

.policy-section h2 {
  color: #000000;
  margin-bottom: 1.2rem;
  font-size: 1.6rem;
  transition: color 0.3s ease;
  position: relative;
  display: inline-block;
}

.policy-section h2::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #2bb530, #ffbc04);
  transition: width 0.3s ease;
}

.policy-section:hover h2::after {
  width: 100px;
}

.policy-section:hover h2 {
  color: #2bb530;
}

.policy-section h3 {
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem 0;
}

.principios, .requisitos, .compromisos {
  list-style: none;
  padding-left: 0;
}

.principios li, .requisitos li, .compromisos li {
  margin-bottom: 0.8rem;
  padding-left: 2rem;
  position: relative;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.principios i, .requisitos i, .compromisos i {
  position: absolute;
  left: 0;
  color: #fc0303;
  transition: all 0.3s ease;
}

.principios li:hover, .requisitos li:hover, .compromisos li:hover {
  transform: translateX(5px);
  cursor: default;
}

.principios li:hover i {
  color: #2bb530;
  transform: rotate(15deg);
}

.requisitos li:hover i {
  color: #2bb530;
  transform: scale(1.2);
}

.compromisos li:hover i {
  color: #ff6b6b;
  transform: scale(1.2);
}

.reubicacion {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  perspective: 1000px;
}

.flip-card {
  background-color: transparent;
  height: 200px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.flip-card-front {
  background: linear-gradient(135deg, #ffbc04 0%, #ffbc04 100%);
  color: #333;
}

.flip-card-back {
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  color: #333;
  transform: rotateY(180deg);
}

.card-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.paw-border {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M30,15 Q40,5 50,15 Q60,5 70,15 Q75,25 65,30 Q75,35 70,45 Q60,55 50,45 Q40,55 30,45 Q25,35 35,30 Q25,25 30,15' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='1'/%3E%3C/svg%3E");
  background-size: 50px 50px;
  opacity: 0.5;
  border-radius: 10px;
  pointer-events: none;
}

.flip-card h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #2c3e50;
  position: relative;
  z-index: 2;
}

.flip-card p {
  font-size: 0.95rem;
  color: #2c3e50;
  position: relative;
  z-index: 2;
}

@media (max-width: 992px) {
  .politicas-container {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .politicas-container {
    padding: 1.5rem;
  }
  
  .policy-header h1 {
    font-size: 1.8rem;
  }
  
  .mision {
    font-size: 1rem;
  }
  
  .policy-section h2 {
    font-size: 1.4rem;
  }
  
  .policy-section h3 {
    font-size: 1.1rem;
  }
  
  .flip-card {
    height: 180px;
  }
}

@media (max-width: 576px) {
  .politicas-container {
    padding: 1rem;
  }
  
  .policy-header {
    margin-bottom: 1.5rem;
    padding: 1.5rem;
  }
  
  .policy-header h1 {
    font-size: 1.6rem;
  }
  
  .policy-section {
    padding: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .policy-section h2 {
    font-size: 1.3rem;
  }
  
  .principios li, .requisitos li, .compromisos li {
    font-size: 0.9rem;
    padding-left: 1.8rem;
  }
  
  .reubicacion {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .flip-card {
    height: 160px;
  }
}

@media (max-width: 400px) {
  .policy-header h1 {
    font-size: 1.4rem;
  }
  
  .policy-section h2 {
    font-size: 1.2rem;
  }
  
  .principios li, .requisitos li, .compromisos li {
    font-size: 0.85rem;
  }
  
  .flip-card {
    height: 150px;
  }
}
</style>