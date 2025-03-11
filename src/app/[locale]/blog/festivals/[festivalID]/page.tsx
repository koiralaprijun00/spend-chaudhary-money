// app/[locale]/blog/festivals/[festivalId]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getFestivalContent } from '../../../lib/festival-content.js';

interface FestivalContent {
  slug: string;
  content: string;
  title: string;
  description: string;
  image?: string;
  isFallback: boolean;
}

export default async function FestivalPage({ params }: { params: Promise<{ festivalId: string; locale: string }> }) {
  const resolvedParams = await params;
  
  if (!resolvedParams || !resolvedParams.festivalId || !resolvedParams.locale) {
    return notFound();
  }

  const { festivalId, locale } = resolvedParams;
  
  // Get festival content for the current locale
  const festivalContent = await getFestivalContent(festivalId, locale) as FestivalContent | null;
  
  if (!festivalContent) {
    return notFound();
  }

  return (
    <div className="bg-orange-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
           {/* Back button */}
           <Link 
            href={`/${locale}/guess-festival`}
            className="inline-block underline text-gray-800 "
          >
            Back to the Quiz
          </Link>
          {/* Header */}
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {festivalContent.title}
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-600 mb-8">
            {festivalContent.description}
          </p>
          
          {/* Image if available */}
          {festivalContent.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={festivalContent.image} 
                alt={festivalContent.title}
                className="w-full h-auto"
              />
            </div>
          )}
          
          {/* Content - Using ReactMarkdown to render markdown */}
          <div className="prose max-w-none mb-8">
            <ReactMarkdown>
              {festivalContent.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}