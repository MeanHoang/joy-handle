## 📎 Nguồn
- Ticket: https://tickets.avada.net/t/JOY-260601-RDwnWn
- Slack: https://avadaio.slack.com/archives/C020QJ7F7RN/p1780293184449219
- Crisp: https://app.crisp.chat/website/72a663b0-4cda-4e3b-8878-426bdd79364c/inbox/session_b5dbb3a6-a5f1-4133-ad84-cccd2e56d43c
- Ảnh: https://capture.avada.io/i/lYdRYbrmPwPV
- Shop: ggeyqn-b7.myshopify.com (JOY Loyalty, plan advanced_2026)

**Triệu chứng:** Trên Widget Loyalty, **condition text của từng Place Order program rule** không có chỗ để dịch / chỉnh. Support vào phần Translation của app thì **không thấy field** cho order condition text.

**Nguyên nhân:** Widget V4 dựng condition text của Place Order rule từ chuỗi EN hardcode trong `packages/web-components/src/utils/data-mapper.ts`, KHÔNG qua translation lookup nào, và editor `translationsWidgetV4.js` không có field cho nó → không dịch/đổi được.
- `PLACE_ORDER_FIELD_LABELS` (data-mapper.ts:118–149) — 28 nhãn field hardcode
- `PLACE_ORDER_MATCH_LABELS` (151–166) — 14 toán tử hardcode
- Câu cố định: `Applies to all products` (293), `Applies to products` (301), `Does not apply to products`, `Applies to selected products (N)`…
- Render thẳng `<li>${condition}</li>` ở `joy-earn-detail.ts:722–726`, không dịch.

**Giải pháp:** _chốt scope với user (xem 3 option) trước khi sửa._

**Tiến độ / retest:**
- [ ] tái hiện (Widget + Translation settings)
- [ ] khoanh vùng field condition text của Place Order rule
- [ ] sửa
- [ ] retest pass

_Env lỗi: production._
