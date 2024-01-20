import { initializeApp, applicationDefault } from "firebase-admin/app";
import {getMessaging} from "firebase-admin/messaging"
import dotenv from 'dotenv'
dotenv.config()

process.env.GOOGLE_APPLICATION_CREDENTIALS
initializeApp({
    credential: applicationDefault(),
    projectId: 'ckc-pushnotification'
})

const admin = getMessaging()

export default admin
