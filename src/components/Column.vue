<template>
  <v-col>
    <v-card :loading="loading" flat>
      <v-toolbar>
        <v-toolbar-title>
          <slot></slot>
        </v-toolbar-title>

        <v-spacer/>

        <v-text-field
          v-if="filter"
          v-model="input"
          placeholder="Type to search..."
          append-icon="mdi-magnify"
          solo-inverted
          hide-details
          dense
          flat
        />
      </v-toolbar>

      <v-list>
        <v-list-item v-for="item in _items" :key="`item-${item.id}`">
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="toggle(item.id)" :color="action.color" icon>
              <v-icon>{{ action.icon }}</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-card-actions v-if="actions">
        <v-spacer/>

        <v-btn :to="{name: 'History', query: {action: 1}}" color="primary" text>
          Adding history
        </v-btn>

        <v-btn :to="{name: 'History', query: {action: 0}}" color="primary" text>
          Deletion history
        </v-btn>

        <v-spacer/>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {Item, Side} from "@/app.types";

@Component<Column>({
  name: 'Column'
})
export default class Column extends Vue {
  @Prop({type: Boolean, default: false}) readonly loading: boolean
  @Prop({type: Boolean, default: false}) readonly actions: boolean
  @Prop({type: Boolean, default: false}) readonly filter: boolean
  @Prop({type: Array, required: true}) readonly items!: Item[]
  @Prop({type: String, required: true}) readonly side!: Side

  input: string = ''

  get action() {
    return this.side === 'left' ? {
      icon: 'mdi-plus-circle-outline',
      color: 'success'
    } : {
      icon: 'mdi-minus-circle-outline',
      color: 'error'
    }
  }

  get _items(): Item[] {
    if (!this.input) return this.items

    const reg = new RegExp(this.input, 'gi')

    return this.items
      .map(item => {
        item.matches = (item.name.match(reg) ? item.name.match(reg).length : 0) +
          item.items.reduce((acc, child) => acc + (child.name.match(reg) ? child.name.match(reg).length : 0), 0)

        return item
      })
      .filter(item => item.matches)
      .sort((a, b) => b.matches - a.matches)
  }

  toggle(id: number): void {
    this.$emit('toggle', {
      from: this.side,
      to: this.side === 'left' ? 'right' : 'left',
      id
    })
  }
}
</script>
