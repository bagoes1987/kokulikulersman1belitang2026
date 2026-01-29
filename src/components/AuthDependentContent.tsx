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

            {/* II. TUJUAN PEMBELAJARAN */}
            <section className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.8rem', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem', marginBottom: '2rem', textAlign: 'center' }}>
                    II. TUJUAN PEMBELAJARAN
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>

                    {/* Item 1: Inovasi Kuliner */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', background: '#FFF3E0', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            🍳
                        </div>
                        <h4 style={{ fontSize: '1.25rem', color: '#2F1B10', marginBottom: '0.5rem', fontWeight: 'bold' }}>Inovasi Kuliner</h4>
                        <p style={{ color: '#555', lineHeight: '1.6' }}>
                            Mampu melakukan inovasi pengolahan makanan khas Nusantara dengan mempertimbangkan nilai ekonomis dan perhitungan Break Even Point (BEP).
                        </p>
                    </div>

                    {/* Item 2: Analisis Gizi */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', background: '#E8F5E9', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            🥗
                        </div>
                        <h4 style={{ fontSize: '1.25rem', color: '#2F1B10', marginBottom: '0.5rem', fontWeight: 'bold' }}>Analisis Gizi</h4>
                        <p style={{ color: '#555', lineHeight: '1.6' }}>
                            Mampu menganalisis dan menjelaskan kandungan gizi serta higienitas bahan pangan yang digunakan.
                        </p>
                    </div>

                    {/* Item 3: Digital Marketing */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', background: '#E3F2FD', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            📱
                        </div>
                        <h4 style={{ fontSize: '1.25rem', color: '#2F1B10', marginBottom: '0.5rem', fontWeight: 'bold' }}>Digital Marketing</h4>
                        <p style={{ color: '#555', lineHeight: '1.6' }}>
                            Mampu memanfaatkan teknologi digital untuk strategi pemasaran dan berkomunikasi secara persuasif kepada publik.
                        </p>
                    </div>

                </div>
            </section>

            {/* III. DIMENSI PROFIL LULUSAN */}
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

            {/* IV. IDENTIFIKASI MASALAH */}
            <section className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.8rem', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    IV. IDENTIFIKASI MASALAH
                </h3>
                <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Beberapa kondisi yang ditemukan pada peserta didik, antara lain:</p>
                    <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li>Lebih mengenal makanan/masakan modern atau makanan kemasan dibandingkan makanan/masakan Nusantara.</li>
                        <li>Sering memilih makanan dengan kandungan gula dan pewarna yang tinggi.</li>
                        <li>Kurang mengenal bahan masakan khas Nusantara.</li>
                        <li>Belum memahami cara mengolah masakan khas Nusantara yang sehat.</li>
                        <li>Belum terbiasa membaca label makanan.</li>
                        <li>Kurang percaya diri dalam menjual produk makanan.</li>
                    </ol>
                </div>
                <div>
                    <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Oleh karena itu, kegiatan ini perlu dilaksanakan untuk:</p>
                    <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li>Melestarikan makanan khas Nusantara</li>
                        <li>Membiasakan pola makan sehat</li>
                        <li>Mengenalkan bahan pangan masakan khas Nusantara yang bergizi</li>
                        <li>Melatih kewirausahaan sederhana</li>
                        <li>Melatih kolaborasi dan kreativitas peserta didik</li>
                    </ol>
                </div>
            </section>

            {/* V. HUBUNGAN DENGAN 7 KEBIASAAN ANAK HEBAT (7 KAIH) */}
            <section className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.8rem', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    V. HUBUNGAN DENGAN 7 KEBIASAAN ANAK HEBAT (7 KAIH)
                </h3>
                <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <li><strong>Proaktif</strong> → Aktif mencari informasi dan bahan makanan khas Nusantara sehat</li>
                    <li><strong>Mulai dari Akhir dalam Pikiran</strong> → Menentukan target produk dan hasil bazar sejak awal</li>
                    <li><strong>Dahulukan yang Utama</strong> → Mengutamakan kebersihan, kesehatan, dan keamanan pangan</li>
                    <li><strong>Berpikir Menang–Menang</strong> → Bekerja sama dalam kelompok secara adil dan saling menguntungkan</li>
                    <li><strong>Berusaha Mengerti Dulu, Baru Dimengerti</strong> → Menghargai pendapat dan ide anggota kelompok</li>
                    <li><strong>Bersinergi</strong> → Berkolaborasi dalam proses memasak, pengemasan, dan penjualan produk</li>
                    <li><strong>Belajar dari Pengalaman</strong> → Melakukan refleksi terhadap hasil praktik dan kegiatan bazar</li>
                </ol>
            </section>

            {/* VI. KEMITRAAN PEMBELAJARAN */}
            <section className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.8rem', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    VI. KEMITRAAN PEMBELAJARAN (INTERNAL)
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

            {/* VII. PRAKTIK PEDAGOGIS */}
            <section className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.8rem', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    VII. PRAKTIK PEDAGOGIS
                </h3>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>Penerapan Project Based Learning (PjBL)</li>
                    <li>Diskusi kelompok dan sesi tanya jawab</li>
                    <li>Demonstrasi pembuatan jajanan tradisional sehat</li>
                    <li>Praktik langsung memasak dan penyajian</li>
                    <li>Simulasi kegiatan jual beli sederhana</li>
                    <li>Presentasi hasil produk dan penjualan</li>
                    <li>Refleksi individu dan refleksi kelompok</li>
                </ul>
            </section>

            {/* VIII. LINGKUNGAN PEMBELAJARAN */}
            <section className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.8rem', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    VIII. LINGKUNGAN PEMBELAJARAN
                </h3>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>Ruang kelas sebagai tempat diskusi dan perencanaan</li>
                    <li>Area praktik memasak sederhana (kantin/dapur sekolah)</li>
                    <li>Lingkungan sekolah sebagai lokasi bazar mini</li>
                    <li>Lingkungan rumah dengan pendampingan orang tua</li>
                    <li>Lingkungan sosial yang kolaboratif, aman, dan mendukung</li>
                </ul>
            </section>

            {/* IX. DESAIN PEMBELAJARAN */}
            <section className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.8rem', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    IX. DESAIN PEMBELAJARAN
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <strong style={{ color: 'var(--color-accent)' }}>1. Strategi Pembelajaran:</strong>
                        <span style={{ marginLeft: '0.5rem' }}>Project Based Learning, diskusi, praktik, dan refleksi</span>
                    </div>
                    <div>
                        <strong style={{ color: 'var(--color-accent)' }}>2. Metode Pembelajaran:</strong>
                        <span style={{ marginLeft: '0.5rem' }}>Demonstrasi, kerja kelompok, simulasi, dan presentasi</span>
                    </div>
                    <div>
                        <strong style={{ color: 'var(--color-accent)' }}>3. Penilaian:</strong>
                        <span style={{ marginLeft: '0.5rem' }}>Sikap, pengetahuan, dan keterampilan</span>
                    </div>
                </div>
            </section>

            {/* X. PRODUK AKHIR */}
            <section className="glass-card" style={{ padding: '3rem', marginBottom: '4rem' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.8rem', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    X. PRODUK AKHIR
                </h3>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontWeight: '500' }}>
                    <li>1. Masakan Khas Nusantara sehat</li>
                    <li>2. Label dan kemasan produk yang terdiri ideo promosi, status WhatsApp, dan konten Instagram untuk pemasaran produk.</li>
                    <li>3. Laporan dan refleksi kegiatan</li>
                    <li>4. Bazar mini jajanan tradisional sehat</li>
                </ul>
            </section>

            {/* CTA Section - At the very bottom */}
            <div className="glass-card" style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                borderTop: '5px solid var(--color-primary)',
                background: 'rgba(255, 255, 255, 0.95)',
                marginTop: '4rem'
            }}>
                <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                    Siap Memulai Kegiatan?
                </h2>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                    Silakan masuk untuk akses materi lengkap, LKPD, dan tugas harian.
                </p>
                <Link href="/login" className="btn btn-primary" style={{ borderRadius: '50px', padding: '1rem 3rem', fontSize: '1.2rem', boxShadow: '0 4px 15px rgba(139, 69, 19, 0.3)' }}>
                    Masuk Sekarang
                </Link>
            </div>
        </div>
    );
}
