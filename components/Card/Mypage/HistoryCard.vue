<template>
  <v-tab-item class="mt-5">
    <v-card flat color="basil" class="mx-auto" max-width="400">
      <div v-if="!isList" class="px-2">
        誰からも送金されてません。(寂しいですね)
      </div>

      <div v-else>
        <transition-group tag="div" name="card-anim">
          <div v-for="user in userList" :key="user.text">
            <SendCard
              :card-color="user.backColor"
              :card-title="user.text"
              :card-text-color="user.textColor"
              :card-pay="user.pay"
              :user-img="user.img"
              :user-name="user.userName"
              transition="slide-x-reverse-transition"
            />
            <v-card-text class="text-right pt-1 pr-2" max-width="400">
              {{ user.createdAt }}
            </v-card-text>
          </div>
        </transition-group>
      </div>
    </v-card>
  </v-tab-item>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import moment from 'moment'
import SendCard from '@/components/Card/SendCard.vue'
import { firestore } from '@/plugins/firebase'

interface IList {
  backColor: string
  text: string
  textColor: string
  pay: number
  img: string
  userName: string
  createdAt: string
}

@Component({
  components: {
    SendCard
  }
})
export default class HistoryCard extends Vue {
  private userUid: string = ''

  userList: IList[] = []

  isList: boolean = false

  async created() {
    await firestore
      .collection('user')
      .where('uid', '==', this.$route.params.id)
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach(async (doc: any) => {
          this.userUid = doc.id
          await firestore
            .collection('user')
            .doc(this.userUid)
            .collection('transfer')
            .orderBy('createdAt', 'desc')
            .limit(1)
            .onSnapshot((querySnapshot: any) => {
              if (querySnapshot.empty) {
                this.isList = false
              } else {
                querySnapshot.forEach((doc: any) => {
                  const backColor = doc.data().backColor
                  const text = doc.data().text
                  const textColor = doc.data().textColor
                  const pay = doc.data().pay
                  const img = doc.data().img
                  const userName = doc.data().userName
                  const createdAt = moment(
                    doc.data().createdAt.toDate()
                  ).format('YYYY年MM月DD日')

                  const listSend = {
                    backColor,
                    text,
                    textColor,
                    pay,
                    img,
                    userName,
                    createdAt
                  }
                  this.userList.unshift(listSend)
                })
                this.isList = true
              }
            })

          await firestore
            .collection('user')
            .doc(this.userUid)
            .collection('transfer')
            .orderBy('createdAt', 'desc')
            .get()
            .then((querySnapshot: any) => {
              if (querySnapshot.empty) {
                this.isList = false
              } else {
                this.userList = []
                querySnapshot.forEach((doc: any) => {
                  const backColor = doc.data().backColor
                  const text = doc.data().text
                  const textColor = doc.data().textColor
                  const pay = doc.data().pay
                  const img = doc.data().img
                  const userName = doc.data().userName
                  const createdAt = moment(
                    doc.data().createdAt.toDate()
                  ).format('YYYY年MM月DD日')

                  const listSend = {
                    backColor,
                    text,
                    textColor,
                    pay,
                    img,
                    userName,
                    createdAt
                  }
                  this.userList.push(listSend)
                })
                this.isList = true
              }
            })
        })
      })
  }
}
</script>

<style lang="scss" scoped>
@keyframes fadeInUp {
  0% {
    transform: translateX(60px);
    opacity: 0;
  }
  60% {
    opacity: 0.3;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
.card-anim-enter-active {
  animation: fadeInUp 0.7s;
  animation-delay: 0.4s;
  opacity: 0;
}
</style>
