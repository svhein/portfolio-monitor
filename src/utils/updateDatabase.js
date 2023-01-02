import {auth, database} from '../utils/firebase-config';
import { ref, set } from "firebase/database";
// import { useSelector } from 'react-redux'
import {store} from '../index.js'

// Send redux store content to database
export function UpdateDatabase(){
    const storeData = store.getState().tickers;
    // storeInitialized returns boolean based on whether redux store
    // has got data from realtime db
    const storeInitialized = store.getState().IsInitialized

    if (storeInitialized && auth.currentUser){
        const uid = auth.currentUser.uid;
        const reference = ref((database), `users/${uid}/portfolios/main`);
        console.log('Updating database...')
        set(reference, storeData)
    }
}

