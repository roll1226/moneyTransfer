<template>
  <v-tab-item>
    <v-card flat color="basil">
      <v-row v-show="tab === 1" v-if="result === ''" class="justify-center">
        <v-col cols="6" class="justify-center">
          <qrcode-stream @decode="onDecode" />
        </v-col>
      </v-row>

      <div v-else class="mt-7">
        <p class="text-center">
          <span class="title">{{ sendUserName }}</span
          >へ送金
        </p>

        <v-row class="d-flex justify-center">
          <v-col cols="9" class="pb-0">
            <v-text-field
              v-model="pay"
              label="総金額"
              placeholder="総金額の選択"
            ></v-text-field>
            <v-slider
              v-model="pay"
              label="総金額"
              :max="maxPay"
              thumb-label
              class="mx-6"
            >
            </v-slider>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-center mx-auto">
          <v-col cols="9" class="pb-0">
            <v-text-field
              v-model="title"
              label="テキスト入力"
              outlined
            ></v-text-field>
          </v-col>

          <v-col>
            <v-card-title class="pt-0">
              カードの色
            </v-card-title>

            <div class="d-flex justify-center">
              <v-color-picker
                v-model="colorHead"
                :canvas-height="130"
              ></v-color-picker>
            </div>
          </v-col>

          <v-col>
            <v-card-title class="pt-0">
              テキストの色
            </v-card-title>

            <div class="d-flex justify-center">
              <v-color-picker
                v-model="colorText"
                :canvas-height="130"
              ></v-color-picker>
            </div>
          </v-col>
        </v-row>

        <SendCard
          :card-color="colorHead"
          :card-title="title"
          :card-text-color="colorText"
          :card-pay="pay"
          :user-img="userImg"
          :user-name="userName"
          class="mt-4"
        />

        <SendTransferBtn :val-pay="pay" @send="send" />
      </div>
    </v-card>
  </v-tab-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import SendCard from '@/components/Card/SendCard.vue'
import SendTransferBtn from '@/components/Btn/SendTransferBtn.vue'
import { firestore, fieldValue, timestamp } from '@/plugins/firebase'

@Component({
  components: {
    SendCard,
    SendTransferBtn
  },
  computed: {
    sendUserName(): string {
      return this.$store.state.transfer.sendUserName
    }
  }
})
export default class TransferCard extends Vue {
  result: string = ''
  colorHead: string = '#FFFFFF'
  colorText: string = '#000000'
  pay: number = 0
  title: string = ''

  async onDecode(results: string) {
    this.result = results
    await this.$store.dispatch('transfer/searchUser', this.result)
  }

  @Prop({ required: true, default: 0 })
  tab!: number

  @Prop({ required: true, default: 0 })
  maxPay!: number

  @Prop({ required: true, default: '' })
  userName!: string

  @Prop({ required: true, default: '' })
  userImg!: string

  @Prop({ required: true, default: '' })
  private userUid!: string

  async send() {
    this.$store.commit('transfer/SET_LOADING', true)
    await firestore
      .collection('user')
      .doc(this.result)
      .collection('transfer')
      .add({
        backColor: this.colorHead,
        textColor: this.colorText,
        img: this.userImg,
        userName: this.userName,
        text: this.title,
        pay: this.pay,
        createdAt: timestamp
      })
      .then(() => {
        this.$store.commit('transfer/SET_LOADING', false)
        this.$store.commit('transfer/SET_DIALOG', false)
        this.$store.commit('transfer/SET_SNACKBAR', true)
        firestore
          .collection('user')
          .doc(this.userUid)
          .set(
            {
              pay: fieldValue.increment(-this.pay)
            },
            { merge: true }
          )
        firestore
          .collection('user')
          .doc(this.result)
          .set(
            {
              pay: fieldValue.increment(this.pay)
            },
            { merge: true }
          )
        this.clear()
      })
  }

  clear() {
    this.result = ''
    this.colorHead = '#FFFFFF'
    this.colorText = '#000000'
    this.pay = 0
    this.title = ''
  }
}
</script>
