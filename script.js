const defaultSites = [
    { name: "Gemini", url: "https://gemini.google.com/app?hl=ko" },
    { name: "AI Studio", url: "https://aistudio.google.com/prompts/new_chat" },
    { name: "NotebookLM", url: "https://notebooklm.google.com/?icid=home_maincta&_gl=1*vn9daf*_ga*MTMxMTUzNTI0Ny4xNzc2MDcwNTEw*_ga_W0LDH41ZCB*czE3NzY5MjY4NzMkbzMkZzEkdDE3NzY5MjcwNzQkajYwJGwwJGgw" },
    { name: "Opal", url: "https://opal.google/" }
];

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

function saveSites() {
    localStorage.setItem('aiSites', JSON.stringify(sites));
}

function renderSites() {
    grid.innerHTML = '';
    sites.forEach((site, index) => {
        const card = document.createElement('a');
        card.href = site.url;
        card.target = "_blank";
        card.className = "card";

        // 삭제 버튼 생성 및 이벤트 추가
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerText = '삭제';
        deleteBtn.onclick = (e) => {
            e.preventDefault(); // 클릭 시 링크로 이동하는 기본 동작 방지
            if(confirm(`'${site.name}' 사이트를 삭제하시겠습니까?`)) {
                sites.splice(index, 1); // 배열에서 해당 항목 삭제
                saveSites();            // 변경된 배열 저장
                renderSites();          // 화면 다시 그리기
            }
        };

        // 타이틀 생성
        const title = document.createElement('h3');
        title.innerText = site.name;

        // 카드에 요소 추가
        card.appendChild(deleteBtn);
        card.appendChild(title);
        grid.appendChild(card);
    });
}

addBtn.onclick = () => {
    modal.style.display = 'flex';
};

function closeModal() {
    modal.style.display = 'none';
    nameInput.value = '';
    urlInput.value = '';
}
cancelBtn.onclick = closeModal;

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

renderSites();
