# Sprint Mission 3

**디렉토리 구조**

```bash
mission3/
├── app.js                # 메인 애플리케이션 파일
├── prisma                # Prisma 관련
│   ├── migrations        # 데이터베이스 마이그레이션
│   └── schema.prisma     # Prisma 스키마 파일
├── src                   # 소스 코드
│   └── routes            # 라우터
│       ├── article.js
│       ├── product.js
│       └── ...
└── uploads               # 업로드된 파일 저장 경로
```

---

**스키마 설계**
<br/>
중고마켓 상품 (Product)<br/>
자유게시판 게시글 (Article)<br/>
댓글 (Comment)<br/>

**관계**

- 상품 - 댓글: 1:N 관계
- 게시글 - 댓글: 1:N 관계
- 댓글 - 상품/게시글: N:1 관계
