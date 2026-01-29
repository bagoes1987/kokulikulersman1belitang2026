import Link from 'next/link';
import AuthDependentContent from '@/components/AuthDependentContent';

export default function Home() {
  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 80px)' }}>

      {/* Background Image Layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/landing-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.3,
        zIndex: 0
      }} />

      <div className="container animate-fade-in" style={{ padding: '4rem 1rem', position: 'relative', zIndex: 1, paddingTop: '100px' }}>
        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h1 className="animate-slide-up" style={{
            fontSize: '4rem',
            color: 'var(--color-primary)',
            marginBottom: '1.5rem',
            textShadow: '2px 2px 4px rgba(255,255,255,0.8)',
            letterSpacing: '-1px'
          }}>
            Cita Rasa Nusantara
          </h1>
          <p className="animate-slide-up delay-100" style={{
            fontSize: '1.5rem',
            maxWidth: '700px',
            margin: '0 auto',
            color: '#4A3728',
            fontWeight: '600',
            lineHeight: '1.6',
            textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
          }}>
            {/* P5 Text Removed as requested */}
            <span style={{ color: 'var(--color-primary)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>SMA Negeri 1 Belitang</span>
          </p>
        </section>

        {/* Conditional Content: Days (Auth) vs Info (Public) */}
        <AuthDependentContent />

        {/* Learning Goals Section - Always Visible */}
        <section className="glass-card animate-slide-up delay-300" style={{ padding: '4rem 2rem', borderLeft: '5px solid var(--color-secondary)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--color-primary)', fontSize: '2.5rem' }}>Tujuan Pembelajaran</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '🥘', text: 'Inovasi Kuliner', desc: 'Menciptakan produk bernilai ekonomis tinggi.' },
              { icon: '🥗', text: 'Analisis Gizi', desc: 'Memahami kandungan nutrisi dan higienitas.' },
              { icon: '📱', text: 'Digital Marketing', desc: 'Strategi pemasaran kreatif berbasis teknologi.' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '3rem', marginBottom: '1rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>{item.icon}</span>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>{item.text}</h4>
                <p style={{ color: '#666' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
