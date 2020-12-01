import Link from 'next/link';
import { useCredentials } from '../context/CredentialsContext';
import styles from '../styles/Home.module.css';

export default function Home() {
	const [Credentials] = useCredentials();
	return (
		<div className={styles.container}>
			{Credentials ? (
				<Link href='/app'>
					<a>See Lists</a>
				</Link>
			) : (
				<>
					<Link href='/register'>
						<a>Register</a>
					</Link>
					<Link href='/login'>
						<a>Login</a>
					</Link>
				</>
			)}
		</div>
	);
}
