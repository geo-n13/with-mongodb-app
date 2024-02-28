// pages/api/movie/comments/index.js
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb"; // Importer ObjectId

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    if (req.method === 'GET') {
        try {
            const { movieId } = req.query; // Récupère movieId depuis les paramètres de requête

            // Validation de l'ID du film
            if (!movieId || movieId.length !== 24 || !/^[0-9a-fA-F]+$/.test(movieId)) {
                return res.status(400).json({ status: 400, message: "Invalid movie ID format" });
            }

            // Utilisation de ObjectId pour convertir movieId en un objet utilisable par MongoDB
            const comments = await db.collection("comments").find({ movie_id: new ObjectId(movieId) }).toArray();

            res.status(200).json({ status: 200, data: comments });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    } else if (req.method === 'POST') {
        try {
            const { movieId, name, email, text } = req.body;

            // Validation basique des données entrantes
            if (!movieId || !name || !email || !text) {
                return res.status(400).json({ status: 400, message: "Missing required comment fields" });
            }

            // Insertion du nouveau commentaire dans la collection
            const comment = {
                movie_id: new ObjectId(movieId),
                name,
                email,
                text,
                date: new Date()
            };
            const response = await db.collection("comments").insertOne(comment);

            // Vérifier si l'insertion a été reconnue et utiliser insertedId pour la réponse
            if (response.acknowledged) {
                comment._id = response.insertedId; // Ajoute l'ID généré au document de commentaire
                res.status(201).json({ status: 201, data: comment });
            } else {
                // Gestion des cas où l'insertion n'a pas été reconnue
                res.status(500).json({ status: 500, message: "Failed to insert comment" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    }

}
