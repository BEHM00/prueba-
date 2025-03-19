const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/listado', component: () => import('pages/ListadoPage.vue') }, //Ruta para catalogo
      { path: '/inicio-sesion', component: () => import('pages/InicioSesion.vue') }, //Ruta para pagina de inicio de sesion
      { path: '/agregar', component: () => import('pages/AgregarPage.vue') }, //Ruta para agregar mascota
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes;
