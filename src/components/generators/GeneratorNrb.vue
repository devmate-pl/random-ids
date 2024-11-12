<template>
  <div>
    <GeneratorTemplate ref="commonTemplate" :generate-next-value="nextValue">
      <template v-slot:generatorName>
        <p class="headline">
          NRB
        </p>
      </template>
      <template v-slot:settingsButton>
        <v-btn @click.stop="openSettingsDialog">
          Ustawienia
        </v-btn>
      </template>

      <template v-slot:currentSettings>
        {{ currentBankName }}
      </template>
    </GeneratorTemplate>
    <!-- settings dialog -->
    <v-dialog
      v-model="dialog"
      max-width="450"
    >
      <v-card>
        <v-card-title class="headline">
          Ustawienia generatora NRB
        </v-card-title>

        <v-card-text>
          <v-form v-model="valid">
            <v-col cols="12">
              <v-radio-group v-model="editedSettings.showCountryCode">
                <template v-slot:label>
                  <div>Czy wyświetlać kod kraju?</div>
                </template>
                <v-radio value="true">
                  <template v-slot:label>
                    <div class="blue--text">
                      Tak
                    </div>
                  </template>
                </v-radio>
                <v-radio value="false">
                  <template v-slot:label>
                    <div class="pink--text text--lighten-2">
                      Nie
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
              <v-select
                v-model="editedSettings.bankId"
                :items="banks"
                :value="editedSettings.bankId"
                item-value="value"
                item-title="text"
                label="Dla którego banku wygenerować?"
              >
              </v-select>
            </v-col>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn :disabled="!valid" color="green darken-1" @click="saveOptions">
            Ustaw
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import GeneratorTemplate from '@/components/generators/GeneratorTemplate.vue'
import nrbService from '@/services/generators/nrb.js'
import { mapActions } from 'vuex'

export default {
  name: 'NRB',
  placeholder: 'nrb',

  components: {
    GeneratorTemplate
  },

  data: () => ({
    dialog: false,
    valid: true,
    currentSettings: {
      showCountryCode: 'false',
      countryCode: 'PL',
      bankId: 1940
    },
    editedSettings: {
      showCountryCode: null,
      countryCode: null,
      bankId: null
    },
    banks: [
      { text: 'Alior Bank (2490)', value: 2490 },
      { text: 'Bank Millennium (1160)', value: 1160 },
      { text: 'BNP Paribas Bank Polska SA (1750)', value: 1750 },
      { text: 'BPH (1060)', value: 1060 },
      { text: 'Credit Agricole Bank Polska (1940)', value: 1940 },
      { text: 'Idea Bank (1950)', value: 1950 },
      { text: 'ING (1050)', value: 1050 },
      { text: 'mBank (1140)', value: 1140 },
      { text: 'Narodowy Bank Polski (1010)', value: 1010 },
      { text: 'Nest Bank (1870)', value: 1870 },
      { text: 'Nest Bank 2 (2530)', value: 2530 },
      { text: 'Pekao (1240)', value: 1240 },
      { text: 'PKO BP (1020)', value: 1020 },
      { text: 'Santander (1090)', value: 1090 },
      { text: 'Societe Generale (1840)', value: 1840 },
      { text: 'T-mobile Usługi Bankowe (24901044)', value: 24901044 }
    ]
  }),

  computed: {
    currentBankName () {
      const bank = this.banks.find(bank => bank.value === this.currentSettings.bankId)
      if (bank) {
        return bank.text
      }
      return ''
    }
  },

  created () {
    const loadedConfig = this.$store.getters.getGeneratorSettings(this.$options.name)
    if (loadedConfig) {
      this.currentSettings = loadedConfig
    }
  },

  methods: {
    ...mapActions(['updateGeneratorConfiguration']),
    nextValue () {
      if (this.currentSettings.showCountryCode === 'true') {
        return this.currentSettings.countryCode + nrbService.nrb(this.currentSettings.countryCode, this.currentSettings.bankId)
      } else {
        return nrbService.nrb(this.currentSettings.countryCode, this.currentSettings.bankId)
      }
    },
    openSettingsDialog () {
      this.editedSettings.showCountryCode = this.currentSettings.showCountryCode
      this.editedSettings.countryCode = this.currentSettings.countryCode
      this.editedSettings.bankId = this.currentSettings.bankId
      this.dialog = true
    },
    saveOptions () {
      this.currentSettings.showCountryCode = this.editedSettings.showCountryCode
      this.currentSettings.countryCode = this.editedSettings.countryCode
      this.currentSettings.bankId = this.editedSettings.bankId
      this.dialog = false

      this.updateGeneratorConfiguration({ name: this.$options.name, config: this.currentSettings })
    }
  }
}
</script>

<style>
</style>
