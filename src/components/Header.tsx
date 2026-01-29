import Link from 'next/link';

export default function Header() {
    return (
        <header className="glass" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: '1rem 0',
            transition: 'all 0.3s ease'
        }}>
            <div className="container header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link href="/" style={{
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-primary)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem' // increased gap
                }}>
                    <img src="/logo.png" alt="Logo SMAN 1 Belitang" style={{ height: '50px', width: 'auto', maxHeight: '50px' }} />
                    <span style={{ fontSize: '1.2rem', letterSpacing: '1px', lineHeight: '1.2' }}>SMAN 1 BELITANG</span>
                </Link>
                <nav>
                    <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0 }}>
                        <li>
                            <Link href="/" className="btn btn-secondary" style={{ background: 'transparent', boxShadow: 'none', color: 'var(--color-text)' }}>
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <Link href="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: '50px' }}>
                                Masuk
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
