import { auth, firestore } from '@/plugins/firebase'

export default function ({redirect}: { redirect: any }) {
  auth.onAuthStateChanged(function(user) {
    if(user) {
      //ログイン状態
      firestore.collection('user').doc(user.uid)
        .get()
        .then((res: any) => {
          if (res.exists) {
            return redirect(`/${res.data().uid}/user`)
          } else {
            return redirect('/')
          }
        })
    }else{
      //ログアウト状態
    }
  });
}
