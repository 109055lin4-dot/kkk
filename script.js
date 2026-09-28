document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. 中英雙語切換邏輯 (Language Toggle)
    // ==========================================
    const langToggleBtn = document.getElementById('langToggleBtn');
    const currentLangSpan = document.getElementById('currentLang');
    let currentLang = 'ZH'; // 預設語言

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ZH' ? 'EN' : 'ZH';
        currentLangSpan.textContent = currentLang === 'ZH' ? 'EN' : '繁中';

        // 搜尋所有帶有 data-zh 與 data-en 屬性的標籤並切換文字
        const translatableElements = document.querySelectorAll('[data-zh][data-en]');
        translatableElements.forEach(elem => {
            const attr = `data-${currentLang.toLowerCase()}`;
            if (elem.hasAttribute(attr)) {
                elem.textContent = elem.getAttribute(attr);
            }
        });
    });

    // ==========================================
    // 2. 表單提交與動態生成國民證 (Form Submission)
    // ==========================================
    const citizenshipForm = document.getElementById('citizenshipForm');
    const modal = document.getElementById('idCardModal');
    const closeModalBtn = document.querySelector('.close-modal');

    citizenshipForm.addEventListener('submit', (e) => {
        e.preventDefault(); // 阻止頁面刷新

        // 讀取欄位值
        const name = document.getElementById('comradeName').value.trim();
        const specialty = document.getElementById('specialty').value;

        // 生成 4 位隨機公民編號（例如：MY-2026-8839）
        const randomCode = Math.floor(1000 + Math.random() * 9000);
        const citizenId = `MY-2026-${randomCode}`;

        // 取得發證日期 (YYYY-MM-DD)
        const today = new Date().toISOString().split('T')[0];

        // 將資料寫入國民證 Modal 卡片中
        document.getElementById('cardName').textContent = name;
        document.getElementById('cardCitizenId').textContent = citizenId;
        document.getElementById('cardSpecialty').textContent = specialty;
        document.getElementById('cardDate').textContent = today;

        // 顯示彈窗
        modal.style.display = 'flex';
    });

    // ==========================================
    // 3. 關閉彈窗邏輯 (Close Modal)
    // ==========================================
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 點擊彈窗外部區域亦可關閉
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
