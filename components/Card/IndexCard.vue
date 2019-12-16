<template>
  <v-card class="mx-auto mt-10 pb-2" max-width="400">
    <v-card-title class="headline teal darken-2" primary-title>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1 white--text">
            お手軽送金サービス
            <v-icon class="fas fa-hand-holding-usd white--text ml-2"></v-icon>
          </v-list-item-title>
          <v-list-item-subtitle class="white--text">
            誰でも簡単に送金
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-title>

    <v-row class="px-2">
      <v-col cols="12" class="pb-0">
        <v-text-field
          ref="name"
          v-model="email"
          :rules="[rules.isEmail, rules.emailFormat]"
          prepend-inner-icon="fas fa-envelope"
          label="メールアドレス"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          :rules="[rules.required, rules.min, rules.max]"
          name="input-10-1"
          label="パスワード"
          hint="6文字以上、20文字以内で入力してください"
          counter
          autocomplete="on"
          prepend-inner-icon="fas fa-lock"
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-card-actions class="d-flex justify-center">
      <registration-btn />

      <v-spacer></v-spacer>

      <v-btn
        color="primary"
        class="mr-2"
        :disabled="!formIsValid"
        type="submit"
        :loading="loading"
        @click="login"
      >
        ログイン
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import RegistrationBtn from '@/components/Btn/RegistrationBtn.vue'

@Component({
  components: {
    RegistrationBtn
  },
  computed: {
    loading(): boolean {
      return this.$store.state.login.loading
    }
  }
})
export default class IndexCard extends Vue {
  public show1: boolean = false
  public dialog: boolean = false
  public email: string = ''
  public password: string = ''

  public rules: {} = {
    required: (value: string) => !!value || 'パスワードを入力してください',
    min: (v: string) => v.length >= 6 || '6文字以上で入力してください',
    max: (v: string) => v.length < 21 || '20文字以内で入力してください',
    emailFormat: (v: string) => {
      const pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      return (
        pattern.test(v) ||
        'メールアドレスは半角英数字で「XX@XX.XX」の形式にて入力してください。'
      )
    },
    isEmail: (v: string) => !!v || 'メールアドレスは必ず入力してください。'
  }

  public get formIsValid(): string {
    return this.email && this.password
  }

  login() {
    this.$store.commit('login/SET_LOADING', true)

    this.$store.dispatch('login/login', {
      email: this.email,
      password: this.password
    })
  }
}
</script>
