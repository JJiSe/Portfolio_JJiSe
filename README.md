<<<<<<< HEAD
# 경력자 포트폴리오 템플릿

경력 개발자/PM을 위한 모던하고 전문적인 포트폴리오 웹사이트 템플릿입니다.

## 📁 프로젝트 구조

```
portfolio template/
├── index.html          # 메인 HTML
├── css/
│   └── style.css      # 스타일시트
├── js/
│   └── main.js        # 인터랙션 스크립트
├── assets/             # 이미지, 아이콘 등 (자유롭게 추가)
└── README.md
```

## 🚀 실행 방법

별도의 빌드 도구 없이 바로 사용 가능합니다.

1. `index.html` 파일을 브라우저에서 직접 열기
2. 또는 로컬 서버 실행:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (npx)
   npx serve .
   ```
3. 브라우저에서 `http://localhost:8000` 접속

## ✏️ 커스터마이징 가이드

### 1. 개인 정보 수정
`index.html`에서 다음 항목을 본인 정보로 변경하세요:
- **히어로**: 이름, 직함, 태그라인
- **소개**: 경력 요약, 하이라이트
- **경력**: 회사명, 기간, 역할, 설명
- **스킬**: 기술 스택
- **프로젝트**: 프로젝트명, 설명, 사용 기술
- **연락처**: 이메일, GitHub, LinkedIn 링크

### 2. 프로필 이미지 추가
`assets/` 폴더에 `profile.jpg` 등 이미지를 넣은 후, `index.html`의 소개 섹션에서:

```html
<div class="about__image">
  <img src="assets/profile.jpg" alt="프로필" class="about__image-placeholder">
</div>
```

(기존 placeholder div를 img 태그로 교체)

### 3. 프로젝트 썸네일 추가
각 `project-card__placeholder` div를 실제 이미지로 교체:

```html
<div class="project-card__image">
  <img src="assets/project1.jpg" alt="프로젝트 1">
</div>
```

### 4. 색상 변경
`css/style.css` 상단의 `:root` 변수에서:
- `--color-accent`: 메인 악센트 색상 (기본: 앰버 #f59e0b)
- `--color-bg`: 배경색
- `--color-text`: 텍스트 색상

## 📱 반응형 지원

- **데스크톱**: 1100px 기준 컨테이너
- **태블릿**: 768px 이하에서 그리드 조정
- **모바일**: 햄버거 메뉴, 세로 레이아웃

## 🛠 기술 스택

- 순수 HTML5, CSS3, JavaScript
- Google Fonts (Noto Sans KR, JetBrains Mono)
- CSS Variables 기반 테마
- Intersection Observer API (스크롤 애니메이션)

## 📄 라이선스

자유롭게 수정하여 사용하세요.
=======
포트폴리오
>>>>>>> 36231d3bf6da57c9f3004efc4b4f1f86dbcd40e3
