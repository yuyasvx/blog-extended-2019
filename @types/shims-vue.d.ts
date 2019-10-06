declare module '*.vue' {
  import VueJS from 'vue'
  interface Vue {
    $mq: string
  }
  export default VueJS
}

declare module 'vue/types/vue' {
  interface Vue {
    $mq: string
  }
}
