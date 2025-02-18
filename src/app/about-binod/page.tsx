// pages/blog.js
import Head from 'next/head';
import Link from 'next/link';
import { TbArrowBigLeftLinesFilled } from "react-icons/tb";

export default function BlogPage() {
  return (
    <>
    {/* Go Back Button */}
    <div className="flex justify-start mt-8">
    <Link
          href="/spend"
          className="group flex items-center text-gray-400 font-bold  hover:text-gray-800"
        >
          <TbArrowBigLeftLinesFilled className="mr-2 transition-colors duration-50 group-hover:text-gray-800" size={28} />
          Go Back
        </Link>
      </div>
      <Head>
        <title>How Rich is Binod Chaudhary? Nepal’s First Billionaire</title>
        <meta
          name="description"
          content="Learn about Binod Chaudhary, Nepal’s only billionaire, his net worth, business success, and philanthropic contributions."
        />
      </Head>
      <div className="min-h-screen">
        <div className="max-w-3xl py-12">
          <article className="bg-white rounded-3xl py-8">
            <header className="mb-12 border-b pb-6">
              <h1 className="text-4xl font-bold text-left text-gray-800 mb-4">
                How Rich is Binod Chaudhary? Nepal’s First Billionaire
              </h1>
            </header>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-700 mb-6 border-b pb-2">
                Binod Chaudhary’s Net Worth in 2024
              </h2>
              <div>
                <p className="text-gray-700">
                  According to Forbes' Billionaire List 2024, Binod Chaudhary has an estimated net worth of{' '}
                  <span className="font-semibold">$1.8 billion</span> (approximately{' '}
                  <span className="font-semibold">Rs. 240 billion</span>), ranking{' '}
                  <span className="font-semibold">1,764th</span> among the world’s richest individuals{' '}
                  <span className="italic">(MyRepublica)</span>.
                </p>
                <p className="text-gray-700 mt-4">
                  His wealth primarily comes from{' '}
                  <span className="font-semibold">CG Corp Global</span>, a multinational conglomerate operating across{' '}
                  <span className="font-semibold">32 countries</span>, with over{' '}
                  <span className="font-semibold">202 companies</span> and{' '}
                  <span className="font-semibold">261 brands</span> spanning diverse industries{' '}
                  <span className="italic">(CG Corp Global)</span>.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-700 mb-6 border-b pb-2">
                The Success Behind His Wealth
              </h2>
              <ol className="list-decimal list-inside space-y-4 text-gray-600">
                <li>
                  <span className="font-bold">Wai Wai Noodles – The Game Changer</span>
                  <p className="ml-6 mt-1">
                    Binod Chaudhary’s biggest success story is Wai Wai noodles, Nepal’s
                    most famous instant noodle brand. The brand expanded globally, making
                    it a household name in countries like India, Thailand, and the United
                    States. Wai Wai’s massive popularity significantly contributed to his
                    billionaire status.
                  </p>
                </li>
                <li>
                  <span className="font-bold">Diverse Business Empire</span>
                  <p className="ml-6 mt-1">
                    Apart from Wai Wai, CG Corp Global operates in various sectors, including:
                  </p>
                  <ul className="list-disc list-inside ml-10 mt-1 space-y-1">
                    <li>
                      <span className="font-medium">Hospitality:</span> Over 100 luxury hotels
                      and resorts worldwide, including partnerships with Taj Hotels and
                      Radisson.
                    </li>
                    <li>
                      <span className="font-medium">Banking & Finance:</span> Significant
                      investments in Nepal’s Nabil Bank and other financial institutions.
                    </li>
                    <li>
                      <span className="font-medium">Real Estate & Construction:</span>{' '}
                      Develops commercial and residential projects in Nepal, Dubai, and the
                      Maldives.
                    </li>
                    <li>
                      <span className="font-medium">Energy & Infrastructure:</span>{' '}
                      Involvement in hydropower projects in Nepal.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold">Expanding Beyond Nepal</span>
                  <p className="ml-6 mt-1">
                    Chaudhary’s international business expansion played a crucial role in
                    his growing wealth. His ability to invest strategically in global
                    markets helped CG Corp establish itself as a leading business group.
                  </p>
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-700 mb-6 border-b pb-2">
                Philanthropy & Contributions to Nepal
              </h2>
              <p className="text-gray-600 mb-4">
                Beyond business, Binod Chaudhary is deeply involved in philanthropy.
                Through the Chaudhary Foundation, he has contributed to various social
                causes, including:
              </p>
              <ul className="list-disc list-inside ml-6 space-y-2 text-gray-600">
                <li>
                  <span className="font-medium">Post-earthquake reconstruction:</span> Built
                  over 3,000 homes and 100 schools after the 2015 Nepal earthquake.
                </li>
                <li>
                  <span className="font-medium">Education & Healthcare:</span> Supports
                  several schools, hospitals, and skill-development programs in Nepal.
                </li>
              </ul>
            </section>

            {/* New Section: How Long Would It Take to Spend Binod Chaudhary’s Money? */}
            <section className="mb-8 px-12 py-8 rounded-xl shadow-md bg-gradient-to-r from-blue-50 to-purple-50">
              <h2 className="text-3xl font-semibold text-gray-700 border-b pb-2">
                How Long Would It Take to Spend Binod Chaudhary’s Money?
              </h2>
              <p className="text-gray-600 mb-4">
                To put Binod Chaudhary’s wealth into perspective, let’s break it down:
              </p>
              <ul className="list-disc list-inside ml-6 space-y-2 text-gray-600">
                <li>
                  <span className="font-bold">Spending $1 Million a Day:</span> If you spent $1 million every single day, it would take you almost 5 years to spend his $1.8 billion fortune.
                </li>
                <li>
                  <span className="font-bold">Spending $100,000 a Day:</span> At this rate, you would need 50 years to deplete his entire wealth.
                </li>
                <li>
                  <span className="font-bold">Spending $100,000 an Hour:</span> Even at an extravagant $100,000 per hour, it would still take you around 2 years to spend it all.
                </li>
              </ul>
              <p className="text-gray-600 mt-4">
                <span className="font-bold">Your Money vs Binod Chaudhary’s Money:</span> If someone earning Rs. 1 million (10 lakh) per year saved every rupee without spending anything, it would take them 240,000 years to match Binod Chaudhary’s net worth.
              </p>
              <p className="text-gray-600">
                Even if you won Rs. 10 million (1 crore) in a lottery every month, it would still take 2,000 years to reach $1.8 billion. That’s an unimaginably long time!
              </p>
            </section>

            <section className="mb-8">
              <p className="text-gray-600 mb-4">
                Binod Chaudhary’s journey from a small family business in Nepal to becoming
                a global billionaire is an inspiration. His ability to innovate, expand,
                and invest in diverse industries has made him Nepal’s richest and most
                influential businessman.
              </p>
              <p className="text-gray-600">
                As Nepal’s only billionaire, his success is a testament to Nepalese
                entrepreneurship on the global stage.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-700 mb-6 border-b pb-2">
                Frequently Asked Questions (FAQs)
              </h2>
              <div className="space-y-6 text-gray-600">
                <div>
                  <p className="font-bold">
                    Q1: What is Binod Chaudhary’s current net worth?
                  </p>
                  <p>A: As of 2024, his estimated net worth is $1.8 billion.</p>
                </div>
                <div>
                  <p className="font-bold">
                    Q2: How did Binod Chaudhary become rich?
                  </p>
                  <p>
                    A: His wealth primarily comes from Wai Wai noodles and his investments in
                    hospitality, banking, real estate, and energy.
                  </p>
                </div>
                <div>
                  <p className="font-bold">
                    Q3: Is Binod Chaudhary Nepal’s richest person?
                  </p>
                  <p>
                    A: Yes, he is Nepal’s only billionaire and the richest person in the
                    country.
                  </p>
                </div>
                <div>
                  <p className="font-bold">
                    Q4: What businesses does CG Corp Global own?
                  </p>
                  <p>
                    A: CG Corp operates in food & beverages, hospitality, banking, real estate,
                    and energy across 30 countries.
                  </p>
                </div>
                <div>
                  <p className="font-bold">
                    Q5: Is Binod Chaudhary involved in philanthropy?
                  </p>
                  <p>
                    A: Yes, he has donated millions for education, healthcare, and disaster
                    relief in Nepal.
                  </p>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
