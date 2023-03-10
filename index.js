import express, { response } from "express";
import admin from "firebase-admin";

const app = express();

admin.initializeApp({
    credential: admin.credential.cert('./serviceAccountKey.json')
});

app.get('/transaction', async (req, res) => {
    admin.firestore()
    .collection('transactions')
    .where('user.id', '==', decodeIdToken.sub)
    .orderBy('date', 'desc')
    .get()
    .then(snapshot =>{
        const transaction = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }));
        res.json(transaction);
    })
});

app.listen(3001, () => console.log(`http://localhost:3001`));