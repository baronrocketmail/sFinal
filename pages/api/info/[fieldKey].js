import {collection, query, where, getDoc, doc, getFirestore} from "firebase/firestore"
import {propertyID} from "public/constants.mjs"
import {initializeApp} from "firebase/app";
import {db} from "../firestoreInit";

export default async function handler(req,res){
    const {fieldKey} = req.query

    if (req.method === "POST"){
        const {body} = req.body


    } else {
        const fieldValue = await getInfo().then(info => info[fieldKey])
        if (typeof fieldValue === "undefined") res.status(404).json("404: key " + fieldKey + " not found in " +propertyID+ " info obj")
        else res.status(200).json(fieldValue)
    }
}

async function getInfo(){
    const fieldValue = await getDoc(doc(db, "/units/18572 Cull Canyon Rd/info", "info" )).then(snapshot => snapshot.data())
    return new Promise(function (resolve, reject){
        resolve(fieldValue)
    })
}
