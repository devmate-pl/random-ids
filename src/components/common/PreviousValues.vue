<template>
  <v-row text-center wrap dense>
    <v-col cols="12" class="ml-auto">

      <v-list nav class="previous-values" :style="listStyle" density="compact">
        <v-list-subheader inset>POPRZEDNIE WARTOŚCI</v-list-subheader>

        <v-list-item density="compact"
          v-for="(prev, i) in previousValues"
          :key="prev + i"
          :value="prev"
          color="primary"
        >
          <v-list-item-title
            v-text="prev"
            class="list-item-content"
            :title="titleFor(prev)"
            @click="clicked(prev)"
          />
        </v-list-item>

      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import { EventBus } from '@/services/event-bus.js'

export default {
  props: {
    previousValues: {
      type: Array,
      required: true
    },
    maxHeight: {
      default: 160,
      required: false,
      type: Number
    }
  },
  computed: {
    listStyle () {
      return 'max-height: ' + this.maxHeight + 'px;'
    }
  },
  methods: {
    clicked (text) {
      EventBus.emit('clicked', text)
    },
    titleFor (prev) {
      return '' + prev
    }
  }
}
</script>

<style>

.previous-values .v-list-item--density-compact.v-list-item--one-line {
  min-height: 25px;
}

.list-item-content {
  font-family: "Roboto Mono", monospace;
  text-align: right;
}

/* Nie dziala dobrze overflow na elementach listy - definiowanie szerokosci dla roznych rozmiarow ekranu */

/* xsmall od 600 (sm i nizej) */
@media screen and (max-width: 599px) {
  .list-width {
    display: none;
  }
}

/* small */
@media screen and (min-width: 601px) and (max-width: 959px) {
  .list-width {
    max-width: 230px;
  }
}

/** medium */
@media screen and (min-width: 960px) and (max-width: 1263px) {
  .list-width {
    max-width: 330px;
  }
}

/** large */
@media screen and (min-width: 1264px) and (max-width: 1903px) {
  .list-width {
    max-width: 230px;
  }
}

/** xlarge */
@media screen and (min-width: 1904px)  {
  .list-width {
    max-width: 320px;
  }
}

</style>
