// pages/api/movies/index.js

import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    if (req.method === 'GET') {
        try {
            const movies = await db.collection("movies").find({}).limit(20).toArray();
            res.status(200).json({ status: 200, data: movies });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    } else if (req.method === 'POST') {
        try {
            const { title, genres, runtime, cast, plot } = req.body;

            // Validation basique des données entrantes
            if (!title || !genres || !runtime || !cast || !plot) {
                return res.status(400).json({ status: 400, message: "Missing required movie fields" });
            }

            // Insertion du nouveau film dans la collection
            const movie = {
                title,
                genres,
                runtime,
                cast,
                plot,
                created_at: new Date()
            };
            const response = await db.collection("movies").insertOne(movie);

            // Vérifier si l'insertion a réussi
            if (response.acknowledged) {
                // Retourne les détails du film créé avec un statut 201.
                res.status(201).json({ status: 201, data: movie });
            } else {
                // Gestion des cas où l'insertion n'a pas réussi
                res.status(500).json({ status: 500, message: "Failed to insert movie" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    } else {
        // Gère les méthodes non autorisées
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
