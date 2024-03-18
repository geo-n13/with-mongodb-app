import React, { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Ici, vous traiteriez la connexion, par exemple en faisant une requête à votre API d'authentification
        console.log('Login with:', email, password);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
                <label htmlFor="email" style={styles.label}>Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
            </div>
            <div style={styles.field}>
                <label htmlFor="password" style={styles.label}>Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
            </div>
            <button type="submit" style={styles.button}>Login</button>
        </form>
    );
};

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: '20px',
    },
    field: {
        display: 'flex',
        flexDirection: 'column' as const,
        width: '100%',
    },
    label: {
        marginBottom: '5px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default LoginForm;
