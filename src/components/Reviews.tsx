import { Star, Quote } from 'lucide-react';
import { AnimatedSection } from './ui/animated-section';

const Review = ({ quote, author, role, rating, delay, avatar }: any) => {
  return (
    <AnimatedSection
      delay={delay}
      className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
    >
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < rating ? 'text-blue-600 fill-blue-600' : 'text-gray-300'
            }
          />
        ))}
      </div>
      <div className="relative mb-6">
        <Quote size={24} className="text-blue-100 absolute -top-2 -left-1" />
        <p className="text-gray-700 italic pl-5">{quote}</p>
      </div>
      <div className="flex items-center mt-4">
        <div className="w-12 h-12 mr-4 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={avatar}
            alt={`${author} avatar`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default function Reviews() {
  const testimonials = [
    {
      quote:
        'Interactive Mirrorcaps has completely transformed my trading strategy. The AI predictions are incredibly accurate, giving me confidence in every trade I make.',
      author: 'Alex Johnson',
      role: 'Day Trader',
      rating: 5,
      avatar:
        'https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fHww',
    },
    {
      quote:
        "I've tried many trading platforms, but Interactive Mirrorcaps stands out with its intuitive interface and powerful analytics that help me make informed decisions.",
      author: 'Sarah Chen',
      role: 'Swing Trader',
      rating: 5,
      avatar:
        'https://plus.unsplash.com/premium_photo-1691784781482-9af9bce05096?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      quote:
        'The mobile app is a game-changer. I can monitor my positions and react to market changes on the go, which has significantly improved my returns.',
      author: 'Michael Rodriguez',
      role: 'Forex Trader',
      rating: 4,
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
    {
      quote:
        "Interactive Mirrorcaps's risk assessment tools have helped me maintain a balanced portfolio even during market volatility. Absolutely worth every penny!",
      author: 'Emma Thompson',
      role: 'Portfolio Manager',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    },
    {
      quote:
        'As a beginner, I was intimidated by trading, but the educational resources and user-friendly dashboard made everything accessible. Now I am trading with confidence.',
      author: 'David Wilson',
      role: 'Novice Investor',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    },
    {
      quote:
        'The real-time market insights and notifications are phenomenal. I have captured opportunities I would have missed otherwise.',
      author: 'Priya Patel',
      role: 'Options Trader',
      rating: 4,
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    },
    {
      quote:
        'Customer support is outstanding. Any questions I have are answered promptly, and the team goes above and beyond to ensure my success.',
      author: 'James Williams',
      role: 'Crypto Trader',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    },
    {
      quote:
        'The backtesting features helped me optimize my strategy before risking real money. Interactive Mirrorcaps pays for itself through improved results.',
      author: 'Olivia Garcia',
      role: 'Algorithmic Trader',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 md:px-8 mx-auto max-w-7xl">
        <AnimatedSection delay={0.1} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Trusted by{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              thousands
            </span>{' '}
            of traders worldwide
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Do not just take our word for it. Here is what our users have to say
            about their experience with Interactive Mirrorcaps.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((review, index) => (
            <Review
              key={index}
              quote={review.quote}
              author={review.author}
              role={review.role}
              rating={review.rating}
              avatar={review.avatar}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
