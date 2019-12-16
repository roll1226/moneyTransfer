<template>
  <div>
    <div class="text-center mt-4">
      <v-btn color="success" :disabled="valPay === 0" @click="openDialog">
        送る
      </v-btn>
    </div>

    <v-dialog v-model="dialog" width="300">
      <v-card>
        <v-card-title class="headline success white--text" primary-title>
          最終確認
        </v-card-title>

        <v-card-actions class="d-flex justify-center">
          <v-btn color="error" class="mr-5" @click="dialog = false">
            直す
          </v-btn>

          <v-btn color="success" class="ml-5" :loading="loading" @click="send">
            送る
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'

@Component({
  computed: {
    loading(): boolean {
      return this.$store.state.transfer.loading
    }
  }
})
export default class SendTransferBtn extends Vue {
  // dialog: boolean = false

  get dialog(): boolean {
    return this.$store.state.transfer.dialog
  }

  set dialog(isDialog: boolean) {
    this.$store.commit('transfer/SET_DIALOG', isDialog)
  }

  openDialog() {
    this.$store.commit('transfer/SET_DIALOG', true)
  }

  @Prop({ required: true, default: 0 })
  valPay!: number

  @Emit('send')
  send() {}
}
</script>
