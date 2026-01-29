'use client';

import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// NOTE: In a real production app, use SessionContextProvider.
// For this quick iteration/prototype, we use a direct client.
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL_PLACEHOLDER',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY_PLACEHOLDER'
);

export default function AuthDependentContent() {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Listen for changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return <div className="text-center p-10">Loading...</div>;
    }

    // LOGGED IN VIEW: Show Activity Cards
    if (session) {
        return (
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2.5rem',
                marginBottom: '6rem'
            }}>
                {['Eksplorasi & Ideasi', 'Produksi & Promosi', 'Panen Raya'].map((title, index) => (
                    <div key={index} className={`glass-card animate-slide-up delay-${(index + 1) * 100}`} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: 'white',
                            marginBottom: '1.5rem',
                            boxShadow: '0 10px 20px rgba(139, 69, 19, 0.3)'
                        }}>
                            {index + 1}
                        </div>
                        <h2 style={{ color: 'var(--color-primary)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Day {index + 1}</h2>
                        <h3 style={{ fontSize: '1.2rem', color: '#6B4E3D', marginBottom: '1rem', fontWeight: '600' }}>{title}</h3>
                        <p style={{ marginBottom: '2rem', flexGrow: 1, lineHeight: '1.6', color: '#555' }}>
                            {index === 0 && 'Menggali potensi kuliner nusantara melalui riset dan ideasi kreatif.'}
                            {index === 1 && 'Mengolah rasa authentik dan menyusun strategi pemasaran digital yang modern.'}
                            {index === 2 && 'Market Day: Gelar karya wirausaha dan apresiasi seni kuliner.'}
                        </p>
                        <Link href={`/days/${index + 1}`} className="btn btn-primary" style={{
                            width: '100%',
                            borderRadius: '50px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontSize: '0.9rem'
                        }}>
                            Mulai Kegiatan
                        </Link>
                    </div>
                ))}
            </div>
        );
    }

    // PUBLIC VIEW (NOT LOGGED IN): Show Info Text
    return (
        <div className="glass-card animate-slide-up" style={{
            padding: '3rem',
            marginBottom: '6rem',
            textAlign: 'center',
            borderLeft: '5px solid var(--color-primary)' // Accent to make it pop
        }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
                Tentang Kokurikuler
            </h2>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: '#555', maxWidth: '800px', margin: '0 auto' }}>
                Kokurikuler merupakan kegiatan pembelajaran yang dilaksanakan untuk penguatan,
                pendalaman, dan/atau pengayaan kegiatan Intrakurikuler dalam rangka pengembangan kompetensi,
                terutama penguatan karakter.
            </p>
            <div style={{ marginTop: '2rem' }}>
                <Link href="/login" className="btn btn-primary" style={{ borderRadius: '50px', padding: '0.8rem 2rem' }}>
                    Masuk untuk Mengakses Materi
                </Link>
            </div>
        </div>
    );
}
