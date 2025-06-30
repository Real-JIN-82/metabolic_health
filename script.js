document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('content-container');
    const templates = document.getElementById('templates');
    const navList = document.querySelector('.nav-list');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const headerTitle = document.querySelector('.header-title');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // 1. 목차 동적 생성
    const sections = [
        { id: 'preface', title: '서문' },
        { id: 'chapter1', title: '제1장: 결함 있는 패러다임' },
        { id: 'chapter2', title: '제2장: 인슐린 저항성' },
        { id: 'insulin_infographic', title: '인포그래픽: 인슐린 저항성' },
        { id: 'chapter3', title: '제3장: 만성 염증과 당화' },
        { id: 'inflammation_infographic', title: '인포그래픽: 염증과 당화' },
        { id: 'chapter4', title: '제4장: 진정한 건강 지표' },
        { id: 'chapter5', title: '제5장: 동물성 영양소' },
        { id: 'chapter6', title: '제6장: 식물성 식품 재평가' },
        { id: 'chapter7', title: '제7장: 지방과 보충제' },
        { id: 'food_spectrum', title: '실용적 식품 스펙트럼' },
        { id: 'chapter8', title: '제8장: 시간제한 섭식' },
        { id: 'chapter9', title: '제9장: 아침 단식과 새벽 현상' },
        { id: 'chapter10', title: '제10장: \'조용한 식단\' 스펙트럼' },
        { id: 'chapter11', title: '제11장: 성장기 영양' },
        { id: 'chapter12', title: '제12장: 갱년기 관리' },
        { id: 'chapter13', title: '제13장: 장년기 건강' },
        { id: 'chapter14', title: '제14장: 최적의 하루' },
        { id: 'chapter15', title: '제15장: 외식과 사회생활' },
        { id: 'chapter16', title: '제16장: 숨은 조력자' },
        { id: 'dashboard', title: '대사 건강 대시보드' },
        { id: 'conclusion', title: '결론' }
    ];
    
    sections.forEach(section => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${section.id}`;
        link.textContent = section.title;
        link.dataset.id = section.id;
        listItem.appendChild(link);
        navList.appendChild(listItem);
    });

    // 2. 콘텐츠 로드 및 내비게이션 처리
    function loadContent(id) {
        const template = templates.querySelector(`template[data-id="${id}"]`);
        if (template) {
            contentContainer.innerHTML = template.innerHTML;
            headerTitle.textContent = template.dataset.title;
            window.scrollTo(0, 0);
            
            // 콘텐츠 로드 후 스크립트 재실행 (인포그래픽, 대시보드 등)
            executeScripts(contentContainer);
        }
    }

    navList.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            const id = e.target.dataset.id;
            loadContent(id);
            closeMenu();
        }
    });

    // 3. 메뉴 (사이드바) 토글 기능
    function toggleMenu() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
    
    function closeMenu() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }

    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    // 4. 동적으로 로드된 콘텐츠 내 스크립트 실행
    function executeScripts(container) {
        container.querySelectorAll('script').forEach(oldScript => {
            const newScript = document.createElement('script');
            newScript.textContent = oldScript.textContent;
            document.body.appendChild(newScript).parentNode.removeChild(newScript);
        });
    }

    // 5. 맨 위로 가기 버튼
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    };

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
    
    // 6. 초기 콘텐츠 로드
    const initialId = window.location.hash ? window.location.hash.substring(1) : sections[0].id;
    loadContent(initialId);

    // 7. PWA 서비스 워커 등록
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed: ', error);
                });
        });
    }
});