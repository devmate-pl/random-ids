<template>
  <div>

    <GeneratorTemplate :generateNextValue="nextValue" ref="commonTemplate">
      <template v-slot:generatorName>
        <p class="headline">PESEL</p>
      </template>
      <template v-slot:settingsButton>
        <v-btn @click.stop="openSettingsDialog">Ustawienia</v-btn>
      </template>
      <template v-slot:currentSettings>
        {{ settingsSex }} {{ settingsAge }} {{ settingsBirthday }} 
      </template>
    </GeneratorTemplate>

    <!-- settings dialog -->
    <v-dialog
      v-model="dialog"
      max-width="450"
    >
      <v-card>
        <v-card-title class="headline">Ustawienia generatora PESEL</v-card-title>

        <v-card-text>
          <v-form v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-radio-group v-model="editSettings.sex" >
                  <template v-slot:label>
                    <div>Płeć</div>
                  </template>
                  <v-radio value="male">
                    <template v-slot:label>
                      <div class="blue--text">Mężczyzna</div>
                    </template>
                  </v-radio>
                  <v-radio value="female">
                    <template v-slot:label>
                      <div class="pink--text text--lighten-2">Kobieta</div>
                    </template>
                  </v-radio>
                  <v-radio value="all">
                    <template v-slot:label>
                      <div class="grey--text">Wszyscy</div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
              
              <v-col cols="4" lg="4">
                <v-text-field label="Wiek" v-model="editSettings.age" :rules="editSettings.ageRules" required/>
              </v-col>
              
              <v-col cols="8" lg="6">
                <v-menu
                  ref="birthdayDatePickerVisible"
                  v-model="birthdayDatePickerVisible"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="editSettings.birthDate"
                      label="Data urodzenia"
                      hint="YYYY-MM-DD"
                      persistent-hint
                      :rules="editSettings.birthDateRules"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="editSettings.birthDate" no-title @input="birthdayDatePickerVisible = false"></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="saveOptions" :disabled="!valid">
            Ustaw
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import GeneratorTemplate from '@/components/generators/GeneratorTemplate.vue'
import peselService from '@/services/generators/pesel.js'

export default {
  name: 'GeneratorPesel',
  components: {
    GeneratorTemplate,
  },

  data: () => ({
    dialog: false,
    valid: true,
    date: null,
    birthdayDatePickerVisible: false,
    currentSettings: {
      age: 40,
      birthDate: null,
      sex: 'all',
    },
    editSettings: {
      age: null,
      ageRules: [a => (!a || (a >=1 && a <= 99)) || 'Wiek powinien być z przedziału między 1 a 99'],
      birthDate: null,
      birthDateRules: [a => (!a || (/^\d\d\d\d-\d\d-\d\d$/.test(a)) && !!new Date(a).toISOString()) || 'Data powinna byc w formacie yyyy-mm-dd',],
      sex: 'all',
    },
  }),

  computed: {
    settingsAge() {
      if (this.currentSettings.birthDate) return ''
      return this.currentSettings.age ? 'Wiek: ' + this.currentSettings.age  : ''
    },
    settingsBirthday() {
      return this.currentSettings.birthDate ? 'Ur.: ' +  this.currentSettings.birthDate : ''
    },
    settingsSex() {
      if (this.currentSettings.sex == 'male') {
        return 'M'
      } else if (this.currentSettings.sex == 'female') {
        return 'K'
      }
      return ''
    },
  },

  methods: {
    nextValue() {
      const nextPesel = peselService.pesel(
        this.currentSettings.birthDate, 
        this.currentSettings.age, 
        this.currentSettings.sex
        )
      return nextPesel
    },
    openSettingsDialog() {
      this.editSettings.birthDate = this.currentSettings.birthDate
      this.editSettings.age = this.currentSettings.age
      this.editSettings.sex = this.currentSettings.sex
      this.dialog = true
    },
    saveOptions() {
      this.currentSettings.birthDate = this.editSettings.birthDate
      this.currentSettings.age = this.editSettings.age
      this.currentSettings.sex = this.editSettings.sex
      this.dialog = false
    },
  },

};
</script>

<style>
</style>