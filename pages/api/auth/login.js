const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../../models/user');

export default async (req, res) => {
    // Vérifier si la requête est bien une POST
    if (req.method !== 'POST') {
        return res.status(405).end('Méthode non autorisée');
    }

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur', error: error.message });
    }
};
