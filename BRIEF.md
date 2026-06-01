# Joy PM — Brief


## ❗ Vấn đề đang gặp
Hiện tại tôi đang gặp vấn đề là có nhiều vấn đề để xử lý nên nhảy đi nhảy lại giữa các brand rồi các task cũ quên mất mình đã làm gì của nó khiến
1. Đọc lại code base thì tốn thời gián khi tôi đọc md thì file nahyf hơi thiếu thân thiện do nó gen theo chuẩn của joy chứ không phải của tôi dẫn đến chính tôi đọc lại còn không hiểu huống gì để mn review
2. Các nguồn đọc từ notion thì thường do PO BA gen nên nó bay quá đôi khi không đúng không đang tin cậy , md chính tôi làm cũng không tin cậy do trong đó không update thời gian phát triển thịc (Có docs nhưunxg task đã live chưa tiến trình như thế nào, lỗi gặp đang local staging hay production sẽ co hướng xử lý riêng)
-
## 🎯 Tôi muốn cái này để làm gì
Tôi cần 1 prj tự quản lý đucowj abnr thân, công việc thực heienj nhưng công việc lặp lại, đơn giản hoá quá trình để có thể tập chung vào các vấn đề khác kiểu không cần phải kiểu ê cái anyf sao trước mjinhf không làm sao lại almf nhưu này nguyên nhân 


## 🙏 Mong muốn
1. Kanban board dựa theo quy trình của Joy hiện tại chủ yếu là
doing - test - uat - review - deploy - test prod
tôi muốn đưa thành quy trình cho dev dựa vào 2 kiểu 
feature: tổng hợp thông tin- verify xác định vấn đề - lên plan - làm từng phần(cái này loop chia nhỏ các phần ra vì 1 feature không thể 50 cái file đổi rồi commit 1 thể đc ) - review - deploy staging  - fix bug .. keieur kiểu vậy 
fix bug các support: chủ yếu là khoanh vùng lỗi tái hiện xác định lỗi sửa lỗi review deploy rồi test lại 
2. Trong kanban cần có gì 
- thông tin BA đọc 
- thông tin cho review đọc như thiết kế rồi trade off
- thông tin cho dev đọc: đã làm đến đâu như thế nào 
Tôi muốn 1 prj để cho tôi có thể 
- ê đọc notion này đi tổng hợp lại vấn đề bn có gì chưa hiểu hỏi lại cùng AI sửa lại vấn đề cùng code cùng theo dõi ấy kiểu vậy 
- multi tôi sẽ clon joy, joy-2, joy-3 để có thể thực heienj nheieuf task vụ cùng lúc 

## 📌 Cần quản lý những gì
Cần khả năng tích hợp cực mạnh. Đa dạng skill nhảy từ pjt này không có code base nhảy sang code prj kahcs bn có làm đc không cần bổ sung gì và dào cản làn gì 


## 🚫 KHÔNG cần (để khỏi đi xa)
Tập chung tính cá nhân lên nhé 
-

## 💭 Ghi chú linh tinh
Cái này chỉ là ý tưởng tôi mong nhận đc đánh giá và phân tích của bn bổ sung nhé à với đổi tên gì đó nghe cute đi chứ joy pm láo quá 

Tôi muốn note lại 1 chút trong quá trình xử dụng nhé 
1. Ở mỗi nơi làm cần rõ là cần làm rõ công việc hơn nữa và trừ step 1 ra các step còn lại chỉ đc move khi tôi đồng ý thôi nhé 
FEATURE
   gather: (Bạn AI thực hiện hoàn toàn) Bạn làm hoàn toàn thực hiện tổng hợp cả phân tích xem có gì không đúng so sánh sơ với code base joy đặt câu hỏi lại cho tôi tao hỏi PO kéo sang verify luôn
   verify: (Bạn tôi cùng thảo luận lại hết để nọi yêu cầu clean nhất )Tôi đưa câu trả lời cho bn bn phân tích tính khả thi khi thực hiện liên tục hỏi lại tôi đến khi tôi tháy okie rồi move qua tạo planh rõ rang 
   plan: (Bạn thực hiện tôi review) cái này verify thì đưa ra kế hoạnh tổng quát và càng chi tiết càng tốt tạo lươn md ở folder respo joy luôn nhé VÀ ĐẶC BIỆT CHIA RA CÁC PHASE THỰC HIỆN tôi review rồi tự bảo move nếu đc cái này tôi vẫn có thể hỏi lại nhé
   coding: (Bạn code theo plan từng phase tôi review ) cái này cứ làm từng phase rồi commit rồi làm cái mới cái này càng chi tiết càng tốt thực ra cái này sẽ bao gồm các bước nhỏ bn code, tôi và bạn cùng review, tôi test
   deploy staging: checkout brand và commit deploy lên staging 
   testing staging: lên cái này đẩy lên staging cho tester test rồi nhưungx sẽ có lỗi cần sửa cũng giống như 1 cái coding bản nhỏ đi bn tự setup nhé
   review: cái này để Techlead review thì tạo 1 file review md và commit để nó deploy tôi tự paste doc để review đọc nhé 
   deploy: đã lên production ( Cái này cần bn sửa nếu có bug cần monitor nếu là tag nhưu sync export nặng)

BUG workflow
localize: bạn xác định hoàn toàn và tự move và đưa ra cách tại hiện nhé or check ở đâu nhé
reproduce: Cái này tôi làm hoàn toàn tôi tự tái hiện và tự kêu bn move lên nhé 
Xác định: bn xác định và đặc biệt mô tả xác định lỗi và đề xuất sửa nhé 
Sửa lỗi: Thực heienj tren repo nào checkout brand mới và sửa tôi review lại move nếu tôi đồng ý 
Deploy: cái này là tôi test trên production xem okie chưa 