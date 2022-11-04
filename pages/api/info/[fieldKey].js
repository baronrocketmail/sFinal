import {collection, query, where, getDoc, doc, getFirestore} from "firebase/firestore"
import {initializeApp} from "firebase/app";
import {db} from "../firestoreInit";

export default async function handler(req,res){
    const {fieldKey} = req.query
    const {propertyid} = req.headers


    if (req.method === "POST"){
        const {body} = req.body


    } else {
        const fieldValue = await getInfo(propertyid).then(info => info[fieldKey])
        if (typeof fieldValue === "undefined") res.status(404).json("404: key " + fieldKey + " not found in " +propertyid+ " info obj")
        else res.status(200).json(fieldValue)
    }
}

async function getInfo(propertyid){
    const fieldValue = await getDoc(doc(db, "/units/"+propertyid+"/info", "info" )).then(snapshot => snapshot.data())
    return new Promise(function (resolve, reject){
        resolve(fieldValue)
    })
}
