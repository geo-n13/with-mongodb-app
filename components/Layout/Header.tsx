import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <Link href="/" passHref>
                    <Image
                        src="/logo.png"
                        alt="MFLIX" 
                        width={125} 
                        height={125}
                    />
                </Link>

                <div style={styles.menu}>
                    <Link href="/login" passHref>
                        <button style={styles.button}>Se connecter</button>
                    </Link>
                    <Link href="/register" passHref>
                        <button style={styles.button}>S'inscrire</button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#333',
        color: 'white',
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
        /** Insert styles */
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
