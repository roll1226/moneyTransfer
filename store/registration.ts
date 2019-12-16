import * as Vuex from 'vuex'
import { auth, firestore } from '@/plugins/firebase'
import * as uuid from 'uuid';

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  loading: boolean,
  successSnackbar: boolean,
  errorSnackbar: boolean,
  dialog: boolean
}

export const state = (): IState => ({
  loading: false,
  successSnackbar: false,
  errorSnackbar: false,
  dialog: false
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
  },

  SET_DIALOG(state: IState, payload: boolean) {
    state.dialog = payload
  }
}

export const actions = {
  async registration(
    dispatch: ICommit,
    payload: { email: string, password: string, name: string }
  ) {
    await auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((res: any) => {

        firestore.collection("user").doc(res.user.uid).set({
          name: payload.name,
          uid: uuid.v4().split('-').join(''),
          img: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light',
          pay: 20000
        }). then(() => {
          dispatch.commit('SET_LOADING', false)
          dispatch.commit('login/SET_SUCCESS_SNACKBAR', true, { root: true })
          dispatch.commit('SET_DIALOG', false)
        })
      })
      .catch(() => {
        dispatch.commit('SET_LOADING', false)
        dispatch.commit('SET_ERROR_SNACKBAR', true)
      })
  }
}
