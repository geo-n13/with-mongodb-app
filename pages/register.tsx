import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import RegisterForm from '../components/Auth/RegisterForm';

const Login = () => {
    return (
        <div style={styles.container}>
            <Head>
                <title>Inscription</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main style={styles.main}>
                <h1 style={styles.title}>Inscrivez-vous !</h1>

                <div style={styles.formContainer}>
                    <RegisterForm />
                </div>
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
        fontSize: '2rem',
        textAlign: 'center' as const,
        fontFamily: 'Arial, sans-serif',
    },
    formContainer: {
        margin: '20px 0',
    },
};

export default Login;