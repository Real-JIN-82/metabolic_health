document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('content-container');
    const navList = document.querySelector('.nav-list');
    const templates = document.getElementById('templates').querySelectorAll('template');
    const headerTitle = document.querySelector('.header-title');

    // 1. 목차 동적 생성
    templates.forEach(template => {
        const pageId = template.dataset.id;
        const pageTitle = template.dataset.title;

        if (pageTitle) {
            const listItem = document.createElement('li');
            listItem.textContent = pageTitle;
            listItem.dataset.page = pageId;
            navList.appendChild(listItem);
        }
    });

    // 2. 초기 페이지 로드 (첫 번째 템플릿)
    if (templates.length > 0) {
        loadContent(templates[0].dataset.id);
    }

    // 3. 네비게이션 클릭 이벤트 처리
    navList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const pageId = event.target.dataset.page;
            loadContent(pageId);
            closeSidebar();
        }
    });
    
    // 전역 함수로 loadContent 노출 (인포그래픽 등에서 사용)
    window.loadContent = (pageId) => {
        const template = document.querySelector(`template[data-id='${pageId}']`);
        if (template) {
            // contentContainer.innerHTML = ''; // 이전 내용 비우기
            const clone = template.content.cloneNode(true);
            contentContainer.replaceChildren(clone); // 새 내용으로 교체
            headerTitle.textContent = template.dataset.title || '대사 건강 가이드북';
            window.scrollTo(0, 0); // 페이지 로드 시 상단으로 스크롤
        }
    };

    // --- UI 스크립트 ---

    // 메뉴 토글
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    const openSidebar = () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    };

    const closeSidebar = () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    };

    menuToggle.addEventListener('click', () => {
        sidebar.classList.contains('active') ? closeSidebar() : openSidebar();
    });

    overlay.addEventListener('click', closeSidebar);

    // 맨 위로 가기 버튼
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    window.onscroll = () => {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    };
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});

// 서비스 워커 등록
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}
