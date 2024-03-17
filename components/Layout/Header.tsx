const Header = () => {
    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <span style={styles.logo}>MFlix</span>
                <div style={styles.menu}>
                    <button style={styles.button}>Se connecter</button>
                    <button style={styles.button}>S'inscrire</button>
                </div>
            </div>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#333',
        color: 'white',
        padding: '20px 0',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
        fontFamily: 'Arial, sans-serif',
    },
    menu: {
        display: 'flex',
    },
    button: {
        marginLeft: '10px',
        padding: '10px 20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'transparent',
        border: '1px solid white',
        color: 'white',
        borderRadius: '5px',
        cursor: 'pointer',
    },
} as const;

export default Header;
