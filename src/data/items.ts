import { DiscoveryItem, QuizQuestion } from '../types';

import gummyImg from '../assets/images/item_gummy_bear_1789879360042.jpg';
import milkTeaImg from '../assets/images/item_milk_tea_1789879373662.jpg';
import balloonsImg from '../assets/images/item_balloons_1789879389285.jpg';
import paperStampImg from '../assets/images/item_paper_stamp_1789879405797.jpg';
import sodaCanImg from '../assets/images/item_soda_can_1789879420549.jpg';

export const DISCOVERY_ITEMS: DiscoveryItem[] = [
  {
    id: 'gummy',
    name: 'KẸO DẺO GẤU',
    shortName: 'Kẹo dẻo gấu',
    emoji: '🍬',
    imageSrc: gummyImg,
    status: 'warning',
    statusLabel: 'CẢNH BÁO',
    badgeText: 'KHÔNG NHẬN – KHÔNG ĂN – BÁO NGƯỜI LỚN',
    narrationText:
      'Các em hãy quan sát. Trong tình huống mô phỏng này, chiếc kẹo có vẻ ngoài giống một món ăn quen thuộc nhưng lại có dấu hiệu bất thường bên trong. Vì vậy Kính Hiển Vi Thần Kỳ đưa ra cảnh báo. Ngoài đời, các em không nên nhận hoặc ăn những món đồ không rõ nguồn gốc. Nếu thấy điều gì bất thường, hãy báo ngay cho người lớn.',
    monsterInside: true,
  },
  {
    id: 'milk_tea',
    name: 'CHAI TRÀ SỮA',
    shortName: 'Chai trà sữa',
    emoji: '🧋',
    imageSrc: milkTeaImg,
    status: 'safe',
    statusLabel: 'AN TOÀN TRONG TÌNH HUỐNG MÔ PHỎNG',
    badgeText: 'NGUỒN GỐC RÕ RÀNG – AN TOÀN',
    narrationText:
      'Trong tình huống mô phỏng này, Kính Hiển Vi không phát hiện dấu hiệu bất thường. Tuy nhiên, các em cần nhớ: khi sử dụng đồ ăn hoặc đồ uống, hãy chọn sản phẩm có nguồn gốc rõ ràng và được người lớn tin tưởng.',
    monsterInside: false,
  },
  {
    id: 'balloons',
    name: 'BÓNG BAY',
    shortName: 'Bóng bay',
    emoji: '🎈',
    imageSrc: balloonsImg,
    status: 'safe',
    statusLabel: 'AN TOÀN TRONG TÌNH HUỐNG MÔ PHỎNG',
    badgeText: 'KHÔNG TỰ Ý NHẬN ĐỒ TỪ NGƯỜI LẠ',
    narrationText:
      'Trong tình huống mô phỏng này, Kính Hiển Vi không phát hiện dấu hiệu bất thường. Nhưng các em hãy nhớ: nếu một người không quen biết đưa cho em một vật phẩm hoặc món đồ chơi không rõ nguồn gốc, em không nên tự ý nhận. Hãy hỏi người lớn trước.',
    monsterInside: false,
  },
  {
    id: 'stamp',
    name: 'TEM GIẤY LẠ',
    shortName: 'Tem giấy lạ',
    emoji: '🏷️',
    imageSrc: paperStampImg,
    status: 'warning',
    statusLabel: 'CẢNH BÁO',
    badgeText: 'KHÔNG CHẠM – KHÔNG NẾM – KHÔNG NGỬI – BÁO NGƯỜI LỚN',
    narrationText:
      'Các em hãy chú ý. Trong tình huống mô phỏng này, đây là một vật phẩm không rõ nguồn gốc và có dấu hiệu bất thường. Các em không cần tự mình xác định đó là chất gì. Điều quan trọng là không chạm vào, không nếm, không ngửi và báo ngay cho người lớn.',
    monsterInside: true,
  },
  {
    id: 'soda',
    name: 'LON NƯỚC NGỌT CÓ NHÃN LẠ',
    shortName: 'Lon nước ngọt nhãn lạ',
    emoji: '🥤',
    imageSrc: sodaCanImg,
    status: 'warning',
    statusLabel: 'CẢNH BÁO',
    badgeText: 'KHÔNG UỐNG – KHÔNG THỬ – BÁO NGƯỜI LỚN',
    narrationText:
      'Trong tình huống mô phỏng này, chiếc lon có nhãn không rõ nguồn gốc và có dấu hiệu bất thường. Các em tuyệt đối không nên tự ý uống hoặc thử một sản phẩm không biết rõ nguồn gốc. Nếu gặp tình huống như vậy, hãy tránh xa và báo ngay cho người lớn.',
    monsterInside: true,
  },
];

