<template>
  <v-snackbar v-model="snackbar" absolute top right color="success">
    <span>
      ログインしました。
    </span>
    <v-icon class="white--text">
      fas fa-check-circle
    </v-icon>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class SuccessLogin extends Vue {
  get snackbar(): boolean {
    return this.$store.state.login.successSnackbar
  }

  set snackbar(isSnackbar: boolean) {
    this.$store.commit('login/SET_SUCCESS_SNACKBAR', isSnackbar)
  }
}
</script>
