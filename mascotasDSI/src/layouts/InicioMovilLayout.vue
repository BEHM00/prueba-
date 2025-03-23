<template>
    <q-layout view="hHh lpR lFf">

        <q-header reveal elevated class="bg-primary" style=" height: 50px; max-height: 100px;">
        <q-toolbar>
          <q-btn dense flat round icon="arrow_back" color="dark" to="/"/>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </template>
  
  <script>
  export default {
    setup() {
      return {};
    }
  };
  </script>
  