<template>
    <div class="politicas-container">
      <header class="policy-header">
        <h1>Políticas de {{ appName }}</h1>
        <p class="mision">"{{ mision }}"</p>
      </header>
  
      <section class="policy-section">
        <h2>1. Nuestra Filosofía</h2>
        <p>{{ appName }} es una plataforma dedicada a conectar mascotas en busca de un hogar con personas dispuestas a brindarles amor y cuidado. Creemos que cada animal merece una segunda oportunidad.</p>
        
        <h3>Principios Fundamentales</h3>
        <ul class="principios">
          <li v-for="principio in principios" :key="principio">
            <i class="fas fa-paw"></i> {{ principio }}
          </li>
        </ul>
      </section>
  
      <section class="policy-section">
        <h2>2. Proceso de Adopción</h2>
        <p>Facilitamos el proceso de adopción de manera segura y accesible:</p>
        
        <div class="proceso-adopcion">
          <div class="paso" v-for="(paso, index) in procesoAdopcion" :key="index">
            <span class="numero-paso">{{ index + 1 }}</span>
            <h3>{{ paso.titulo }}</h3>
            <p>{{ paso.descripcion }}</p>
          </div>
        </div>
      </section>
  
      <section class="policy-section">
        <h2>3. Requisitos para Adoptar</h2>
        <ul class="requisitos">
          <li v-for="(requisito, index) in requisitos" :key="index">
            <i class="fas fa-check-circle"></i> {{ requisito }}
          </li>
        </ul>
      </section>
  
      <section class="policy-section">
        <h2>4. Política de Reubicación</h2>
        <p>Para dueños que necesitan reubicar a sus mascotas:</p>
        <div class="reubicacion">
          <div class="card-politica" v-for="item in politicaReubicacion" :key="item.titulo">
            <h3>{{ item.titulo }}</h3>
            <p>{{ item.descripcion }}</p>
          </div>
        </div>
      </section>
  
      <section class="policy-section">
        <h2>5. Compromisos del Adoptante</h2>
        <ul class="compromisos">
          <li v-for="(compromiso, index) in compromisos" :key="index">
            <i class="fas fa-heart"></i> {{ compromiso }}
          </li>
        </ul>
      </section>
  
     
    </div>
  </template>
  
  <script>
  export default {
    name: 'PoliticasPage',
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
        procesoAdopcion: [
          {
            titulo: 'Registro y Perfil',
            descripcion: 'Completa tu perfil con información veraz sobre tu situación y experiencia con mascotas'
          },
          {
            titulo: 'Búsqueda Compatible',
            descripcion: 'Encuentra mascotas que se adapten a tu estilo de vida y capacidades'
          },
          {
            titulo: 'Entrevista',
            descripcion: 'Diálogo con la persona que entrega la mascota para evaluar compatibilidad'
          },
        
        
        ],
        requisitos: [
          'Ser mayor de 18 años',
          'Contar con espacio adecuado para la mascota',
          'Comprometerse a proveer cuidados veterinarios',
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
          'Considerar a la mascota como un compromiso a largo plazo'
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .politicas-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Arial', sans-serif;
    color: #0f0f0f;
    line-height: 1.6;
  }
  
  .policy-header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #000000;
  }
  
  .policy-header h1 {
    color: #070707;
    margin-bottom: 0.5rem;
  }
  
  .mision {
    font-style: italic;
    color: #666;
  }
  
  .policy-section {
    margin-bottom: 3rem;
    padding: 1.5rem;
    background: #f9f9f9;
    border-radius: 8px;
  }
  
  .policy-section h2 {
    color: #000000;
    margin-bottom: 1rem;
  }
  
  .principios, .requisitos, .compromisos {
    list-style: none;
    padding-left: 0;
  }
  
  .principios li, .requisitos li, .compromisos li {
    margin-bottom: 0.8rem;
    padding-left: 2rem;
    position: relative;
  }
  
  .principios i, .requisitos i, .compromisos i {
    position: absolute;
    left: 0;
    color: #fc0303;
  }
  
  .proceso-adopcion {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  .paso {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .numero-paso {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: #35da3a;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    margin-right: 10px;
    font-weight: bold;
  }
  
  .reubicacion {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  .card-politica {
    background: white;
    padding: 1rem;
    border-left: 4px solid #3ee943;
  }
  
  .policy-footer {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid #3ee943;
    text-align: center;
  }
  
  .contacto-politicas {
    margin-top: 1.5rem;
  }
  
  .contacto-politicas i {
    color: #3ee943;
    margin-right: 0.5rem;
  }
  
  @media (max-width: 768px) {
    .politicas-container {
      padding: 1rem;
    }
    
    .proceso-adopcion, .reubicacion {
      grid-template-columns: 1fr;
    }
  }
  </style>