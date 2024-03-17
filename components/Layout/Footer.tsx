const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p style={styles.text}>© 2024 MFlix. All rights reserved.</p>
        </footer>
    );
};

const styles = {
    footer: {
        width: '100%',
        backgroundColor: '#333',
        color: 'white',
        textAlign: 'center' as const,
        padding: '20px 0',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    text: {
        margin: 0,
        padding: 0,
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
    },
} as const;

export default Footer;
