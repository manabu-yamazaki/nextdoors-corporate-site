// パフォーマンス最適化
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// スクロールアニメーション
document.addEventListener('DOMContentLoaded', () => {
    // Lucide Iconsの初期化
    lucide.createIcons();

    // スクロールアニメーション用の要素を取得
    const animatedElements = document.querySelectorAll('.service-card, .process-step');

    // Intersection Observerの設定
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // 各要素を監視
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // スムーズスクロール（パフォーマンス最適化）
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // スクロールイベントの最適化
    const handleScroll = debounce(() => {
        const scrollPosition = window.scrollY;
        const header = document.querySelector('.header');
        
        if (scrollPosition > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }, 10);

    // スクロールイベントのリスナー
    window.addEventListener('scroll', handleScroll, { passive: true });

    // スムーズスクロールのイベントリスナー
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = anchor.getAttribute('href');
            smoothScroll(target);
        });
    });
});