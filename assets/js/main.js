// スクロールアニメーション
document.addEventListener('DOMContentLoaded', () => {
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

    // フォーム送信処理
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });

            try {
                // ここにフォーム送信の処理を追加
                // 例: await fetch('/api/contact', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(formDataObj)
                // });

                // 送信成功時の処理
                alert('お問い合わせありがとうございます。\n内容を確認次第、ご連絡させていただきます。');
                contactForm.reset();
            } catch (error) {
                // エラー処理
                alert('申し訳ありません。送信に失敗しました。\n時間をおいて再度お試しください。');
                console.error('Error:', error);
            }
        });
    }
}); 