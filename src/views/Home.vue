<template>
  <v-container>
    <v-row>
      <Column
        @toggle="toggleItem"
        :loading="loading"
        :items="left"
        side="left"
        filter
      >
        Left Items
      </Column>

      <Column
        @toggle="toggleItem"
        :items="right"
        side="right"
        actions
      >
        Right Items
      </Column>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {RawLocation, Route} from 'vue-router'
import {Component, Vue} from 'vue-property-decorator'
import {Action, Item, Toggler} from '@/app.types'
import Column from "@/components/Column.vue";

@Component<Home>({
  name: 'Home',
  components: {
    Column
  }
})

export default class Home extends Vue {
  left: Item[] = []

  right: Item[] = []

  loading: boolean = true

  toggleItem({from, to, id}: Toggler): void {
    const i = this[from].findIndex(item => item.id === id)
    const [item] = this[from].splice(i, 1)

    this[to].push(item)

    this.$store.commit('ADD_TO_HISTORY', {
      action: from === 'left' ? Action.Removed : Action.Added,
      date: new Date(),
      item,
    })
  }

  fetchItems(): Promise<Item[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve([
        {
          id: 1,
          name: 'name 1',
          items: [
            {id: 11, name: 'name 11'},
            {id: 12, name: 'name 12'},
            {id: 13, name: 'name 13'},
            {id: 14, name: 'name 14'},
          ]
        },
        {
          id: 2,
          name: 'name 2',
          items: [
            {id: 22, name: 'name 22'},
            {id: 23, name: 'name 23'},
            {id: 24, name: 'name 24'},
            {id: 25, name: 'name 25'},
            {id: 26, name: 'name 26'},
          ]
        },
        {
          id: 3,
          name: 'name 3',
          items: [
            {id: 33, name: 'name 33'},
            {id: 32, name: 'name 32'},
          ]
        },
        {
          id: 4,
          name: 'name 4',
          items: [
            {id: 41, name: 'name 41'},
            {id: 42, name: 'name 42'},
            {id: 43, name: 'name 43'},
            {id: 44, name: 'name 44'},
            {id: 45, name: 'name 45'},
            {id: 46, name: 'name 46'},
            {id: 47, name: 'name 47'},
            {id: 48, name: 'name 48'},
          ]
        },
        {
          id: 5,
          name: 'name 5',
          items: [
            {id: 51, name: 'name 51'},
            {id: 52, name: 'name 52'},
            {id: 53, name: 'name 53'},
            {id: 54, name: 'name 54'},
            {id: 55, name: 'name 55'},
            {id: 56, name: 'name 56'},
            {id: 57, name: 'name 57'},
            {id: 58, name: 'name 58'},
            {id: 59, name: 'name 59'},
            {id: 60, name: 'name 60'},
            {id: 61, name: 'name 61'},
            {id: 62, name: 'name 62'},
          ]
        }
      ]), 1000)
    })
  }

  beforeRouteEnter(
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: Home) => void)) => void
  ) {
    next(vm => vm.fetchItems()
      .then(items => vm.left = items)
      .finally(() => vm.loading = false))
  }
}
</script>
