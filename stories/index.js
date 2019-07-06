// import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import Logo from '../components/Logo.vue'

storiesOf('Hello', module).add('Logo', () => ({
  components: { Logo },
  template: '<logo></logo>'
}))
