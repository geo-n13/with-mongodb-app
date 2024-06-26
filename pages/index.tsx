import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import clientPromise from '../lib/mongodb';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

type Props = {
    isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try {
        await clientPromise;
        return { props: { isConnected: true } };
    } catch (e) {
        console.error(e);
        return { props: { isConnected: false } };
    }
};

const Home = ({
    isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div style={styles.container}>
            <Head>
                <title>Accueil</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main style={styles.main}>
                <h1 style={styles.title}>Bienvenue sur MFlix</h1>

                <p style={styles.description}>
                    Pour commencer, vous pouvez vous inscrire ou vous connecter.
                </p>

                <p style={{
                    ...styles.connection,
                    backgroundColor: isConnected ? 'green' : 'red',
                }}>
                    {isConnected ? 'Connecté à MongoDB.' : 'La base MongoDB est injoignable.'}
                </p>
            </main>

            <Footer />
        </div>
    );
};

const styles = {
    container: {
        padding: '0 0.5rem',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        marginTop: '15rem',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        margin: '0',
        lineHeight: '1.15',
        fontSize: '4rem',
        textAlign: 'center' as const,
        fontFamily: 'Arial, sans-serif',
    },
    description: {
        textAlign: 'center' as const,
        fontSize: '2rem',
    },
    connection: {
        position: 'fixed' as const,
        bottom: '20px',
        right: '20px',
        backgroundColor: '#ccc',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
        fontFamily: 'Arial, sans-serif',
        zIndex: 1000,
    },
};

export default Home;
