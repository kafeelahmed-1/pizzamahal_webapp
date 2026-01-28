import { useState, useEffect } from 'react';
import { ChevronRight, Star, Truck, Clock, Award } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu-section');
    menuSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const slides = [
    {
      image: 'https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?w=1200&h=800&fit=crop',
      title: 'Classic Salami Pizza',
      subtitle: 'Traditional flavors with premium salami and olives',
      cta: 'Order Now'
    },
    {
      image: 'https://img.freepik.com/free-photo/top-view-sausage-pizza-with-tomato-red-bell-pepper-cheese-top-view_140725-7089.jpg?w=1200&h=800&fit=crop',
      title: 'Premium Sausage Pizza',
      subtitle: 'Loaded with savory sausages and fresh veggies',
      cta: 'Try Now'
    },
    {
      image: 'https://img.freepik.com/free-photo/top-view-pizza-with-olives-tomatoes-bell-pepper-rolling-pin-with-flour_141793-14334.jpg?w=1200&h=800&fit=crop',
      title: 'Mediterranean Delight',
      subtitle: 'Traditional flavors with olives and herbs',
      cta: 'Discover More'
    },
    {
      image: 'https://img.freepik.com/free-photo/side-view-pizza-with-slices-bell-pepper-pizza-slices-flour-board-cookware_176474-3185.jpg?w=1200&h=800&fit=crop',
      title: 'Artisan Crafted Pizza',
      subtitle: 'Made with love and the finest ingredients',
      cta: 'Order Today'
    },
    {
      image: 'https://img.freepik.com/free-photo/margharita-pizza-with-full-tomato-sauce-andgreen-basilica-leaves-per-slice_114579-1902.jpg?w=1200&h=800&fit=crop',
      title: 'Authentic Margherita',
      subtitle: 'Fresh tomato sauce with aromatic basil leaves',
      cta: 'Experience Now'
    },
    {
      image: 'https://img.freepik.com/free-photo/slices-vegetarian-pizza-with-basil-tomatoes-peppers-woodent-tray_140725-3963.jpg?w=1200&h=800&fit=crop',
      title: 'Vegetarian Supreme',
      subtitle: 'Fresh vegetables with herbs on wooden tray',
      cta: 'Explore Menu'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-7000"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
      ))}

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-red-500/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-yellow-500/20 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-orange-400/20 rounded-full blur-xl animate-pulse delay-3000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm font-medium">#1 Pizza in Rawalpindi</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-slide-up">
            {slides[currentSlide].title.split(' ').map((word, index) => (
              <span
                key={index}
                className="inline-block animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {word}{' '}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-orange-100 mb-8 animate-fade-in delay-500 max-w-2xl mx-auto leading-relaxed">
            {slides[currentSlide].subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in delay-700">
            <button className="group bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2">
              {slides[currentSlide].cta}
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToMenu}
              className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              View Menu
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto animate-fade-in delay-1000">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-orange-200 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">25</div>
              <div className="text-orange-200 text-sm">Pizza Varieties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">4.9</div>
              <div className="text-orange-200 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">30min</div>
              <div className="text-orange-200 text-sm">Avg Delivery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Floating Cards */}
      <div className="absolute bottom-8 left-8 hidden lg:block animate-float">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-white">
          <Truck className="h-8 w-8 text-orange-400 mb-2" />
          <div className="text-sm font-medium">Free Delivery</div>
          <div className="text-xs text-orange-200">On orders above Rs. 500</div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden lg:block animate-float delay-1000">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-white">
          <Clock className="h-8 w-8 text-orange-400 mb-2" />
          <div className="text-sm font-medium">30 Min Delivery</div>
          <div className="text-xs text-orange-200">Guaranteed or free</div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-orange-400 scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;