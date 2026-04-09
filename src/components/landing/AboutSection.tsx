import { useRef, useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const achievements = [
  { icon: "Wrench", label: "Лет опыта в сборке", value: "5+" },
  { icon: "ShieldCheck", label: "Гарантия на каждый самокат", value: "1 год" },
  { icon: "Users", label: "Довольных клиентов", value: "250+" },
  { icon: "Star", label: "Только оригинальные детали", value: "100%" },
];

const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={ref} id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: `translateY(${(1 - scrollProgress) * 50}px)` }}
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 rounded-3xl transform -rotate-6"></div>
            <div className="relative z-10 w-full aspect-square flex items-center justify-center p-8">
              <img
                src="https://cdn.poehali.dev/projects/ff79c57e-a7d5-4cf5-b52d-47507fa2815b/bucket/7a311bd5-adf1-42f8-a7f9-4b611412bccf.jpeg"
                alt="ПЕГА логотип"
                className="w-full h-full object-contain rounded-3xl drop-shadow-2xl"
              />
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">О ПЕГА</h2>
            <p className="text-lg mb-6 text-zinc-300">
              ПЕГА — мастерская кастомных трюковых самокатов. Мы не продаём готовые самокаты с полки —
              каждый экземпляр собирается вручную под конкретного райдера: его стиль, рост и уровень катания.
            </p>
            <p className="text-lg mb-8 text-zinc-300">
              Используем только оригинальные новые детали от проверенных брендов. Каждый самокат проходит
              полную проверку перед передачей клиенту. Годовая гарантия и бесплатное техобслуживание —
              входят в стоимость любой комплектации.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.label}
                  className={`bg-zinc-900/50 rounded-lg p-4 border border-white/10 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-2">
                    <div className="mr-2 text-white">
                      <Icon name={achievement.icon} size={24} />
                    </div>
                    <div className="text-2xl font-bold text-white">{achievement.value}</div>
                  </div>
                  <div className="text-sm text-zinc-400">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;