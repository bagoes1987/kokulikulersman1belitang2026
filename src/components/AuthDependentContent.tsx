'use client';

import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL_PLACEHOLDER',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY_PLACEHOLDER'
);

export default function AuthDependentContent() {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

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

    // PUBLIC VIEW (NOT LOGGED IN): Show Detailed Info
    return (
        <div className="animate-slide-up" style={{ marginBottom: '6rem' }}>

            {/* I. INFORMASI UMUM */}
            <section className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.8rem', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    I. INFORMASI UMUM
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', fontSize: '1.1rem' }}>
                    <p><strong>Nama Satuan Pendidikan:</strong> SMA Negeri 1 Belitang</p>
                    <p><strong>Kelas :</strong> X, XI, dan XII</p>
                    <p><strong>Tema:</strong> Cita Rasa Nusantara</p>
                    <p><strong>Bentuk Kegiatan:</strong> Pembelajaran Kolaboratif Lintas Disiplin Ilmu</p>
                    <p><strong>Alokasi Waktu:</strong> 3 Hari Efektif</p>
                    <p><strong>Lokasi Kegiatan:</strong> Ruang Kelas dan Lapangan Utama SMAN 1 Belitang</p>
                </div>
            </section>

            {/* II. TUJUAN PEMBELAJARAN (Was III) */}
            <section className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.8rem', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    II. TUJUAN PEMBELAJARAN
                </h3>
                <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}>Kegiatan kokurikuler ini bertujuan untuk menguatkan kompetensi murid agar:</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {[
                        'Mampu melakukan inovasi pengolahan makanan khas Nusantara dengan mempertimbangkan nilai ekonomis dan perhitungan Break Even Point (BEP).',
                        'Mampu menganalisis dan menjelaskan kandungan gizi serta higienitas bahan pangan yang digunakan.',
                        'Mampu memanfaatkan teknologi digital untuk strategi pemasaran dan berkomunikasi secara persuasif kepada publik.'
                    ].map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem' }}>
                            <span style={{ color: 'var(--color-secondary)', fontSize: '1.5rem', lineHeight: 1 }}>➤</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* III. DIMENSI PROFIL LULUSAN (Was II) */}
            <section className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.8rem', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    III. DIMENSI PROFIL LULUSAN
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '1.5rem' }}>
                        <strong style={{ color: 'var(--color-accent)', fontSize: '1.2rem' }}>Kreativitas</strong>
                        <p style={{ marginTop: '0.5rem' }}>Murid mampu menghasilkan gagasan orisinal dan inovatif dalam menciptakan produk olahan, merumuskan solusi usaha, serta melakukan perhitungan BEP untuk menilai kelayakan produk.</p>
                    </li>
                    <li>
                        <strong style={{ color: 'var(--color-accent)', fontSize: '1.2rem' }}>Komunikasi</strong>
                        <p style={{ marginTop: '0.5rem' }}>Murid mampu berkomunikasi secara efektif dan beretika serta mempresentasikan kandungan gizi produk olahan secara menarik untuk meningkatkan minat beli.</p>
                    </li>
                </ul>
            </section>

            {/* IV. KEMITRAAN PEMBELAJARAN */}
            <section className="glass-card" style={{ padding: '3rem', marginBottom: '4rem' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.8rem', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    IV. KEMITRAAN PEMBELAJARAN (INTERNAL)
                </h3>
                <p style={{ marginBottom: '1.5rem' }}>Kegiatan ini melibatkan kolaborasi antar guru mata pelajaran sebagai berikut:</p>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <strong style={{ color: '#2F1B10', fontSize: '1.15rem' }}>Guru PKWU</strong>
                        <p>Membimbing inovasi resep makanan agar memiliki daya tarik pasar dan mengajari teknik perhitungan BEP (modal, harga jual, dan laba).</p>
                    </div>
                    <div>
                        <strong style={{ color: '#2F1B10', fontSize: '1.15rem' }}>Guru TIK</strong>
                        <p>Mendampingi pembuatan konten digital kreatif melalui video promosi, status WhatsApp, dan konten Instagram untuk pemasaran produk.</p>
                    </div>
                    <div>
                        <strong style={{ color: '#2F1B10', fontSize: '1.15rem' }}>Guru Biologi</strong>
                        <p>Memberikan edukasi terkait kandungan gizi (karbohidrat, protein, lemak, vitamin) serta kalori dari bahan masakan yang dipilih.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section - Moved to Bottom */}
            <div className="glass-card" style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                borderTop: '5px solid var(--color-primary)',
                background: 'rgba(255, 255, 255, 0.95)'
            }}>
                <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                    Siap Memulai Kegiatan?
                </h2>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                    Silakan masuk untuk mengakses materi lengkap kegiatan, LKPD, dan tugas harian.
                </p>
                <Link href="/login" className="btn btn-primary" style={{ borderRadius: '50px', padding: '1rem 3rem', fontSize: '1.2rem', boxShadow: '0 4px 15px rgba(139, 69, 19, 0.3)' }}>
                    Masuk Sekarang
                </Link>
            </div>
        </div>
    );
}
