import { useState, useRef, useEffect } from "react";
import { Check, Crown, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PackageOption {
  name: string;
  price: string;
  icon: React.ReactNode;
  features: string[];
  badge?: string;
  popular?: boolean;
}

const packageOptions: PackageOption[] = [
  {
    name: "Базовый",
    price: "от 15 000 ₽",
    icon: <Star className="w-6 h-6" />,
    features: [
      "Рама начального уровня",
      "Надёжные колёса 110 мм",
      "Базовые пеги и дека",
      "Оригинальные комплектующие",
      "Годовая гарантия",
      "Бесплатное ТО",
    ],
    badge: "ОТЛИЧНЫЙ СТАРТ!",
  },
  {
    name: "Про",
    price: "от 28 000 ₽",
    icon: <Zap className="w-6 h-6" />,
    features: [
      "Облегчённая рама Pro",
      "Колёса 120 мм с улучшенным ядром",
      "Профессиональные пеги и дека",
      "Вилка с улучшенной геометрией",
      "Оригинальные комплектующие",
      "Годовая гарантия + бесплатное ТО",
    ],
    popular: true,
  },
  {
    name: "Легенда",
    price: "от 55 000 ₽",
    icon: <Crown className="w-6 h-6" />,
    features: [
      "Топовая рама signature-серии",
      "Колёса 125 мм premium-класса",
      "Карбоновые / титановые элементы",
      "Индивидуальная покраска рамы",
      "Полная кастомизация под райдера",
      "Годовая гарантия + бесплатное ТО",
    ],
  },
];

const LicenseSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="licenses" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black"></div>

      <div className="container mx-auto px-4 relative">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Комплектации</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Выбери уровень — мы соберём самокат из оригинальных деталей, проверим каждый узел и передадим
            с гарантией
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packageOptions.map((option, index) => (
            <div
              key={option.name}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card
                className={`relative h-full bg-black border-white/10 ${
                  hoveredCard === index ? "scale-105" : "scale-100"
                } transition-all duration-300`}
              >
                <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-br from-white/20 to-white/0">
                  <div className="absolute inset-0 rounded-lg bg-black"></div>
                </div>

                {option.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
                      Популярный
                    </span>
                  </div>
                )}

                <CardContent className="relative p-6 rounded-lg h-full flex flex-col">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 rounded-full bg-zinc-900 border border-white/10 mb-4">
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{option.name}</h3>
                    <div className="text-3xl font-bold text-white">{option.price}</div>
                  </div>

                  <div className="flex-grow">
                    <ul className="space-y-3 mb-6">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-white mr-2 shrink-0 mt-0.5" />
                          <span className="text-sm text-zinc-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {option.badge && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-white bg-white/5 py-2 px-3 rounded-lg border border-white/10 animate-pulse">
                        {option.badge}
                      </p>
                    </div>
                  )}

                  <Button
                    className="w-full bg-white text-black hover:bg-zinc-200 transition-colors"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Заказать
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LicenseSection;
