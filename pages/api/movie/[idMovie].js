// pages/api/movies/[idMovie].js
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { idMovie } = req.query;

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    switch (req.method) {
        case 'GET':
            try {
                const movie = await db.collection("movies").findOne({ _id: ObjectId(idMovie) });
                if (!movie) {
                    return res.status(404).json({ status: 404, message: "Movie not found" });
                }
                res.status(200).json({ status: 200, data: movie });
            } catch (error) {
                console.error(error);
                res.status(500).json({ status: 500, message: "Internal Server Error" });
            }
            break;
        case 'PUT':
            try {
                const data = req.body;
                await db.collection("movies").updateOne({ _id: ObjectId(idMovie) }, { $set: data });
                res.status(200).json({ status: 200, message: "Movie updated successfully" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ status: 500, message: "Internal Server Error" });
            }
            break;
        case 'DELETE':
            try {
                await db.collection("movies").deleteOne({ _id: ObjectId(idMovie) });
                res.status(200).json({ status: 200, message: "Movie deleted successfully" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ status: 500, message: "Internal Server Error" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
