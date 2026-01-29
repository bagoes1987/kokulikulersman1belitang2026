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
                        position: 'relative',
                        overflow: 'hidden',
                        height: '100%'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            color: 'white',
                            marginBottom: '1.5rem',
                            boxShadow: '0 10px 20px rgba(139, 69, 19, 0.25)'
                        }}>
                            {index + 1}
                        </div>
                        <h2 style={{ color: 'var(--color-primary)', fontSize: '1.75rem', marginBottom: '0.5rem' }}>Day {index + 1}</h2>
                        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-light)', marginBottom: '1rem', fontWeight: '600' }}>{title}</h3>
                        <p style={{ marginBottom: '2rem', flexGrow: 1, lineHeight: '1.6', color: 'var(--color-text-light)' }}>
                            {index === 0 && 'Menggali potensi kuliner nusantara melalui riset dan ideasi kreatif.'}
                            {index === 1 && 'Mengolah rasa authentik dan menyusun strategi pemasaran digital yang modern.'}
                            {index === 2 && 'Market Day: Gelar karya wirausaha dan apresiasi seni kuliner.'}
                        </p>
                        <Link href={`/days/${index + 1}`} className="btn btn-primary" style={{ width: '100%' }}>
                            Mulai Kegiatan
                        </Link>
                    </div>
                ))}
            </div>
        );
    }

    // PUBLIC VIEW (NOT LOGGED IN): Modern Layout
    return (
        <div className="animate-slide-up" style={{ marginBottom: '6rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

            {/* I. INFORMASI UMUM */}
            <section className="glass-card">
                <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                    <h3 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', margin: 0 }}>
                        I. INFORMASI UMUM
                    </h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem', fontSize: '1.1rem' }}>
                    <InfoRow label="Nama Satuan Pendidikan" value="SMA Negeri 1 Belitang" />
                    <InfoRow label="Kelas" value="X, XI, dan XII" />
                    <InfoRow label="Tema" value="Cita Rasa Nusantara" />
                    <InfoRow label="Bentuk Kegiatan" value="Pembelajaran Kolaboratif Lintas Disiplin Ilmu" />
                    <InfoRow label="Alokasi Waktu" value="3 Hari Efektif" />
                    <InfoRow label="Lokasi Kegiatan" value="Ruang Kelas dan Lapangan Utama SMAN 1 Belitang" />
                </div>
            </section>

            {/* II. TUJUAN PEMBELAJARAN */}
            <section className="glass-card">
                <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                    <h3 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', margin: 0 }}>
                        II. TUJUAN PEMBELAJARAN
                    </h3>
                </div>
                <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--color-text-light)' }}>
                    Kegiatan kokurikuler ini bertujuan untuk menguatkan kompetensi murid agar:
                </p>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {[
                        'Mampu melakukan inovasi pengolahan makanan khas Nusantara dengan mempertimbangkan nilai ekonomis dan perhitungan Break Even Point (BEP).',
                        'Mampu menganalisis dan menjelaskan kandungan gizi serta higienitas bahan pangan yang digunakan.',
                        'Mampu memanfaatkan teknologi digital untuk strategi pemasaran dan berkomunikasi secara persuasif kepada publik.'
                    ].map((item, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'start',
                            gap: '1rem',
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.5)',
                            borderRadius: 'var(--radius-md)'
                        }}>
                            <div style={{
                                minWidth: '24px',
                                height: '24px',
                                background: 'var(--color-secondary)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '0.8rem',
                                marginTop: '2px'
                            }}>✓</div>
                            <span style={{ lineHeight: '1.6' }}>{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* III. DIMENSI PROFIL LULUSAN */}
            <section className="glass-card">
                <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                    <h3 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', margin: 0 }}>
                        III. DIMENSI PROFIL LULUSAN
                    </h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <div style={{ padding: '1.5rem', background: 'var(--color-background)', borderRadius: 'var(--radius-md)' }}>
                        <strong style={{ color: 'var(--color-primary)', fontSize: '1.25rem', display: 'block', marginBottom: '0.5rem' }}>✨ Kreativitas</strong>
                        <p style={{ lineHeight: '1.6', color: 'var(--color-text-light)' }}>Murid mampu menghasilkan gagasan orisinal dan inovatif dalam menciptakan produk olahan, merumuskan solusi usaha, serta melakukan perhitungan BEP untuk menilai kelayakan produk.</p>
                    </div>
                    <div style={{ padding: '1.5rem', background: 'var(--color-background)', borderRadius: 'var(--radius-md)' }}>
                        <strong style={{ color: 'var(--color-primary)', fontSize: '1.25rem', display: 'block', marginBottom: '0.5rem' }}>🗣️ Komunikasi</strong>
                        <p style={{ lineHeight: '1.6', color: 'var(--color-text-light)' }}>Murid mampu berkomunikasi secara efektif dan beretika serta mempresentasikan kandungan gizi produk olahan secara menarik untuk meningkatkan minat beli.</p>
                    </div>
                </div>
            </section>

            {/* IV. KEMITRAAN PEMBELAJARAN */}
            <section className="glass-card">
                <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                    <h3 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', margin: 0 }}>
                        IV. KEMITRAAN PEMBELAJARAN (INTERNAL)
                    </h3>
                </div>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <TeacherRole title="Guru PKWU" desc="Membimbing inovasi resep makanan agar memiliki daya tarik pasar dan mengajari teknik perhitungan BEP (modal, harga jual, dan laba)." />
                    <TeacherRole title="Guru TIK" desc="Mendampingi pembuatan konten digital kreatif melalui video promosi, status WhatsApp, dan konten Instagram untuk pemasaran produk." />
                    <TeacherRole title="Guru Biologi" desc="Memberikan edukasi terkait kandungan gizi (karbohidrat, protein, lemak, vitamin) serta kalori dari bahan masakan yang dipilih." />
                </div>
            </section>

            {/* CTA Section - Modern Hero Style */}
            <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, #6d360f 100%)',
                color: 'white',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                marginTop: '2rem'
            }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>
                    Siap Memulai Kegiatan?
                </h2>
                <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', opacity: 0.9 }}>
                    Akses materi lengkap, LKPD, dan tugas harian sekarang juga.
                </p>
                <Link href="/login" className="btn" style={{
                    background: 'white',
                    color: 'var(--color-primary)',
                    padding: '1rem 3rem',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}>
                    Masuk Sekarang
                </Link>
            </div>
        </div>
    );
}

// Helper Components for cleaner code
function InfoRow({ label, value }: { label: string, value: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
            <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>{value}</span>
        </div>
    );
}

function TeacherRole({ title, desc }: { title: string, desc: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingBottom: '1.5rem', borderBottom: '1px dashed var(--color-border)' }}>
            <strong style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>{title}</strong>
            <p style={{ lineHeight: '1.6', color: 'var(--color-text-light)' }}>{desc}</p>
        </div>
    );
}
