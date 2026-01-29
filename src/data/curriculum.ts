export interface ContentItem {
    id: string;
    title: string;
    type: 'text' | 'video' | 'quiz' | 'task' | 'general';
}

export interface DayModule {
    id: string; // '1', '2', '3'
    title: string;
    description: string;
    items: ContentItem[];
}

const standardItems: ContentItem[] = [
    { id: 'informasi', title: 'Informasi Modul', type: 'general' },
    { id: 'pemantik', title: 'Pertanyaan Pemantik', type: 'text' },
    { id: 'materi', title: 'Materi Pembelajaran', type: 'text' },
    { id: 'video', title: 'Video Pembelajaran', type: 'video' },
    { id: 'lkpd', title: 'LKPD', type: 'task' },
    { id: 'kuis', title: 'Kuis & Latihan', type: 'quiz' },
    { id: 'rangkuman', title: 'Rangkuman', type: 'text' },
    { id: 'glosarium', title: 'Glosarium', type: 'general' },
    { id: 'refleksi', title: 'Refleksi Pembelajaran', type: 'text' },
];

export const curriculum: DayModule[] = [
    {
        id: '1',
        title: 'Hari 1: Eksplorasi & Ideasi',
        description: 'Paparan keragaman kuliner Nusantara, Riset Gizi, Ide Produk, dan Analisis Ekonomi.',
        items: standardItems,
    },
    {
        id: '2',
        title: 'Hari 2: Produksi & Promosi',
        description: 'Pembuatan sampel produk, Konten Kreatif, Digital Marketing, dan Persiapan Fisik.',
        items: standardItems,
    },
    {
        id: '3',
        title: 'Hari 3: Panen Raya (Market Day)',
        description: 'Puncak Acara, Praktik Jual-Beli, Evaluasi, dan Refleksi.',
        items: standardItems,
    },
];
