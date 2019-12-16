import * as Vuex from 'vuex'
import { auth } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  loading: boolean,
  successSnackbar: boolean,
  errorSnackbar: boolean,
}

export const state = (): IState => ({
  loading: false,
  successSnackbar: false,
  errorSnackbar: false
})

export const mutations = {
  SET_LOADING(state: IState, payload: boolean) {
    state.loading = payload
  },

  SET_SUCCESS_SNACKBAR(state: IState, payload: boolean) {
    state.successSnackbar = payload
  },

  SET_ERROR_SNACKBAR(state: IState, payload: boolean) {
    state.errorSnackbar = payload
  }
}

export const actions = {
  async login(
    dispatch: ICommit,
    payload: { email: string, password: string }
  ) {
    await auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        dispatch.commit('SET_LOADING', false)

        dispatch.commit('SET_SUCCESS_SNACKBAR', true)
      })
      .catch(() => {
        dispatch.commit('SET_LOADING', false)
        dispatch.commit('SET_ERROR_SNACKBAR', true)
      })
  }
}
