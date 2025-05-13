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
        threshold: 0.1
    });

    // 各要素を監視
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 