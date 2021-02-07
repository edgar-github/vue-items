<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn to="/" icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <span class="mx-2">History</span>
      </v-card-title>

      <v-list v-if="items.length">
        <v-list-item v-for="(item, i) in items" :key="`item-${i}`">
          <v-list-item-content>
            <v-list-item-title v-text="item.item.name"/>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{ item.date | formatDate }}</v-list-item-action-text>

            <v-icon :color="item.action ? 'success': 'error'">
              mdi-{{ item.action ? 'bookmark-plus-outline' : 'bookmark-minus-outline' }}
            </v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-card-text v-else>
        <h2 class="text-center">No History records!</h2>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Record} from '@/app.types';

@Component<History>({
  name: 'History',
  filters: {
    formatDate(date: Date): string {
      return date.toISOString().substr(0, 10)
    }
  }
})
export default class History extends Vue {
  get items(): Record[] {
    return this.$store.getters.getHistory(
      this.$route.query.action
    )
  }
}
</script>
