import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  loading: boolean,
  dialog: boolean,
  sendUserName: string,
  snackbar: boolean
}

export const state = (): IState => ({
  loading: false,
  dialog: false,
  sendUserName: '',
  snackbar: false
})

export const mutations = {
  SET_LOADING(state: IState, payload: boolean) {
    state.loading = payload
  },

  SET_DIALOG(state: IState, payload: boolean) {
    state.dialog = payload
  },

  SET_SEND_USER_NAME(state: IState, payload: string) {
    state.sendUserName = payload
  },

  SET_SNACKBAR(state: IState, payload: boolean) {
    state.snackbar = payload
  }
}

export const actions = {
  async searchUser(
    dispatch: ICommit,
    payload: string
  ) {
    await firestore
      .collection('user')
      .doc(payload)
      .get()
      .then(async (doc: any) => {
        if (doc.exists) {
          dispatch.commit('SET_SEND_USER_NAME', doc.data().name)
        }
      })
  }
}
