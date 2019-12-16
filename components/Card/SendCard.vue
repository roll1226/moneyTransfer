<template>
  <div class="px-2">
    <v-card max-width="400" class="mx-auto" :color="cardColor">
      <v-card-title>
        <v-icon large left :style="`color: ${cardTextColor};`">
          fas fa-coins
        </v-icon>
        <span
          class="title font-weight-light ml-1"
          :style="`color: ${cardTextColor};`"
        >
          {{ cardPay.toLocaleString() }} 円
        </span>
      </v-card-title>

      <v-card-title class="pt-0 subtitle-1" :style="`color: ${cardTextColor};`">
        {{ cardTitle }}</v-card-title
      >

      <v-card-actions class="white py-0">
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img class="elevation-6" :src="userImg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ userName }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class SendCard extends Vue {
  @Prop({ required: true, default: '' })
  cardColor!: string

  @Prop({ required: true, default: '' })
  cardTitle!: string

  @Prop({ required: true, default: '' })
  cardTextColor!: string

  @Prop({ required: true, default: 0 })
  cardPay!: 0

  @Prop({ required: true, default: '' })
  userName!: string

  @Prop({ required: true, default: '' })
  userImg!: string
}
</script>
