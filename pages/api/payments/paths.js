import { initializeApp } from "firebase/app";
import {getFirestore, collection, query, where, getDocs} from "firebase/firestore"
import {propertyID} from "public/constants.mjs"

const firebaseConfig = {
    apiKey: "AIzaSyDPGmgTxlAsVkakZrGbs8NTF2r0RcWu_ig",
    authDomain: "luminous-lambda-364207.firebaseapp.com",
    projectId: "luminous-lambda-364207",
    storageBucket: "luminous-lambda-364207.appspot.com",
    messagingSenderId: "518969290682",
    appId: "1:518969290682:web:d7be744cb378ec83d4f783"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()

async function fetchUnpaidObjArray() {
    const unpaidCol = query( collection(db, "/units/" + propertyID +"/payments"), where("status", "==", "unpaid"))
    return new Promise(function(resolve, reject) {
        getDocs(unpaidCol).then(snapshot => {
            let unpaid = [];
            snapshot.docs.forEach(elem => unpaid.push(elem.data()))
            let paths = [];
            for(let elem in unpaid) {
                paths.push({params: {paymentURL: unpaid[elem].url}})

            }
            resolve(paths)
        })
    })
}

export default async function handler(req, res) {
    let data = await fetchUnpaidObjArray()
    res.status(200).json(data)
}
