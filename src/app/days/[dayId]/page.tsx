import { curriculum } from '@/data/curriculum';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function DayPage({ params }: { params: { dayId: string } }) {
    const day = curriculum.find((d) => d.id === params.dayId);

    if (!day) {
        notFound();
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                ← Kembali ke Beranda
            </Link>

            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ color: 'var(--color-primary)' }}>{day.title}</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>{day.description}</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {day.items.map((item) => (
                    <Link href={`/days/${day.id}/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
                        <div className="card" style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '1.5rem',
                            transition: 'all 0.2s',
                            borderLeft: '5px solid var(--color-secondary)'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: 'var(--color-background)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '1rem',
                                fontSize: '1.2rem',
                                color: 'var(--color-primary)'
                            }}>
                                {/* Icons could go here */}
                                ➜
                            </div>
                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// Generate static params for all days
export async function generateStaticParams() {
    return curriculum.map((day) => ({
        dayId: day.id,
    }));
}
