/**
 * 경력자 포트폴리오 - 메인 스크립트
 * 모바일 메뉴, 스크롤 효과, 스무스 스크롤 등
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();
  initHeaderScroll();
  initActiveMenu();
  initScrollReveal();
  initProjectModal();
  initSkillsIcons();
});

/**
 * 모바일 사이드바 메뉴 토글
 */
function initMobileMenu() {
  const toggle = document.querySelector('.sidebar__toggle');
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.querySelector('.sidebar__backdrop');
  const links = document.querySelectorAll('.sidebar__menu a');

  if (!toggle || !sidebar) return;

  function openSidebar() {
    sidebar.classList.add('is-open');
    toggle.classList.add('is-active');
    if (backdrop) backdrop.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    toggle.classList.remove('is-active');
    if (backdrop) backdrop.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    if (sidebar.classList.contains('is-open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeSidebar);
  }

  links.forEach(link => {
    link.addEventListener('click', closeSidebar);
  });
}

/**
 * 앵커 링크 스무스 스크롤
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * 현재 보이는 섹션에 해당하는 메뉴 하이라이트
 */
function initActiveMenu() {
  const links = document.querySelectorAll('.sidebar__menu a[href^="#"]');
  const sections = [];

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const section = document.querySelector(href);
    if (section) sections.push({ link, section });
  });

  function updateActiveMenu() {
    const scrollY = window.scrollY + 120;
    let activeLink = null;

    for (const { link, section } of sections) {
      if (section.offsetTop <= scrollY) {
        activeLink = link;
      }
    }

    links.forEach((l) => l.classList.remove('is-active'));
    if (activeLink) activeLink.classList.add('is-active');
  }

  window.addEventListener('scroll', updateActiveMenu, { passive: true });
  updateActiveMenu();
}

/**
 * 스크롤 시 사이드바 배경 변화
 */
function initHeaderScroll() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      sidebar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
      sidebar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 스크롤 시 섹션 페이드인 효과
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.about__grid, .timeline__item, .competencies__item, .featured-projects__grid, .skills__license, .skills__category, .contact__content'
  );

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // 약간의 딜레이로 순차적 등장
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

/**
 * 기술 스택 카테고리 매핑 (프로젝트 상세용)
 * - 문자열 techStack을 파싱하여 카테고리별로 그룹화
 */
const TECH_CATEGORY_MAP = {
  Language: ['CAPL', 'C#'],
  Hardware: ['T32', 'VN5620', 'VX1000', 'VN1640', 'VT System', 'NI HILS 장비', 'Vector', 'dSPACE'],
  Software: [
    'CANoe', 'vTestStudio', 'CANdelaStudio', 'CANoe.DiVa', 'WireShark', 'H-OTA Studio', 'Indigo',
    'CANape', 'Veristand', 'dysnomia', 'SourceInsight', 'VSCode',
    'AutomationDesk', 'ModelDesk', 'ControlDesk', 'SYNECT'
  ],
  'Configuration Management': ['Jira', 'Confluence', 'Bitbucket', 'SourceTree', 'Sourcetree'],
  'Process/Methodology': [
    'HILS 환경 구성', '요구사항 분석', 'Test Specification', '자동화 스크립트 개발',
    'Regression Test', 'A-SPICE 대응 문서 작성 (영문)', 'SWRS 분석', 'Test Case Specification',
    'ISO26262 ASIL-B 대응', '영문 기술 문서 작성'
  ]
};

function renderTechStackByCategory(techStack) {
  if (!techStack) return '<p class="project-detail__tech">-</p>';
  const categories = typeof techStack === 'object' && !Array.isArray(techStack)
    ? techStack
    : categorizeTechStack(techStack);
  const entries = Object.entries(categories).filter(([, items]) => items?.length);
  if (!entries.length) return '<p class="project-detail__tech">-</p>';
  return `
    <div class="project-detail__tech-list">
      ${entries.map(([cat, items]) => `
        <div class="project-detail__tech-row">
          <span class="project-detail__tech-label">${cat}</span>
          <span class="project-detail__tech-items">${items.join(', ')}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function categorizeTechStack(techStackStr) {
  if (!techStackStr || typeof techStackStr !== 'string') return {};
  const items = techStackStr.split('/').map(s => s.trim()).filter(Boolean);
  const result = {};

  for (const item of items) {
    let category = 'Etc.';
    for (const [cat, tools] of Object.entries(TECH_CATEGORY_MAP)) {
      if (tools.some(t => item.includes(t) || t.includes(item))) {
        category = cat;
        break;
      }
    }
    if (!result[category]) result[category] = [];
    if (!result[category].includes(item)) result[category].push(item);
  }

  // 카테고리 표시 순서
  const order = ['Language', 'Hardware', 'Software', 'Configuration Management', 'Process/Methodology', 'Etc.'];
  const sorted = {};
  for (const cat of order) {
    if (result[cat]?.length) sorted[cat] = result[cat];
  }
  for (const cat of Object.keys(result)) {
    if (!sorted[cat]) sorted[cat] = result[cat];
  }
  return sorted;
}

/**
 * 기술 스택 아이콘 적용
 * - slug (string): Simple Icons CDN 사용
 * - { url: string }: 커스텀 이미지 URL (Vector CANoe 등)
 * - null: 기본 코드 아이콘 사용
 */
const VECTOR_CANOE_ICON = 'images/vector-canoe.png';

const SKILL_ICONS = {
  CAPL: 'c', 'C#': { url: 'images/csharp.png' },
  Vector: { url: VECTOR_CANOE_ICON },
  dSPACE: { url: 'images/dspace.png' }, T32: { url: 'images/t32.png', size: 'large' },
  CANoe: { url: VECTOR_CANOE_ICON },
  vTestStudio: { url: VECTOR_CANOE_ICON },
  CANdelaStudio: { url: VECTOR_CANOE_ICON },
  'CANoe.DiVa': { url: VECTOR_CANOE_ICON },
  WireShark: 'wireshark',
  'H-OTA Studio': { url: 'images/h-ota.png' }, Indigo: { url: VECTOR_CANOE_ICON },
  CANape: { url: VECTOR_CANOE_ICON },
  Jira: 'jira', Confluence: 'confluence', Bitbucket: 'bitbucket', Sourcetree: 'sourcetree'
};

const FALLBACK_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>';

function initSkillsIcons() {
  document.querySelectorAll('.skills__list li').forEach((li) => {
    const name = li.textContent.trim();
    const icon = SKILL_ICONS[name];
    const iconEl = document.createElement('span');
    iconEl.className = 'skill-icon' + (icon && icon.size === 'large' ? ' skill-icon--large' : '');
    let src = null;
    if (typeof icon === 'string') {
      src = `https://cdn.simpleicons.org/${icon}/555555`;
    } else if (icon && icon.url) {
      src = icon.url;
    }
    if (src) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = name;
      img.width = 20;
      img.height = 20;
      iconEl.appendChild(img);
    } else {
      iconEl.innerHTML = FALLBACK_SVG;
    }
    li.insertBefore(iconEl, li.firstChild);
  });
}

