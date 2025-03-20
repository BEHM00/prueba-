const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'listado', component: () => import('pages/ListadoPage.vue') }, //Ruta para catalogo
      { path: 'inicio-sesion', component: () => import('pages/InicioSesion.vue') }, //Ruta para pagina de inicio de sesion
      { path: 'inicio-sesion/crear-cuenta', component: () => import('pages/Crearcuenta.vue') }, //Ruta para crear cuenta
      { path: 'agregar', component: () => import('pages/AgregarPage.vue') }, //Ruta para agregar mascota
      { path: 'quienessomos', component: () => import('pages/QuienesSomos.vue') }, //quienes somos
      { path: 'detalle/:IDMASCOTA', component: () => import('pages/DetalleMascota.vue') }, //detalle mascota
      { path: 'miperfil', component: () => import('pages/MiPerfil.vue') }, //Mi perfil
      { path: 'tutorial', component: () => import('pages/MiTutorial.vue') }, //Tutorial
      { path: 'sugerencias', component: () => import('pages/MiSugerencias.vue') }, //Tutorial
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
