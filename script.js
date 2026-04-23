// 제공해주신 초기 사이트 링크 데이터
const defaultSites = [
    { name: "Gemini", url: "https://gemini.google.com/app?hl=ko" },
    { name: "AI Studio", url: "https://aistudio.google.com/prompts/new_chat" },
    { name: "NotebookLM", url: "https://notebooklm.google.com/?icid=home_maincta&_gl=1*vn9daf*_ga*MTMxMTUzNTI0Ny4xNzc2MDcwNTEw*_ga_W0LDH41ZCB*czE3NzY5MjY4NzMkbzMkZzEkdDE3NzY5MjcwNzQkajYwJGwwJGgw" },
    { name: "Opal", url: "https://opal.google/" }
];

// 로컬 스토리지에서 데이터 불러오기, 없으면 기본값 사용
let sites = JSON.parse(localStorage.getItem('aiSites'));
if (!sites || sites.length === 0) {
    sites = defaultSites;
    saveSites();
}

const grid = document.getElementById('dashboardGrid');
const modal = document.getElementById('addSiteModal');
const addBtn = document.getElementById('addSiteBtn');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const nameInput = document.getElementById('siteName');
const urlInput = document.getElementById('siteUrl');

// 데이터를 로컬 스토리지에 저장
function saveSites() {
    localStorage.setItem('aiSites', JSON.stringify(sites));
}

// 화면에 사이트 카드 렌더링
function renderSites() {
    grid.innerHTML = '';
    sites.forEach(site => {
        const card = document.createElement('a');
        card.href = site.url;
        card.target = "_blank"; // 새 창에서 열기
        card.className = "card";
        card.innerHTML = `<h3>${site.name}</h3>`;
        grid.appendChild(card);
    });
}

// 팝업 열기
addBtn.onclick = () => {
    modal.style.display = 'flex';
};

// 팝업 닫기 및 입력창 초기화
function closeModal() {
    modal.style.display = 'none';
    nameInput.value = '';
    urlInput.value = '';
}
cancelBtn.onclick = closeModal;

// 새 사이트 저장 로직
saveBtn.onclick = () => {
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();

    if (name && url) {
        sites.push({ name, url });
        saveSites();
        renderSites();
        closeModal();
    } else {
        alert('사이트 이름과 URL을 모두 입력해주세요.');
    }
};

// 초기 화면 렌더링
renderSites();