/**
 * 프로젝트 상세 모달
 */
let projectDataCache = null;

async function loadProjectData() {
  if (projectDataCache) return projectDataCache;
  try {
    const res = await fetch('resource/project_detail/projects.json');
    projectDataCache = await res.json();
    return projectDataCache;
  } catch (err) {
    console.error('프로젝트 데이터 로드 실패:', err);
    return {};
  }
}

function renderProjectDetail(project) {
  if (!project) return '';

  const meta = project.meta || {};
  const metaRows = [
    meta.customer && { label: '고객사', value: meta.customer },
    meta.period && { label: '기간', value: meta.period },
    meta.ecu && { label: '대상 ECU', value: meta.ecu },
    meta.role && { label: '역할', value: meta.role }
  ].filter(Boolean);

  const metaTableHtml = metaRows.length
    ? `<table class="project-detail__meta-table">
        <tbody>
          ${metaRows.map(r => `<tr><th>${r.label}</th><td>${r.value}</td></tr>`).join('')}
        </tbody>
      </table>`
    : '';

  let html = `
    <div class="project-detail">
      <h2 class="project-detail__title">${project.title}</h2>
      <div class="project-detail__meta">${metaTableHtml}</div>

      <section class="project-detail__section">
        <h3>프로젝트 개요</h3>
        <ul>${(project.overview || []).map(o => `<li>${o}</li>`).join('')}</ul>
      </section>

      <section class="project-detail__section">
        <h3>주요 수행 내용</h3>
        ${(project.tasks || []).map(task => `
          <div class="project-detail__task">
            <h4>${task.title}</h4>
            ${task.subtitle ? `<p class="project-detail__subtitle">${task.subtitle}</p>` : ''}
            <ul>${(task.items || []).map(i => `<li>${i}</li>`).join('')}</ul>
          </div>
        `).join('')}
      </section>

      <section class="project-detail__section">
        <h3>기술 스택</h3>
        ${renderTechStackByCategory(project.techStack)}
      </section>

      <section class="project-detail__section">
        <h3>주요 성과</h3>
        <ul class="project-detail__competencies">${(project.competencies || []).map(c => `<li>${c}</li>`).join('')}</ul>
      </section>
    </div>
  `;

  return html;
}

function renderProjectCard(projectId, project) {
  if (!project) return '';
  const meta = project.meta || {};
  const techTags = (project.techStack || '').split('/').map(s => s.trim()).filter(Boolean).slice(0, 5);
  const summary = (project.summary || '').replace(/^["']|["']$/g, '');

  return `
    <article class="project-card" data-project-id="${projectId}">
      <div class="project-card__header">
        <span class="project-card__customer">${meta.customer || ''}</span>
      </div>
      <h3 class="project-card__title">${project.title}</h3>
      <p class="project-card__summary">${summary}</p>
      <div class="project-card__tags">
        ${techTags.map(t => `<span class="project-card__tag">${t}</span>`).join('')}
      </div>
      <span class="project-card__cta">상세 보기 →</span>
    </article>
  `;
}

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const content = document.getElementById('projectModalContent');
  const grid = document.getElementById('featuredProjectsGrid');
  const closeTriggers = document.querySelectorAll('[data-modal-close]');

  if (!modal || !content) return;

  function openModal(projectId) {
    loadProjectData().then(data => {
      const project = data[projectId];
      if (project && typeof project === 'object' && !Array.isArray(project)) {
        content.innerHTML = renderProjectDetail(project);
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // 프로젝트 상세 카드 렌더링
  loadProjectData().then(data => {
    const order = data.featuredOrder || Object.keys(data).filter(k => !k.startsWith('_') && k !== 'featuredOrder');
    const projects = order
      .filter(id => data[id] && typeof data[id] === 'object')
      .map(id => ({ id, project: data[id] }));

    if (grid) {
      grid.innerHTML = projects
        .map(({ id, project }) => renderProjectCard(id, project))
        .join('');

      grid.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
          const id = card.dataset.projectId;
          if (id) openModal(id);
        });
      });
    }
  });

  closeTriggers.forEach(trigger => {
    trigger.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
}
