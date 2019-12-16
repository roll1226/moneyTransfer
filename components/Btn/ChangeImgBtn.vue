<template>
  <div>
    <v-btn icon @click="dialog = true">
      <v-icon>
        fas fa-cog
      </v-icon>
    </v-btn>

    <div>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline success white--text" primary-title>
            アイコン変更
          </v-card-title>

          <v-form class="px-4" @submit.prevent="getFileName">
            <v-container class="py-0 px-0">
              <v-row>
                <v-col cols="12" class="pb-0 d-flex justify-center">
                  <v-img
                    :src="setImg"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="300"
                    max-height="300"
                  ></v-img>
                </v-col>

                <v-col cols="12" class="pb-0">
                  <v-file-input
                    v-model="file"
                    accept="image/*"
                    label="File input"
                    @change="createImage"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-container>

            <v-card-actions class="d-flex justify-center">
              <v-btn color="success" :loading="loading" type="submit">
                変更
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import * as uuid from 'uuid'
import { storage, firestore } from '@/plugins/firebase'

@Component
export default class reservation extends Vue {
  file?: any = null
  dialog: boolean = false
  loading: boolean = false
  setImg: string = ''

  @Prop({ required: true, default: '' })
  uploadedImage!: string

  @Prop({ required: true, default: '' })
  private userUid!: string

  @Watch('uploadedImage')
  setImage() {
    this.setImg = this.uploadedImage
  }

  getFileName() {
    // this.createImage(this.file)
    this.loading = true
    storage
      .ref()
      .child(
        `userIcom/${uuid
          .v4()
          .split('-')
          .join('')}`
      )
      .put(this.file)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL: string) => {
          firestore
            .collection('user')
            .doc(this.userUid)
            .update({
              img: downloadURL
            })
            .then(() => {
              this.loading = false
              this.dialog = false
              this.file = null
            })
        })
      })
  }

  createImage(file: any) {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      this.setImg = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>
