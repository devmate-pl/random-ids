<template>
  <v-app>

    <v-app-bar>

      <template v-slot:prepend>
        <v-img
          alt="Logo"
          title="Generator PESEL, dowód osobisty"
          class="logo"
          src="@/assets/logo.png"
          transition="scale-transition"
          width="40"
        />
      </template>

      <v-app-bar-title class="ml-10 hidden-sm-and-down"><h1>Wygeneruj dane testowe: PESEL, NIP, Regon, Dowody Osobiste</h1></v-app-bar-title>

      <template v-slot:append>
        <v-btn
          rounded
          outlined
          title="Generuj wartości"
          @click="refreshAll"
        >
          <v-img
            alt="Generuj wartości"
            class="shrink mr-2"
            src="@/assets/logo.png"
            width="30"
          />
          Generuj wszystkie
        </v-btn>

        <v-icon class="mr-2" :icon="mdiThemeLightDark"/>

        <v-switch
          class="switch"
          @click="toggleTheme"
          hide-details
          title="Przełącz motyw jasny/ciemny"
        />
      </template>

    </v-app-bar>
    <v-main>
      <Dashboard ref="dashboardRef"/>
    </v-main>

  </v-app>
</template>

<script setup>

import {useTheme} from 'vuetify'
import Dashboard from './components/Dashboard.vue'
import {ref} from "vue";
import { mdiThemeLightDark } from '@mdi/js'

const theme = useTheme()
const dashboardRef = ref();


function toggleTheme() {
 theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

function refreshAll() {
 dashboardRef.value.refreshAll()
}

</script>

<style scoped>
.logo {
  margin-left: 10px;
}
.switch {
  margin-right: 10px;
}
h1 {
  font-size: 1.2rem !important;
  text-overflow: ellipsis;
}
/* zmiana domyślnych ustawień, żeby wykorzystywać więcej szerokości ekranu */
@media (min-width: 1280px) {
  .v-container {
    max-width: 1800px;
  }
}
@media (min-width: 1920px) {
  .v-container {
    max-width: 1800px;
  }
}
</style>
