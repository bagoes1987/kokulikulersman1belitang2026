import { curriculum } from '@/data/curriculum';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function ContentPage({ params }: { params: { dayId: string; contentId: string } }) {
    const day = curriculum.find((d) => d.id === params.dayId);
    const item = day?.items.find((i) => i.id === params.contentId);

    if (!day || !item) {
        notFound();
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <Link href={`/days/${day.id}`} style={{ color: 'var(--color-primary)' }}>
                    ← Kembali ke {day.title}
                </Link>
            </div>

            <article className="card" style={{ minHeight: '600px', padding: '3rem' }}>
                <header style={{ borderBottom: '2px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                    <h1 style={{ color: 'var(--color-primary)' }}>{item.title}</h1>
                    <p style={{ color: 'var(--color-text-light)' }}>{day.title}</p>
                </header>

                <div className="content-body">
                    {/* Placeholder Content */}
                    <div style={{
                        padding: '2rem',
                        backgroundColor: 'var(--color-background)',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        color: 'var(--color-text-light)'
                    }}>
                        <p>Konten untuk <strong>{item.title}</strong> belum tersedia.</p>
                        <p>Silakan hubungi administrator atau guru fasilitator untuk materi ini.</p>
                    </div>
                </div>
            </article>

            {/* Navigation Buttons (Next/Prev) could go here */}
        </div>
    );
}

// Generate static params
export async function generateStaticParams() {
    const params = [];
    for (const day of curriculum) {
        for (const item of day.items) {
            params.push({ dayId: day.id, contentId: item.id });
        }
    }
    return params;
}
