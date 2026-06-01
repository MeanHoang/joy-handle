# Joy PM — Feature Hub

Trang web docs nội bộ cho Joy: **spec đã lọc** + **pha quy trình** của từng feature.
BA & team đọc trên web, không cần mở repo Joy.

## Chạy local

```bash
yarn install   # hoặc npm install
yarn dev       # http://localhost:3000
```

## Thêm 1 feature

1. Copy `pages/features/_template.mdx` → `pages/features/<ten-feature>.mdx`
2. Thêm dòng vào `pages/features/_meta.json`: `"<ten-feature>": "Tên hiển thị"`
3. Cập nhật bảng ở `pages/index.mdx`

## Deploy lên Vercel

1. Push repo lên GitLab/GitHub.
2. Vercel → New Project → import repo này.
3. Framework tự nhận **Next.js** — không cần config. Bấm Deploy.

## Ranh giới

- Spec ở đây = **đầu vào** (build cái gì), KHÔNG mô tả code đang chạy.
- Sự thật về code + "đã code xong gì" = repo **Joy** + git/MR.
- Hub này chỉ theo dõi **pha quy trình**, không ghi tay checklist code.
