import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 80px)' }}> {/* Adjust height based on header */}

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
        opacity: 0.3, // "Transparan" effect requested
        zIndex: 0 // Z-index fixed for visibility
      }} />

      <div className="container" style={{ padding: '2rem 1rem', position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '4rem', padding: '4rem 0' }}>
          <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(255,255,255,0.8)' }}>
            Cita Rasa Nusantara
          </h1>
          <p style={{ fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto', color: '#2F1B10', fontWeight: '500', textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>
            Projek Penguatan Profil Pelajar Pancasila (P5) - SMA Negeri 1 Belitang
          </p>
        </section>

        {/* Days Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {['Day 1', 'Day 2', 'Day 3'].map((day, index) => (
            <div key={day} className="card" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'transform 0.2s',
              cursor: 'pointer',
              backgroundColor: 'rgba(255, 255, 255, 0.9)' // Slightly clearer cards against bg
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'var(--color-text)',
                marginBottom: '1rem'
              }}>
                {index + 1}
              </div>
              <h2 style={{ color: 'var(--color-primary)' }}>{day}</h2>
              <p style={{ marginBottom: '1.5rem', flexGrow: 1 }}>
                {index === 0 && 'Eksplorasi & Ideasi: Menggali potensi kuliner nusantara.'}
                {index === 1 && 'Produksi & Promosi: Mengolah rasa dan strategi pasar.'}
                {index === 2 && 'Panen Raya (Market Day): Gelar karya dan wirausaha.'}
              </p>
              <Link href={`/days/${index + 1}`} className="btn btn-primary" style={{ width: '100%' }}>
                Lihat Kegiatan
              </Link>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <section className="card" style={{ padding: '3rem', backgroundColor: 'rgba(255, 248, 220, 0.95)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Tujuan Pembelajaran</h2>
          <ul style={{ listStyle: 'none', display: 'grid', gap: '1rem' }}>
            {[
              'Menciptakan inovasi kuliner Nusantara yang bernilai ekonomis.',
              'Menganalisis kandungan gizi dan higienitas pangan.',
              'Memanfaatkan teknologi digital untuk pemasaran kreatif.'
            ].map((goal, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--color-accent)', fontSize: '1.5rem' }}>✓</span>
                {goal}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
