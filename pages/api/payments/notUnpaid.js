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

async function fetchNotUnpaidObjArray(){
    return new Promise(function(resolve, reject) {
        const notUnpaidQuery = query(collection(db,"units/" + propertyID +"/payments"), where("status", "!=", "unpaid"))
        getDocs(notUnpaidQuery).then(snapshot => {
            let notUnpaidArry = [];
            snapshot.docs.forEach(elem => notUnpaidArry.push(elem.data()))
            resolve(notUnpaidArry)
        })
    })
}

export default async function handler(req, res) {
    let data = await fetchNotUnpaidObjArray()
    res.status(200).json(data)
}

