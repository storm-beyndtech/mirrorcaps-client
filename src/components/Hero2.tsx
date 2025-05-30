type HeroProps = {
  title: string;
  subtitle: string;
  textColor?: string;
  accentColor?: string;
  backgroundUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  badgeText?: string;
};

export default function Hero2({
  title,
  subtitle,
  textColor = 'text-gray-200',
  backgroundUrl = 'https://preline.co/assets/svg/examples/polygon-bg-element-dark.svg',
  badgeText = 'Join the community',
}: HeroProps) {
  return (
    <section className="bg-gray-900 pt-20">
      <div
        className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:z-[1] before:transform before:-translate-x-1/2"
        style={{ backgroundImage: `url('${backgroundUrl}')` }}
      >
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 relative z-10">
          <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2 border text-sm p-1 ps-3 rounded-full transition hover:border-gray-600 bg-gray-800 border-gray-700 text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-600"
              href="#"
            >
              {badgeText}
              <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full font-semibold text-sm text-gray-400 bg-gray-700">
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>

          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className={`block font-bold text-4xl ${textColor}`}>{title}</h1>
          </div>

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p
              className={`text-lg ${
                textColor === 'text-gray-200' ? 'text-gray-400' : textColor
              }`}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
