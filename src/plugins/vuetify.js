/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import 'vuetify/styles'

// Composables
import {createVuetify} from 'vuetify'
import { pl } from 'vuetify/locale'

const randomIdsDark = {
  dark: true,
  colors: {
    primary: '#018786',
    accent: '#03DAC6',
    secondary: '#03DAC6',
    background: '#121212',
    success: '#03DAC6',
    info: '#2196F3',
    warning: '#CF6679',
    error: '#CF6679'
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    // themes: {
    //   randomIdsDark,
    // },
  },
  locale: {
    locale: 'pl',
    messages: { pl }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
