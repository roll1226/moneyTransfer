<template>
  <div>
    <v-btn
      color="success"
      class="ml-2"
      type="submit"
      outlined
      @click="openDialog"
    >
      登録
    </v-btn>

    <div>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline success white--text" primary-title>
            会員登録
          </v-card-title>

          <v-form class="px-4" @submit.prevent="registration">
            <v-container class="py-0 px-0">
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    ref="name"
                    v-model="userName"
                    :rules="[rules.isUser]"
                    label="ユーザ名"
                    prepend-inner-icon="fas fa-user"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" class="pb-0">
                  <v-text-field
                    ref="name"
                    v-model="email"
                    :rules="[rules.isEmail, rules.emailFormat]"
                    label="メールアドレス"
                    prepend-inner-icon="fas fa-envelope"
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
            </v-container>

            <v-card-actions class="d-flex justify-center">
              <v-btn
                color="success"
                :disabled="!formIsValid"
                :loading="loading"
                type="submit"
              >
                登録
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  computed: {
    loading(): boolean {
      return this.$store.state.registration.loading
    }
  }
})
export default class RegistrationBtn extends Vue {
  // dialog: boolean = false
  show1: boolean = false
  userName: string = ''
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
    isUser: (v: string) => !!v || 'ユーザ名を入力してください。',
    isEmail: (v: string) => !!v || 'メールアドレスは必ず入力してください。'
  }

  public get formIsValid(): string {
    return this.email && this.password && this.userName
  }

  get dialog(): boolean {
    return this.$store.state.registration.dialog
  }

  set dialog(isSnackbar: boolean) {
    this.$store.commit('registration/SET_DIALOG', isSnackbar)
  }

  openDialog() {
    this.$store.commit('registration/SET_DIALOG', true)
  }

  registration() {
    this.$store.commit('registration/SET_LOADING', true)
    this.$store.dispatch('registration/registration', {
      email: this.email,
      password: this.password,
      name: this.userName
    })
  }
}
</script>