export const INTRO_SPEECH =
  'Chào các em! Hôm nay chúng ta sẽ cùng tham gia một nhiệm vụ đặc biệt. Trên chiếc bàn này có những vật phẩm trông rất quen thuộc. Nhưng liệu chúng có thực sự an toàn? Cô sẽ lần lượt dùng Kính Hiển Vi Thần Kỳ để kiểm tra. Các em hãy quan sát thật kỹ nhé!';

export const SUMMARY_SPEECH =
  'Các em đã hoàn thành nhiệm vụ! Qua hoạt động hôm nay, chúng ta biết rằng không nên đánh giá một vật phẩm chỉ bằng vẻ ngoài. Khi gặp đồ ăn, đồ uống hoặc vật phẩm không rõ nguồn gốc, các em không tự ý nhận, không thử và không tự kiểm tra. Hãy tránh xa và báo ngay cho người lớn.';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    badge: 'TÌNH HUỐNG 1: KẸO DẺO GẤU SẶC SỠ',
    topic: '🍬 Kẹo dẻo gấu lạ biến hình',
    question: 'Khi thấy viên kẹo có hình dáng và màu sắc sặc sỡ nhưng không rõ nguồn gốc, bao bì không có nhãn mác, em nên làm gì?',
    options: [
      { id: 'A', text: 'Tò mò bóc ra nếm thử xem có ngon không', isCorrect: false },
      { id: 'B', text: 'Cất vào cặp để mang về nhà ăn sau', isCorrect: false },
      { id: 'C', text: 'Tuyệt đối không nhận, không ăn và báo ngay cho người lớn', isCorrect: true },
    ],
    correctSpeech:
      'Hoàn toàn chính xác! Bánh kẹo không rõ nguồn gốc có thể chứa chất nguy hại. Các em tuyệt đối không nhận, không ăn và báo ngay cho người lớn.',
    wrongSpeech:
      'Chưa đúng rồi các em ơi! Viên kẹo không rõ nguồn gốc rất nguy hiểm, dù có vẻ ngoài bắt mắt các em tuyệt đối không được tự ý ăn thử nhé.',
  },
  {
    id: 2,
    badge: 'TÌNH HUỐNG 2: MIẾNG TEM GIẤY LẠ MẮT',
    topic: '🏷️ Tem giấy lạ mắt',
    question: 'Nếu nhìn thấy hoặc có người lạ đưa cho em miếng tem giấy in hình hoạt hình sặc sỡ kỳ lạ, em sẽ xử lý thế nào?',
    options: [
      { id: 'A', text: 'Tuyệt đối không chạm, không nếm, không ngửi và báo ngay cho người lớn', isCorrect: true },
      { id: 'B', text: 'Dán thử lên mu bàn tay hoặc đưa lên miệng ngậm', isCorrect: false },
      { id: 'C', text: 'Cầm về sưu tầm và chia cho các bạn cùng chơi', isCorrect: false },
    ],
    correctSpeech:
      'Rất giỏi! Tem giấy lạ có thể tẩm chất nguy hiểm ngấm qua da hoặc đường miệng. Các em nhớ: không chạm, không nếm, không ngửi và báo người lớn ngay!',
    wrongSpeech:
      'Rất nguy hiểm các em ơi! Tem giấy lạ có thể ngấm hóa chất độc hại vào cơ thể, tuyệt đối không chạm vào, không dán lên tay hay nếm thử nhé.',
  },
  {
    id: 3,
    badge: 'TÌNH HUỐNG 3: LỰA CHỌN ĐỒ ĂN & ĐỒ UỐNG AN TOÀN',
    topic: '🧋 Đồ ăn & Đồ uống an toàn',
    question: 'Làm thế nào để các em biết một chai trà sữa hay lon nước ngọt là an toàn để sử dụng?',
    options: [
      { id: 'A', text: 'Chỉ cần vỏ ngoài đẹp mắt và có mùi thơm ngọt là uống được', isCorrect: false },
      { id: 'B', text: 'Sản phẩm có bao bì, hạn sử dụng rõ ràng và do cha mẹ, thầy cô cung cấp', isCorrect: true },
      { id: 'C', text: 'Do bất kỳ ai ở ngoài đường cho cũng nhận, miễn là đang khát nước', isCorrect: false },
    ],
    correctSpeech:
      'Chính xác! Đồ ăn thức uống an toàn phải có nguồn gốc, hạn sử dụng rõ ràng và do cha mẹ hoặc thầy cô tin tưởng mua cho các em.',
    wrongSpeech:
      'Chưa chính xác! Vỏ ngoài đẹp mắt hay mùi thơm không quyết định độ an toàn. Các em chỉ nên uống đồ có nguồn gốc rõ ràng do người lớn cung cấp.',
  },
  {
    id: 4,
    badge: 'TÌNH HUỐNG 4: QUÀ TẶNG TỪ NGƯỜI LẠ Ở CỔNG TRƯỜNG',
    topic: '🎈 Quà tặng từ người lạ ở cổng trường',
    question: 'Khi tan học, nếu có một người lạ mặt tiến đến tặng bóng bay hoặc gói kẹo rồi rủ em đi theo, em xử lý ra sao?',
    options: [
      { id: 'A', text: 'Vui vẻ nhận quà và đi theo người lạ ngay', isCorrect: false },
      { id: 'B', text: 'Lịch sự từ chối, lùi ra xa và chạy đến báo cho thầy cô, bảo vệ hoặc cha mẹ', isCorrect: true },
      { id: 'C', text: 'Đứng lại một mình để trò chuyện và nhận bóng bay', isCorrect: false },
    ],
    correctSpeech:
      'Rất xuất sắc! Các em tuyệt đối không tự ý nhận đồ từ người lạ, luôn giữ khoảng cách an toàn và báo ngay cho thầy cô hoặc chú bảo vệ.',
    wrongSpeech:
      'Cảnh báo nguy hiểm! Đi theo hoặc nhận đồ từ người lạ rất rủi ro. Các em phải từ chối dứt khoát và chạy đến chỗ người lớn ngay nhé.',
  },
  {
    id: 5,
    badge: 'TÌNH HUỐNG 5: NGUYÊN TẮC VÀNG BẢO VỆ BẢN THÂN',
    topic: '🛡️ 4 Nguyên tắc vàng bảo vệ bản thân',
    question: 'Khi gặp bất kỳ đồ vật, bánh kẹo hay nước uống lạ nghi ngờ, 4 NGUYÊN TẮC VÀNG em cần ghi nhớ là gì?',
    options: [
      { id: 'A', text: 'TỰ MÌNH THỬ XEM SAO', isCorrect: false },
      { id: 'B', text: 'ĐEM CHIA CHO CÁC BẠN CÙNG DÙNG', isCorrect: false },
      { id: 'C', text: 'KHÔNG NHẬN – KHÔNG THỬ – KHÔNG SỬ DỤNG – BÁO NGAY CHO NGƯỜI LỚN', isCorrect: true },
    ],
    correctSpeech:
      'Hoàn hảo! Các em đã nắm vững chiếc Lá Chắn An Toàn: Không nhận, không thử, không sử dụng và báo ngay cho người lớn!',
    wrongSpeech:
      'Các em hãy ghi nhớ thật kỹ 4 nguyên tắc vàng: Không nhận, không thử, không sử dụng và báo ngay cho người lớn để bảo vệ bản thân nhé!',
  },
];

// Legacy single-question export for backward compatibility
export const QUIZ_QUESTION = QUIZ_QUESTIONS[4].question;
export const QUIZ_OPTIONS = QUIZ_QUESTIONS[4].options;
export const QUIZ_CORRECT_SPEECH = QUIZ_QUESTIONS[4].correctSpeech;
export const QUIZ_WRONG_SPEECH = QUIZ_QUESTIONS[4].wrongSpeech;

export const FINAL_SPEECH =
  'Chúc mừng các em đã hoàn thành Chặng 1: Nhận diện Kẹo lạ biến hình!';

