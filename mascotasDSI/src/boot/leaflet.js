import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default ({ app }) => {
  app.config.globalProperties.$L = L; // Para que Leaflet sea accesible globalmente
};

export { L };  // También exportamos L para que sea accesible desde cualquier archivo



