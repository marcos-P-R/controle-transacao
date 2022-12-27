import admin from "firebase-admin";

export async function authenticateToken(req, res, next) {
    const jwt = req.headers.authorization;
    if (!jwt) {
        res.status(401).json({message: "Usuario não encontrado"});
        return;
    }

    let decodeIdToken = "";
    try {
        decodeIdToken = await admin.auth().verifyIdToken(jwt, true);
    } catch (error) {
        res.status(401).json({message: "Usuario não encontrado"});
        return;
    }

    req.user = {
        uid: decodeIdToken.sub
    }

    next();
}