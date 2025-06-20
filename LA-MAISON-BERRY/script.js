document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mainNav = document.getElementById('main-nav'); // 確保這裡能正確抓到元素
    const navLinks = mainNav.querySelectorAll('.nav-button'); // 獲取所有導航連結

    // 點擊漢堡選單時切換 active class
    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        mainNav.classList.toggle('active');
        // 當漢堡選單打開時，防止背景滾動
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : 'auto';
    });

    // 點擊導航連結時關閉選單
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // 只有在選單開啟狀態下（即 mainNav 有 active class）才執行關閉操作
            if (mainNav.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = 'auto'; // 恢復背景滾動
            }
        });
    });

    // 監聽視窗大小變化
    window.addEventListener('resize', function() {
        // 定義您的 CSS 斷點
        const desktopBreakpoint = 992; // 匹配您 CSS 中 @media (max-width: 992px) 的斷點

        // 當視窗寬度大於桌面斷點時 (從手機/平板尺寸切換到桌面尺寸)
        // 確保漢堡選單和導航菜單都處於關閉狀態，並恢復背景滾動
        if (window.innerWidth > desktopBreakpoint) {
            // 只有當手機導航是"開啟"狀態時才執行關閉操作
            // 這樣可以避免在桌面版時，每次resize都重複移除class
            if (hamburgerMenu.classList.contains('active') || mainNav.classList.contains('active')) {
                hamburgerMenu.classList.remove('active'); // 移除漢堡選單的 active 狀態
                mainNav.classList.remove('active'); // 移除導航的 active 狀態
                document.body.style.overflow = 'auto'; // 恢復背景滾動
            }
        }
        // 不需要處理小於等於桌面斷點時的邏輯
        // 因為在小螢幕下，菜單的顯示/隱藏應該完全由點擊事件控制
    });

    // 可以在初始載入時檢查一次視窗大小，以防頁面載入時就是桌面尺寸但菜單狀態不正確
    // 這是一個額外的優化，確保頁面載入時的正確狀態
    const initialCheck = function() {
        const desktopBreakpoint = 992;
        if (window.innerWidth > desktopBreakpoint) {
            hamburgerMenu.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };
    initialCheck(); // 頁面載入時執行一次檢查
});