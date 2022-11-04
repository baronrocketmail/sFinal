import { initializeApp } from "firebase/app";
import {getFirestore, collection, query, where, getDocs} from "firebase/firestore"

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

async function fetchPropertyInfoObj(propertyid) {
    const propertyInfoCollection = collection(db, "/units/" + propertyid +"/info")
    return new Promise(function(resolve, reject) {
        getDocs(propertyInfoCollection).then(snapshot => {
            let unpaidArry = [];
            snapshot.docs.forEach(elem => unpaidArry.push(elem.data()))
            resolve(... unpaidArry)
        })
    })
}

export default async function handler(req,res) {
    const {propertyid} = req.headers
    let data = await fetchPropertyInfoObj(propertyid)
    res.status(200).json(data)
}
