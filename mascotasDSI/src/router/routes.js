const routes = [
  {
    path: '/',
    component: () => import('layouts/DynamicLayout.vue'), // Usa el layout dinámico
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'listado', component: () => import('pages/ListadoPage.vue') },
      { path: 'inicio-sesion', component: () => import('pages/InicioSesion.vue') },
      { path: 'agregar', component: () => import('pages/AgregarPage.vue') },
      { path: 'quienessomos', component: () => import('pages/QuienesSomos.vue') },
      { path: 'detalle/:IDMASCOTA', component: () => import('pages/DetalleMascota.vue') },
      { path: 'miperfil', component: () => import('pages/MiPerfil.vue') },
      { path: 'tutorial', component: () => import('pages/MiTutorial.vue') },
      { path: 'sugerencias', component: () => import('pages/MiSugerencias.vue') },
    ],
  },
  {
    path: '/inicio-sesion/',
    component: () => import('layouts/InicioLayout.vue'),
    children: [
      { path: 'crear-cuenta', component: () => import('pages/CrearCuenta.vue') }
    ]
  },
  // Ruta para páginas no encontradas
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;