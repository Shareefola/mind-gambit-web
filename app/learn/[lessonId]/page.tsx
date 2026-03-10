import { LESSONS } from '@/data/curriculum';
import LessonPageClient from './LessonPageClient';

export function generateStaticParams() {
  return Object.keys(LESSONS).map(lessonId => ({ lessonId }));
}

export default function LessonPage({ params }: { params: { lessonId: string } }) {
  return <LessonPageClient lessonId={params.lessonId} />;
}
