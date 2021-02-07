<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          :src="require('./assets/menu.svg')"
          transition="scale-transition"
          width="40"
          contain
        />

        <h2 class="shrink mt-1 hidden-sm-and-down">VueItems</h2>
      </div>

      <v-toolbar-items class="mx-3">
        <v-btn to="/" text>Home</v-btn>

        <v-btn to="/history" text>History</v-btn>
      </v-toolbar-items>

      <v-spacer/>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  name: 'App',
})
export default class App extends Vue {
}
</script>
