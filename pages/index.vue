<template>
  <div class="px-2">
    <index-card />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import IndexCard from '@/components/Card/IndexCard.vue'

@Component({
  components: {
    IndexCard
  }
})
export default class IndexPage extends Vue {}
</script>

<style lang="scss"></style>
