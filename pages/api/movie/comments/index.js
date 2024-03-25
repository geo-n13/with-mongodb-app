import auth from '../../../../middleware/auth';
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        return auth(req, res, () => postComment(req, res));
    }
    return getComments(req, res);
}

async function getComments(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    try {
        const { movieId } = req.query;
        if (!ObjectId.isValid(movieId)) {
            return res.status(400).json({ status: 400, message: "Invalid movie ID format" });
        }
        const comments = await db.collection("comments").find({ movie_id: new ObjectId(movieId) }).toArray();
        res.status(200).json({ status: 200, data: comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}

async function postComment(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const { movieId, name, email, text } = req.body;

    try {
        const comment = {
            movie_id: new ObjectId(movieId),
            name,
            email,
            text,
            date: new Date(),
        };
        const response = await db.collection("comments").insertOne(comment);
        if (response.acknowledged) {
            comment._id = response.insertedId;
            res.status(201).json({ status: 201, data: comment });
        } else {
            res.status(500).json({ status: 500, message: "Failed to insert comment" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}
