'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Hardcoded Admin Check per requirements
        if (email === 'sman1belitang@gmail.com' && password === 'sman1belitang2026') {
            // Simulate admin login (in a real app, use auth or a specific role)
            alert('Login Admin Berhasil!');
            router.push('/dashboard/admin'); // Redirect to admin dashboard (to be created)
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/'); // Redirect using router
            router.refresh(); // Refresh to update auth state
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleLogin} className="auth-box">
            <h2 style={{ textAlign: 'center', color: 'var(--color-primary)' }}>Masuk</h2>
            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

            <div className="form-group">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Loading...' : 'Masuk'}
            </button>
        </form>
    );
}

export function RegisterSiswaForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nama: '',
        nis: '',
        kelas: '',
        fasilitator: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error: signUpError, data } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    full_name: formData.nama,
                    role: 'siswa',
                    nis: formData.nis,
                    kelas: formData.kelas,
                    fasilitator: formData.fasilitator
                }
            }
        });

        if (signUpError) {
            setError(signUpError.message);
        } else {
            alert('Registrasi Berhasil! Silakan cek email untuk verifikasi (jika diaktifkan) atau login.');
            router.push('/login');
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleRegister} className="auth-box">
            <h2 style={{ textAlign: 'center', color: 'var(--color-primary)' }}>Daftar Siswa</h2>
            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

            <div className="form-group"><label className="form-label">Nama Siswa</label><input name="nama" onChange={handleChange} className="form-input" required /></div>
            <div className="form-group"><label className="form-label">NIS</label><input name="nis" onChange={handleChange} className="form-input" required /></div>
            <div className="form-group"><label className="form-label">Kelas</label><input name="kelas" onChange={handleChange} className="form-input" required /></div>
            <div className="form-group"><label className="form-label">Fasilitator Kokulikuler</label><input name="fasilitator" onChange={handleChange} className="form-input" required /></div>
            <div className="form-group"><label className="form-label">Email</label><input name="email" type="email" onChange={handleChange} className="form-input" required /></div>
            <div className="form-group"><label className="form-label">Password</label><input name="password" type="password" onChange={handleChange} className="form-input" required /></div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Mendaftar...' : 'Daftar'}
            </button>
        </form>
    );
}

export function RegisterGuruForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nama: '',
        nip: '',
        fasilitator: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error: signUpError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    full_name: formData.nama,
                    role: 'guru',
                    nip: formData.nip,
                    fasilitator: formData.fasilitator
                }
            }
        });

        if (signUpError) {
            setError(signUpError.message);
        } else {
            alert('Registrasi Guru Berhasil!');
            router.push('/login');
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleRegister} className="auth-box">
            <h2 style={{ textAlign: 'center', color: 'var(--color-primary)' }}>Daftar Guru</h2>
            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

            <div className="form-group"><label className="form-label">Nama Guru</label><input name="nama" onChange={handleChange} className="form-input" required /></div>
            <div className="form-group"><label className="form-label">NIP</label><input name="nip" onChange={handleChange} className="form-input" required /></div>
            <div className="form-group"><label className="form-label">Fasilitator Kelas</label><input name="fasilitator" onChange={handleChange} className="form-input" required /></div>
            <div className="form-group"><label className="form-label">Email</label><input name="email" type="email" onChange={handleChange} className="form-input" required /></div>
            <div className="form-group"><label className="form-label">Password</label><input name="password" type="password" onChange={handleChange} className="form-input" required /></div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Mendaftar...' : 'Daftar'}
            </button>
        </form>
    );
}
