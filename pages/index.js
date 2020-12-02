import Link from 'next/link';
import styles from '../styles/Home.module.css';
import auth0 from './api/utils/auth0';

export default function Home({ user }) {
	return (
		<div className={styles.container}>
			{user ? (
				<>
					<Link href='/app'>
						<a>See Lists</a>
					</Link>
					<a href='/api/logout'>Logout</a>
				</>
			) : (
				<>
					<Link href='/register'>
						<a>Register</a>
					</Link>
					<a href='/api/login'>Login</a>
				</>
			)}
		</div>
	);
}

export async function getServerSideProps(ctx) {
	const session = await auth0.getSession(ctx.req);

	return {
		props: {
			user: session?.user || null,
		},
	};
}
