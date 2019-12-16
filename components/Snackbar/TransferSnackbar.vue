<template>
  <v-snackbar v-model="snackbar" absolute top right color="success">
    <span>
      送金しました。
    </span>
    <v-icon class="white--text">
      fas fa-check-circle
    </v-icon>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class TransferSnackbar extends Vue {
  get snackbar(): boolean {
    return this.$store.state.transfer.snackbar
  }

  set snackbar(isSnackbar: boolean) {
    this.$store.commit('transfer/SET_SNACKBAR', isSnackbar)
  }
}
</script>
