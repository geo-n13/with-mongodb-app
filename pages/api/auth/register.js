const bcrypt = require('bcrypt');
const User = require('../../../models/user');

export default async (req, res) => {
    // Vérifier si la requête est bien une POST
    if (req.method !== 'POST') {
        return res.status(405).end('Méthode non autorisée');
    }

    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ message: 'Utilisateur créé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur', error: error.message });
    }
};
