import { ALL_OPENINGS } from '@/data/openings';
import OpeningPageClient from './OpeningPageClient';

export function generateStaticParams() {
  return ALL_OPENINGS.map(opening => ({ openingId: opening.id }));
}

export default function OpeningPage({ params }: { params: { openingId: string } }) {
  return <OpeningPageClient openingId={params.openingId} />;
}
