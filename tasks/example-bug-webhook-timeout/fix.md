**Nguyên nhân:** webhook tính phí ship đồng bộ ngay trong request, cao điểm mất 6–8s → vượt 5s timeout nên platform retry rồi bỏ đơn. Query phí ship còn thiếu Firestore index (compound query).

**Giải pháp:**
- Thêm Firestore index cho query tính phí ship.
- Đẩy phần tính phí nặng sang Pub/Sub, webhook trả `200` ngay (≤5s).

**Tiến độ / retest:**
- [x] Khoanh vùng + tái hiện trên staging (200 đơn/phút)
- [ ] Thêm index + tách Pub/Sub
- [ ] Retest đo lại thời gian phản hồi < 5s

_env: production — đang xảy ra, ưu tiên cao._
