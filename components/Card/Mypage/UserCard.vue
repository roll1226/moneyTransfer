<template>
  <v-tab-item>
    <v-card flat color="basil">
      <v-card-title class="ml-3">
        <v-list-item-avatar color="grey darken-3">
          <v-img class="elevation-6" :src="userImg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ userName }}
          </v-list-item-title>
        </v-list-item-content>

        <ChangeImgBtn :uploaded-image="userImg" :user-uid="qrValue" />
      </v-card-title>
    </v-card>

    <p class="text-center headline">残高: {{ nowPay.toLocaleString() }}円</p>

    <qriously class="d-flex justify-center" :value="qrValue" :size="180" />

    <div class="text-center mt-6 mb-1">
      <v-btn color="error" @click="logout">
        ログアウト
      </v-btn>
    </div>
  </v-tab-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { auth } from '@/plugins/firebase'
import ChangeImgBtn from '@/components/Btn/ChangeImgBtn.vue'

@Component({
  components: {
    ChangeImgBtn
  }
})
export default class UserCard extends Vue {
  @Prop({ required: true, default: '' })
  private qrValue!: string

  @Prop({ required: true, default: '' })
  userName!: string

  @Prop({ required: true, default: '' })
  userImg!: string

  @Prop({ required: true, default: 0 })
  nowPay!: number

  logout() {
    auth.signOut().then(() => {
      this.$router.push('/')
    })
  }
}
</script>
