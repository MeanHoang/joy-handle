Chọn xuất bất đồng bộ qua Pub/Sub thay vì xuất trực tiếp trong request, vì 500+ đơn sẽ vượt 5s timeout của webhook.

| Issue | Source says | Real code | ✅ Decision |
| ----- | ----------- | --------- | ----------- |
| Số đơn tối đa | "vài chục" | thực tế có shop 2000+ | Bắt buộc dùng bulk API + Pub/Sub |
| Định dạng | CSV | kế toán dùng Excel | Xuất `.xlsx` |
