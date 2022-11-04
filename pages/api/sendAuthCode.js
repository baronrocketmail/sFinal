import { getAuth, sendSignInLinkToEmail , onAuthStateChanged, signInWithEmailLink, isSignInWithEmailLink, signOut} from "firebase/auth";
import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDPGmgTxlAsVkakZrGbs8NTF2r0RcWu_ig",
    authDomain: "luminous-lambda-364207.firebaseapp.com",
    projectId: "luminous-lambda-364207",
    storageBucket: "luminous-lambda-364207.appspot.com",
    messagingSenderId: "518969290682",
    appId: "1:518969290682:web:d7be744cb378ec83d4f783"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

async function sendAuthEmail(email, url){
    sendSignInLinkToEmail(auth, email, {url: url, handleCodeInApp: true})
}

export default function handler(req, res){
    let body = req.body
    if (typeof body.email != undefined){
        sendAuthEmail(body.email, body.url).then(  res.status(200).json({"sent to: ": body.email}) )
    }
    res.status(500).json("server error")
}
