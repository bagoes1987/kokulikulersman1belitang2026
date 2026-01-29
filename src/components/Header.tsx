import Link from 'next/link';
import styles from './Header.module.css'; // We'll create this or use global utils

export default function Header() {
    return (
        <header className="header-container" style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            padding: '1rem 0',
            boxShadow: 'var(--shadow-md)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
                    SMA Negeri 1 Belitang
                </Link>
                <nav>
                    <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
                        <li><Link href="/">Beranda</Link></li>
                        <li><Link href="/login">Masuk</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
