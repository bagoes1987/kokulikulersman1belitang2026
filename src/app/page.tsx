import Link from 'next/link';

export default function Home() {
  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '4rem', padding: '4rem 0' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          Cita Rasa Nusantara
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: 'var(--color-text-light)' }}>
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
            cursor: 'pointer'
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
      <section className="card" style={{ padding: '3rem', backgroundColor: '#fff8dc' }}>
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
  );
}
