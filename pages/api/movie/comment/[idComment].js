import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import auth from '../../../../middleware/auth';

const handler = async (req, res) => {
    const { idComment } = req.query;

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    if (['PUT', 'DELETE'].includes(req.method)) {
        return auth(req, res, () => protectedMethodHandler(req, res, db, idComment));
    }
    return openMethodHandler(req, res, db, idComment);
}

const openMethodHandler = async (req, res, db, idComment) => {
    try {
        const comment = await db.collection("comments").findOne({ _id: ObjectId(idComment) });
        if (!comment) {
            return res.status(404).json({ status: 404, message: "Comment not found" });
        }
        res.status(200).json({ status: 200, data: comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}

const protectedMethodHandler = async (req, res, db, idComment) => {
    switch (req.method) {
        case 'PUT':
            try {
                const data = req.body;
                await db.collection("comments").updateOne({ _id: ObjectId(idComment) }, { $set: data }, { upsert: true });
                res.status(200).json({ status: 200, message: "Comment updated successfully" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ status: 500, message: "Internal Server Error" });
            }
            break;
        case 'DELETE':
            try {
                const deleteResult = await db.collection("comments").deleteOne({ _id: ObjectId(idComment) });
                if (deleteResult.deletedCount === 0) {
                    return res.status(404).json({ status: 404, message: "Comment not found" });
                }
                res.status(200).json({ status: 200, message: "Comment deleted successfully" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ status: 500, message: "Internal Server Error" });
            }
            break;
        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;
