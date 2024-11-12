<template>
  <v-container>
    <v-row>
      <v-col
        v-for="generator in activeGenerators()"
        :key="generator.type.__name"
        cols="12"
        :lg="generator.size">
        <component :is="generator.type" ref="generatorRefs"/>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" top :timeout="snackbarTimeout">
      Skopiowano do schowka...
    </v-snackbar>


  </v-container>
</template>

<script setup>
import GeneratorPesel from './generators/GeneratorPesel.vue'
import GeneratorNip from './generators/GeneratorNip.vue'
import GeneratorRegon from './generators/GeneratorRegon.vue'
import GeneratorDO from './generators/GeneratorDO.vue'
import GeneratorNrb from './generators/GeneratorNrb'
import GeneratorUUID from './generators/GeneratorUUID.vue'
import GeneratorPassport from './generators/GeneratorPassport.vue'
import utils from '@/services/utils.js'
import clipboard from '@/services/clipboard.js'
import { EventBus } from '@/services/event-bus.js'
import {useStore} from 'vuex'
import {ref} from "vue";

defineExpose({
  refreshAll
})

let allGenerators = [
  { type: GeneratorPesel, size: 6 },
  { type: GeneratorDO, size: 6 },
  { type: GeneratorNip, size: 6 },
  { type: GeneratorRegon, size: 6 },
  { type: GeneratorPassport, size: 6 },
  { type: GeneratorNrb, size: 6 },
  { type: GeneratorUUID, size: 6 }
]
const store = useStore()
store.dispatch("loadConfiguration")

let snackbar = ref(false);
let snackbarTimeout = 800;

let templateText = '';
let templateTextResult = '';

// ref do wszystkich generatorów
const generatorRefs = ref([]);

// register events
EventBus.on('clicked', someData => clipboardCopy(someData))
EventBus.on('generated', () => {
  // calculateTemplateResult()
})


function refreshAll() {
  // call generate from template generator in every generator component
  if (generatorRefs) {
    generatorRefs.value.forEach(g => g.$refs.commonTemplate.generate())
  }
}

function validGenerators() {
  return allGenerators.filter(g => g.type)
}

function activeGenerators () {
  return validGenerators()
}

// function calculateTemplateResult () {
//   let textTemplate = templateText
//   if (this.$refs.generator) {
//     this.$refs.generator.forEach(g => {
//       if (utils.funcExists(g.substituteValue)) {
//         // generator ma specyficzną funkcję podmieniającą, trzeba ją wywołać
//         textTemplate = g.substituteValue(textTemplate)
//       } else if (utils.stringPropertyExists(g.$options.placeholder)) {
//         // jeśli jest podany placeholder, to podmiana wartości wg wzorca
//         textTemplate = utils.replaceAll(textTemplate, g.$options.placeholder, g.$refs.commonTemplate.currentValue())
//       }
//     })
//   }
//   this.templateTextResult = textTemplate
// }

function clipboardCopy (text) {
  clipboard.copyToClipboard(text)
  reportCopied()
}

function reportCopied () {
  snackbar.value = true
}

</script>
