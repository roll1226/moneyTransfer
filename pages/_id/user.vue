<template>
  <div class="px-2">
    <v-card color="basil" class="mx-auto mt-10 pb-2 mb-5" max-width="700">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="display-3">
          ラクラク送金
        </h1>
      </v-card-title>

      <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab>
          ユーザ
        </v-tab>
        <v-tab>
          送金
        </v-tab>
        <v-tab>
          履歴
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <UserCard
          :qr-value="userUid"
          :user-img="userImage"
          :user-name="userName"
          :now-pay="userPay"
        />

        <TransferCard
          :max-pay="userPay"
          :tab="tab"
          :user-img="userImage"
          :user-name="userName"
          :user-uid="userUid"
        />

        <HistoryCard />
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { firestore } from '@/plugins/firebase'
import TransferCard from '@/components/Card/Mypage/TransferCard.vue'
import UserCard from '@/components/Card/Mypage/UserCard.vue'
import HistoryCard from '@/components/Card/Mypage/HistoryCard.vue'

@Component({
  components: {
    UserCard,
    TransferCard,
    HistoryCard
  }
})
export default class User extends Vue {
  tab: number = 0
  userName: string = ''
  userImage: string = ''
  qrValue: string = ''
  userPay: number = 0
  private userUid: string = ''

  private async created() {
    await firestore
      .collection('user')
      .where('uid', '==', this.$route.params.id)
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          this.userName = doc.data().name
          this.userImage = doc.data().img
          this.userUid = doc.id
          this.userPay = doc.data().pay
          firestore
            .collection('user')
            .doc(this.userUid)
            .onSnapshot((res: any) => {
              this.userPay = res.data().pay
              this.userImage = res.data().img
            })
        })
      })
  }
}
</script>
