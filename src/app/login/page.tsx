import Link from 'next/link';
import { LoginForm } from '@/components/AuthForms';

export default function LoginPage() {
    return (
        <div className="auth-container">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '400px' }}>
                <LoginForm />
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p>Belum punya akun?</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                        <Link href="/register/siswa" className="btn btn-secondary">Daftar Siswa</Link>
                        <Link href="/register/guru" className="btn" style={{ border: '1px solid var(--color-primary)' }}>Daftar Guru</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
