/**

============================================================

الصاج - المشوي — طبقة البيانات المركزية

============================================================

المصدر: قائمة المنيو الشاملة المرسلة من إدارة المشروع

(آخر قائمة شاملة — تُقدَّم على أي قوائم سابقة عند التعارض،

ولم تُدمج القوائم المتعارضة تلقائيًا).

ملاحظات الاعتماد:

لا توجد بيانات Demo في هذا الملف.


لا أعلام "featured" — تحديد الأطباق المميزة يأتي في خطوة لاحقة منفصلة.


الأسعار المفردة في price، ومتعددة الأحجام في prices — لا يُملأ الحقلان معًا.


image: null لكل صنف حتى تتوفر صورة مؤكدة له فعلًا.


عرض الافتتاح (50% — 24/25/26 يناير) مسجّل كبيان تاريخي فقط، وغير نشط في الواجهة.


ملاحظة قسم البيتزا (العجين حسب الطلب + أطراف الجبنة +2) محفوظة كبيان قسم،


لا كنص تسويقي.

============================================================
*/


const RestaurantData = (function () {
'use strict';

const categories = [  
    { id: 'pizza',      name: 'البيتزا' },  
    { id: 'fatayer',    name: 'الفطائر' },  
    { id: 'brost',      name: 'البروست' },  
    { id: 'sauces',     name: 'الصوصات' },  
    { id: 'shawarma',   name: 'الشاورما' },  
    { id: 'grills',     name: 'المشويات' },  
    { id: 'juices',     name: 'العصائر' },  
    { id: 'breakfast',  name: 'الفطور' },  
    { id: 'pasta',      name: 'المكرونة' },  
    { id: 'maatoob',    name: 'المعصوب والعريكة' },  
    { id: 'potatoes',   name: 'البطاط' },  
    { id: 'appetizers', name: 'المقبلات' }  
];  

// ===== مجموعات الأصناف — حرفيًا من آخر قائمة شاملة =====  
const pizzaItems = [  
    { id: 'pizza-1',  category: 'pizza', name: 'بيتزا دجاج مفروم',            prices: [14, 18, 25], price: null,  calories: 265, image: null },  
    { id: 'pizza-2',  category: 'pizza', name: 'بيتزا دجاج',                  prices: [14, 18, 25], price: null,  calories: 265, image: null },  
    { id: 'pizza-3',  category: 'pizza', name: 'بيتزا خضار',                  prices: [14, 18, 25], price: null,  calories: 252, image: null },  
    { id: 'pizza-4',  category: 'pizza', name: 'بيتزا لحم',                   prices: [14, 18, 25], price: null,  calories: 283, image: null },  
    { id: 'pizza-5',  category: 'pizza', name: 'بيتزا مشكل',                  prices: [14, 15, 25], price: null,  calories: 315, image: null },  
    { id: 'pizza-6',  category: 'pizza', name: 'بيتزا موصلي',                 prices: [18, 25, 30], price: null,  calories: 291, image: null },  
    { id: 'pizza-7',  category: 'pizza', name: 'بيتزا تونة',                  prices: [18, 25, 30], price: null,  calories: 315, image: null },  
    { id: 'pizza-8',  category: 'pizza', name: 'بيتزا مارجريتا',              prices: [14, 18, 25], price: null,  calories: 281, image: null },  
    { id: 'pizza-9',  category: 'pizza', name: 'بيتزا شيز بايت',              prices: [18, 25, 30], price: null,  calories: 321, image: null },  
    { id: 'pizza-10', category: 'pizza', name: 'بيتزا الفريدو',               prices: [18, 25, 30], price: null,  calories: 291, image: null },  
    { id: 'pizza-11', category: 'pizza', name: 'بيتزا نقانق',                 prices: [14, 18, 25], price: null,  calories: 365, image: null },  
    { id: 'pizza-12', category: 'pizza', name: 'بيتزا شاورما',                prices: [18, 25, 30], price: null,  calories: 315, image: null },  
    { id: 'pizza-13', category: 'pizza', name: 'بيتزا شقير',                  prices: [18, 25, 30], price: null,  calories: 321, image: null },  
    { id: 'pizza-14', category: 'pizza', name: 'بيتزا رنش',                   prices: [14, 18, 25], price: null,  calories: 283, image: null },  
    { id: 'pizza-15', category: 'pizza', name: 'بيتزا حواء',                  prices: [18, 25, 30], price: null,  calories: 321, image: null },  
    { id: 'pizza-16', category: 'pizza', name: 'بيتزا مشكل أجبان',            prices: [14, 18, 25], price: null,  calories: 297, image: null },  
    { id: 'pizza-17', category: 'pizza', name: 'بيتزا عش بلبل',               prices: [14, 18, 25], price: null,  calories: 392, image: null },  
    { id: 'pizza-18', category: 'pizza', name: 'بيتزا جمبري',                 prices: [18, 25, 30], price: null,  calories: 324, image: null },  
    { id: 'pizza-19', category: 'pizza', name: 'بيتزا كروان كرست',            prices: [25, 30, 35], price: null,  calories: 371, image: null },  
    { id: 'pizza-20', category: 'pizza', name: 'بيتزا عش بلبل بالمكسرات',     prices: [20, 25, 30], price: null,  calories: 331, image: null },  
    { id: 'pizza-21', category: 'pizza', name: 'بيتزا شيز كروست',             prices: [20, 25, 30], price: null,  calories: 371, image: null },  
    { id: 'pizza-22', category: 'pizza', name: 'بيتزا زنجر',                  prices: [18, 25, 30], price: null,  calories: 373, image: null },  
    { id: 'pizza-23', category: 'pizza', name: 'بيتزا ببروني',                prices: [18, 25, 30], price: null,  calories: 321, image: 'images/menu/batch02-photo-12.jpg' },  
    { id: 'pizza-24', category: 'pizza', name: 'بيتزا استار',                 prices: [18, 25, 30], price: null,  calories: 341, image: null },  
    { id: 'pizza-25', category: 'pizza', name: 'بيتزا إسبيشل صاج',            prices: [18, 25, 30], price: null,  calories: 352, image: null },  
    { id: 'pizza-26', category: 'pizza', name: 'بيتزا مناقيش',                prices: [18, 25, 30], price: null,  calories: 392, image: null },  
    { id: 'pizza-27', category: 'pizza', name: 'بيتزا مطبق',                  prices: [18, 25, 30], price: null,  calories: 392, image: null },  
    { id: 'pizza-28', category: 'pizza', name: 'بيتزا نوتيلا',                prices: [18, 25, 30], price: null,  calories: 393, image: null },  
    { id: 'pizza-29', category: 'pizza', name: 'بيتزا مشكل أجبان أطراف جبن',  prices: [18, 25, 30], price: null,  calories: 410, image: null },  
    { id: 'pizza-30', category: 'pizza', name: 'بيتزا رانش أطراف جبن',        prices: [18, 25, 30], price: null,  calories: 395, image: null },  
    { id: 'pizza-31', category: 'pizza', name: 'بيتزا المستر',                prices: [18, 25, 30], price: null,  calories: 400, image: null }  
];  
const fatayerItems = [  
    { id: 'fatayer-1', category: 'fatayer', name: 'فطيرة شاورما', prices: null, price: 12, calories: 227, image: null },  
    { id: 'fatayer-2', category: 'fatayer', name: 'فطيرة اوصال دجاج', prices: null, price: 12, calories: 211, image: null },  
    { id: 'fatayer-3', category: 'fatayer', name: 'فطيرة كباب دجاج', prices: null, price: 12, calories: 222, image: null },  
    { id: 'fatayer-4', category: 'fatayer', name: 'فطيرة دجاج مفروم', prices: null, price: 11, calories: 191, image: null },  
    { id: 'fatayer-5', category: 'fatayer', name: 'فطيرة اوصال لحم', prices: null, price: 13, calories: 229, image: null },  
    { id: 'fatayer-6', category: 'fatayer', name: 'فطيرة كباب لحم', prices: null, price: 13, calories: 239, image: null },  
    { id: 'fatayer-7', category: 'fatayer', name: 'فطيرة لحم جبن', prices: null, price: 11, calories: 211, image: null },  
    { id: 'fatayer-8', category: 'fatayer', name: 'فطيرة جبن سائل', prices: null, price: 7, calories: 192, image: null },  
    { id: 'fatayer-9', category: 'fatayer', name: 'فطيرة جبن عسل', prices: null, price: 7, calories: 181, image: null },  
    { id: 'fatayer-10', category: 'fatayer', name: 'فطيرة لبنة سادة', prices: null, price: 7, calories: 161, image: null },  
    { id: 'fatayer-11', category: 'fatayer', name: 'فطيرة لبنة عسل', prices: null, price: 7, calories: 212, image: null },  
    { id: 'fatayer-12', category: 'fatayer', name: 'فطيرة جبنتين', prices: null, price: 9, calories: 214, image: null },  
    { id: 'fatayer-13', category: 'fatayer', name: 'فطيرة زنجر', prices: null, price: 7, calories: 208, image: null },  
    { id: 'fatayer-14', category: 'fatayer', name: 'فطيرة زيتون وزعتر', prices: null, price: 7, calories: 195, image: null },  
    { id: 'fatayer-15', category: 'fatayer', name: 'فطيرة مشكل أجبان', prices: null, price: 7, calories: 184, image: null },  
    { id: 'fatayer-16', category: 'fatayer', name: 'فطيرة سبانخ', prices: null, price: 7, calories: 157, image: null },  
    { id: 'fatayer-17', category: 'fatayer', name: 'فطيرة زعتر', prices: null, price: 7, calories: 222, image: null },  
    { id: 'fatayer-18', category: 'fatayer', name: 'فطيرة جبن بيض', prices: null, price: 7, calories: 197, image: null },  
    { id: 'fatayer-19', category: 'fatayer', name: 'فطيرة تونة', prices: null, price: 11, calories: 183, image: null },  
    { id: 'fatayer-20', category: 'fatayer', name: 'فطيرة لبنة زيتون', prices: null, price: 7, calories: 161, image: null },  
    { id: 'fatayer-21', category: 'fatayer', name: 'فطيرة جبن زعتر', prices: null, price: 7, calories: 172, image: null },  
    { id: 'fatayer-22', category: 'fatayer', name: 'فطيرة بطاط جبن', prices: null, price: 8, calories: 223, image: null },  
    { id: 'fatayer-23', category: 'fatayer', name: 'فطيرة خضار جبن', prices: null, price: 11, calories: 214, image: null },  
    { id: 'fatayer-24', category: 'fatayer', name: 'فطيرة نوتيلا', prices: null, price: 9, calories: 246, image: null },  
    { id: 'fatayer-25', category: 'fatayer', name: 'صحن مشكل فطائر', prices: null, price: 35, calories: 222, image: null },  
    { id: 'fatayer-26', category: 'fatayer', name: 'فطيرة لبنة حار', prices: null, price: 7, calories: 197, image: null },  
    { id: 'fatayer-27', category: 'fatayer', name: 'فطيرة جبن شيدر', prices: null, price: 7, calories: 245, image: null },  
    { id: 'fatayer-28', category: 'fatayer', name: 'فطيرة جمبري', prices: null, price: 13, calories: 317, image: null },  
    { id: 'fatayer-29', category: 'fatayer', name: 'فطيرة برجر', prices: null, price: 10, calories: 311, image: null }  
];  
const brostItems = [  
    { id: 'brost-1', category: 'brost', name: 'بروست عادي', prices: null, price: 19, calories: 820, image: 'images/menu/batch03-photo-07.jpg' },  
    { id: 'brost-2', category: 'brost', name: 'بروست حراق', prices: null, price: 20, calories: 837, image: null },  
    { id: 'brost-3', category: 'brost', name: 'مسحب عادي', prices: null, price: 15, calories: 816, image: null },  
    { id: 'brost-4', category: 'brost', name: 'مسحب حراق', prices: null, price: 15, calories: 842, image: null },  
    { id: 'brost-5', category: 'brost', name: 'جمبري عادي', prices: null, price: 22, calories: 837, image: null },  
    { id: 'brost-6', category: 'brost', name: 'جمبري حراق', prices: null, price: 22, calories: 818, image: null },  
    { id: 'brost-7', category: 'brost', name: 'سمك فيلية', prices: null, price: 17, calories: 965, image: null },  
    { id: 'brost-8', category: 'brost', name: 'تكساس فرايز', prices: null, price: 20, calories: 235, image: null },  
    { id: 'brost-9', category: 'brost', name: 'تكساس شاورما', prices: null, price: 22, calories: 196, image: null },  
    { id: 'brost-10', category: 'brost', name: 'سوبر دجاج', prices: null, price: 13, calories: 365, image: null },  
    { id: 'brost-11', category: 'brost', name: 'سوبر سمك', prices: null, price: 12, calories: 416, image: null },  
    { id: 'brost-12', category: 'brost', name: 'زنجر', prices: null, price: 13, calories: 357, image: 'images/menu/batch05-photo-02.jpg' },  
    { id: 'brost-13', category: 'brost', name: 'برجر هرفي', prices: null, price: 10, calories: 405, image: null },  
    { id: 'brost-14', category: 'brost', name: 'صاروخ مسحب', prices: null, price: 10, calories: 393, image: null },  
    { id: 'brost-15', category: 'brost', name: 'ثومية', prices: null, price: 4, calories: 126, image: null },  
    { id: 'brost-16', category: 'brost', name: 'ثوم صغير', prices: null, price: 1, calories: 86, image: null },  
    { id: 'brost-17', category: 'brost', name: 'برجر سمك', prices: null, price: 10, calories: 176, image: null },  
    { id: 'brost-18', category: 'brost', name: 'خبز عادي', prices: null, price: 1, calories: 244, image: null },  
    { id: 'brost-19', category: 'brost', name: 'صاروخ جمبري', prices: null, price: 12, calories: 255, image: null }  
];  
const saucesItems = [  
    { id: 'sauces-1', category: 'sauces', name: 'صوص برتقالي', prices: [1, 4], price: null, calories: 139, image: null },  
    { id: 'sauces-2', category: 'sauces', name: 'صوص حار', prices: [1, 4], price: null, calories: 137, image: null },  
    { id: 'sauces-3', category: 'sauces', name: 'خلطة كاتشب مايز', prices: [1, 4], price: null, calories: 161, image: null },  
    { id: 'sauces-4', category: 'sauces', name: 'صوص جبن', prices: [1, 4], price: null, calories: 162, image: null },  
    { id: 'sauces-5', category: 'sauces', name: 'خلطة صوص', prices: [1, 4], price: null, calories: 211, image: null }  
];  
const shawarmaItems = [  
    { id: 'shawarma-1', category: 'shawarma', name: 'شاورما عادي', prices: null, price: 7, calories: 320, image: null },  
    { id: 'shawarma-2', category: 'shawarma', name: 'شاورما جبن', prices: null, price: 8, calories: 330, image: null },  
    { id: 'shawarma-3', category: 'shawarma', name: 'شاورما جبنتين', prices: null, price: 9, calories: 345, image: null },  
    { id: 'shawarma-4', category: 'shawarma', name: 'شاورما صغير جبن سائل', prices: null, price: 8, calories: 375, image: null },  
    { id: 'shawarma-5', category: 'shawarma', name: 'صاروخ شاورما جبن سائل', prices: null, price: 13, calories: 600, image: null },  
    { id: 'shawarma-6', category: 'shawarma', name: 'عربي جبن سائل', prices: null, price: 17, calories: 750, image: null },  
    { id: 'shawarma-7', category: 'shawarma', name: 'صاروخ شاورما', prices: null, price: 11, calories: 420, image: null },  
    { id: 'shawarma-8', category: 'shawarma', name: 'صاروخ شاورما جبن', prices: null, price: 12, calories: 435, image: null },  
    { id: 'shawarma-9', category: 'shawarma', name: 'صاروخ جبنتين', prices: null, price: 13, calories: 447, image: null },  
    { id: 'shawarma-10', category: 'shawarma', name: 'عربي صحن', prices: null, price: 16, calories: 392, image: null },  
    { id: 'shawarma-11', category: 'shawarma', name: 'عربي وسط', prices: null, price: 20, calories: 411, image: null },  
    { id: 'shawarma-12', category: 'shawarma', name: 'عربي كبير', prices: null, price: 28, calories: 422, image: null },  
    { id: 'shawarma-13', category: 'shawarma', name: 'عربي سبيشل صغير', prices: null, price: 18, calories: 424, image: null },  
    { id: 'shawarma-14', category: 'shawarma', name: 'عربي سبيشل وسط', prices: null, price: 24, calories: 432, image: null },  
    { id: 'shawarma-15', category: 'shawarma', name: 'عربي سبيشل كبير', prices: null, price: 32, calories: 437, image: null },  
    { id: 'shawarma-16', category: 'shawarma', name: 'عربي مكسيكي صغير', prices: null, price: 19, calories: 492, image: null },  
    { id: 'shawarma-17', category: 'shawarma', name: 'عربي مكسيكي وسط', prices: null, price: 26, calories: 499, image: 'images/menu/batch05-photo-05.jpg' },  
    { id: 'shawarma-18', category: 'shawarma', name: 'عربي مكسيكي كبير', prices: null, price: 32, calories: 650, image: null },  
    { id: 'shawarma-19', category: 'shawarma', name: 'صحن شاورما', prices: null, price: 26, calories: 500, image: null },  
    { id: 'shawarma-20', category: 'shawarma', name: 'صحن شاورما جبن', prices: null, price: 27, calories: 600, image: null },  
    { id: 'shawarma-21', category: 'shawarma', name: 'ماصورة شاورما', prices: null, price: 30, calories: 700, image: null },  
    { id: 'shawarma-22', category: 'shawarma', name: 'برجر صاج', prices: null, price: 8, calories: 147, image: null },  
    { id: 'shawarma-23', category: 'shawarma', name: 'برجر صاروخ', prices: null, price: 9, calories: 155, image: null },  
    { id: 'shawarma-24', category: 'shawarma', name: 'برجر عربي', prices: null, price: 11, calories: 170, image: null }  
];  
const grillsItems = [  
    { id: 'grills-1', category: 'grills', name: 'صحن مشويات مشكل', prices: [35, 65, 85, 120], price: null, calories: 970, image: null },  
    { id: 'grills-2', category: 'grills', name: 'صحن كباب دجاج', prices: [35, 65, 85, 120], price: null, calories: 995, image: 'images/menu/batch04-photo-01.jpg' },  
    { id: 'grills-3', category: 'grills', name: 'صحن اوصال دجاج', prices: [35, 65, 85, 120], price: null, calories: 930, image: null },  
    { id: 'grills-4', category: 'grills', name: 'صحن اوصال لحم', prices: [35, 65, 85, 120], price: null, calories: 985, image: null },  
    { id: 'grills-5', category: 'grills', name: 'صحن كباب لحم', prices: [35, 65, 85, 120], price: null, calories: 975, image: 'images/menu/batch03-photo-02.jpg' },  
    { id: 'grills-6', category: 'grills', name: 'صاروخ كباب دجاج', prices: null, price: 12, calories: 379, image: null },  
    { id: 'grills-7', category: 'grills', name: 'صاروخ كباب لحم', prices: null, price: 13, calories: 373, image: null },  
    { id: 'grills-8', category: 'grills', name: 'صاروخ اوصال دجاج', prices: null, price: 12, calories: 314, image: null },  
    { id: 'grills-9', category: 'grills', name: 'صاروخ اوصال لحم', prices: null, price: 13, calories: 375, image: null },  
    { id: 'grills-10', category: 'grills', name: 'صغير كباب دجاج', prices: null, price: 12, calories: 193, image: null },  
    { id: 'grills-11', category: 'grills', name: 'صغير كباب لحم', prices: null, price: 8, calories: 162, image: null },  
    { id: 'grills-12', category: 'grills', name: 'صغير اوصال دجاج', prices: null, price: 7, calories: 134, image: null },  
    { id: 'grills-13', category: 'grills', name: 'صغير اوصال لحم', prices: null, price: 8, calories: 127, image: null },  
    { id: 'grills-14', category: 'grills', name: 'عربي اوصال دجاج', prices: null, price: 16, calories: 386, image: null },  
    { id: 'grills-15', category: 'grills', name: 'عربي كباب لحم', prices: null, price: 17, calories: 361, image: null },  
    { id: 'grills-16', category: 'grills', name: 'عربي كباب دجاج', prices: null, price: 16, calories: 372, image: null },  
    { id: 'grills-17', category: 'grills', name: 'عربي اوصال لحم', prices: null, price: 17, calories: 341, image: null }  
];  
const juicesItems = [  
    { id: 'juices-1', category: 'juices', name: 'برتقال خلاط', prices: [7, 10, 15, 20], price: null, calories: 104, image: null },  
    { id: 'juices-2', category: 'juices', name: 'برتقال كبس', prices: [10, 12, 20, 30], price: null, calories: 127, image: null },  
    { id: 'juices-3', category: 'juices', name: 'كوكتيل', prices: [7, 10, 15, 20], price: null, calories: 185, image: null },  
    { id: 'juices-4', category: 'juices', name: 'مانجو سادة', prices: [7, 10, 15, 20], price: null, calories: 173, image: null },  
    { id: 'juices-5', category: 'juices', name: 'مانجو حليب', prices: [7, 10, 15, 20], price: null, calories: 124, image: null },  
    { id: 'juices-6', category: 'juices', name: 'شمام', prices: [7, 10, 15, 20], price: null, calories: 181, image: null },  
    { id: 'juices-7', category: 'juices', name: 'جوافة', prices: [7, 10, 15, 20], price: null, calories: 114, image: null },  
    { id: 'juices-8', category: 'juices', name: 'فراولة', prices: [7, 10, 15, 20], price: null, calories: 81, image: null },  
    { id: 'juices-9', category: 'juices', name: 'حبحب', prices: [7, 10, 15, 20], price: null, calories: 99, image: null },  
    { id: 'juices-10', category: 'juices', name: 'تفاح', prices: [7, 10, 15, 20], price: null, calories: 196, image: null },  
    { id: 'juices-11', category: 'juices', name: 'اناناس', prices: [7, 10, 15, 20], price: null, calories: 142, image: null },  
    { id: 'juices-12', category: 'juices', name: 'كيوي', prices: [7, 10, 15, 20], price: null, calories: 125, image: null },  
    { id: 'juices-13', category: 'juices', name: 'رمان', prices: [10, 12, 20, 30], price: null, calories: 161, image: null },  
    { id: 'juices-14', category: 'juices', name: 'عنب', prices: [10, 12, 20, 30], price: null, calories: 166, image: null },  
    { id: 'juices-15', category: 'juices', name: 'ليمون', prices: [7, 10, 15, 20], price: null, calories: 132, image: null },  
    { id: 'juices-16', category: 'juices', name: 'زنجبيل', prices: [7, 10, 15, 20], price: null, calories: 126, image: null },  
    { id: 'juices-17', category: 'juices', name: 'شمندر', prices: [10, 12, 20, 30], price: null, calories: 104, image: null },  
    { id: 'juices-18', category: 'juices', name: 'عرايسي', prices: [7, 10, 15, 20], price: null, calories: 111, image: null },  
    { id: 'juices-19', category: 'juices', name: 'عرايسي شقف', prices: [12, 15], price: null, calories: 142, image: null },  
    { id: 'juices-20', category: 'juices', name: 'افكادو', prices: [10, 12, 20, 30], price: null, calories: 176, image: null },  
    { id: 'juices-21', category: 'juices', name: 'افكادو ملكي', prices: [10, 12, 20, 30], price: null, calories: 143, image: null },  
    { id: 'juices-22', category: 'juices', name: 'البسام', prices: [10, 12, 20, 30], price: null, calories: 187, image: null },  
    { id: 'juices-23', category: 'juices', name: 'اصفهاني', prices: [10, 12, 20, 30], price: null, calories: 161, image: null },  
    { id: 'juices-24', category: 'juices', name: 'عوار قلب', prices: [10, 12, 20, 30], price: null, calories: 176, image: null },  
    { id: 'juices-25', category: 'juices', name: 'مسامير الركب', prices: [10, 12, 20, 30], price: null, calories: 151, image: null },  
    { id: 'juices-26', category: 'juices', name: 'العشاق', prices: [10, 12, 20, 30], price: null, calories: 171, image: null },  
    { id: 'juices-27', category: 'juices', name: 'طبقات', prices: [10, 12, 20, 30], price: null, calories: 149, image: null },  
    { id: 'juices-28', category: 'juices', name: 'شمبانياء', prices: [10, 12, 20, 30], price: null, calories: 111, image: null },  
    { id: 'juices-29', category: 'juices', name: 'موهيتو', prices: [10, 12, 20, 30], price: null, calories: 169, image: null },  
    { id: 'juices-30', category: 'juices', name: 'كود رد فراولة', prices: [10, 12, 20, 30], price: null, calories: 213, image: null },  
    { id: 'juices-31', category: 'juices', name: 'كود رد نعناع', prices: [10, 12, 20, 30], price: null, calories: 207, image: null },  
    { id: 'juices-32', category: 'juices', name: 'جي', prices: [10, 12, 20, 30], price: null, calories: 114, image: null }  
];  
const breakfastItems = [  
    { id: 'breakfast-1', category: 'breakfast', name: 'ساندويتش فلافل مشكل مع البيض', prices: null, price: 6, calories: 350, image: null },  
    { id: 'breakfast-2', category: 'breakfast', name: 'ساندويتش فلافل مشكل بدون البيض', prices: null, price: 5, calories: 320, image: null },  
    { id: 'breakfast-3', category: 'breakfast', name: 'ساندويتش بيض مسلوق', prices: null, price: 4, calories: 160, image: null },  
    { id: 'breakfast-4', category: 'breakfast', name: 'ساندويتش بيض مقلي', prices: null, price: 4, calories: 260, image: null },  
    { id: 'breakfast-5', category: 'breakfast', name: 'صحن فلافل مشكل صغير', prices: null, price: 12, calories: 370, image: null },  
    { id: 'breakfast-6', category: 'breakfast', name: 'صحن فلافل مشكل وسط', prices: null, price: 22, calories: 410, image: null },  
    { id: 'breakfast-7', category: 'breakfast', name: 'صحن فلافل مشكل كبير', prices: null, price: 30, calories: 700, image: null },  
    { id: 'breakfast-8', category: 'breakfast', name: 'صحن فلافل عربي', prices: null, price: 12, calories: 540, image: null },  
    { id: 'breakfast-9', category: 'breakfast', name: 'صحن فلافل عربي عائلي', prices: null, price: 50, calories: 725, image: null },  
    { id: 'breakfast-10', category: 'breakfast', name: 'صحن فول مع زيت الزيتون والطحينة', prices: null, price: 8, calories: 320, image: null },  
    { id: 'breakfast-11', category: 'breakfast', name: 'صحن فول مع زيت الزيتون', prices: null, price: 7, calories: 280, image: null },  
    { id: 'breakfast-12', category: 'breakfast', name: 'صحن نواشف مشكل', prices: null, price: 15, calories: 470, image: null },  
    { id: 'breakfast-13', category: 'breakfast', name: 'فطيرة فلافل', prices: null, price: 10, calories: 440, image: null },  
    { id: 'breakfast-14', category: 'breakfast', name: 'فطيرة فلافل مع اللبنة', prices: null, price: 11, calories: 490, image: null },  
    { id: 'breakfast-15', category: 'breakfast', name: 'بيتزا فلافل وسط', prices: null, price: 20, calories: 550, image: null }  
];  
const pastaItems = [  
    { id: 'pasta-1', category: 'pasta', name: 'بينك باستا', prices: null, price: 22, calories: 380, image: null },  
    { id: 'pasta-2', category: 'pasta', name: 'بيني باستا صوص أبيض', prices: null, price: 22, calories: 460, image: null },  
    { id: 'pasta-3', category: 'pasta', name: 'فوتشيني الفريدو', prices: null, price: 22, calories: 540, image: null },  
    { id: 'pasta-4', category: 'pasta', name: 'فوتشيني بينك صوص', prices: null, price: 22, calories: 570, image: null },  
    { id: 'pasta-5', category: 'pasta', name: 'مكرونة اسباغيتي', prices: null, price: 22, calories: 490, image: null },  
    { id: 'pasta-6', category: 'pasta', name: 'مكرونة تشيز', prices: null, price: 22, calories: 550, image: null },  
    { id: 'pasta-7', category: 'pasta', name: 'مكرونة صوص أحمر', prices: null, price: 22, calories: 440, image: null }  
];  
const maatoobItems = [  
    { id: 'maatoob-1', category: 'maatoob', name: 'معصوب قشطة', prices: null, price: 12, calories: 650, image: null },  
    { id: 'maatoob-2', category: 'maatoob', name: 'معصوب ملكي كورن فلکس', prices: null, price: 14, calories: 800, image: null },  
    { id: 'maatoob-3', category: 'maatoob', name: 'معصوب ملكي دبل قشطة', prices: null, price: 18, calories: 950, image: null },  
    { id: 'maatoob-4', category: 'maatoob', name: 'معصوب الصاج المشوي', prices: null, price: 18, calories: 550, image: null },  
    { id: 'maatoob-5', category: 'maatoob', name: 'عريكة الصاج المشوي', prices: null, price: 20, calories: 600, image: null },  
    { id: 'maatoob-6', category: 'maatoob', name: 'عريكة قشطة', prices: null, price: 12, calories: 750, image: null },  
    { id: 'maatoob-7', category: 'maatoob', name: 'عريكة ديلوكس', prices: null, price: 20, calories: 1000, image: null },  
    { id: 'maatoob-8', category: 'maatoob', name: 'فتة سمن وعسل', prices: null, price: 8, calories: 775, image: null },  
    { id: 'maatoob-9', category: 'maatoob', name: 'فتة ملكي', prices: null, price: 12, calories: 950, image: null },  
    { id: 'maatoob-10', category: 'maatoob', name: 'فتة تمر', prices: null, price: 8, calories: 650, image: null },  
    { id: 'maatoob-11', category: 'maatoob', name: 'مرسة سادة', prices: null, price: 8, calories: 450, image: null },  
    { id: 'maatoob-12', category: 'maatoob', name: 'مرسة سمن وعسل', prices: null, price: 10, calories: 650, image: null },  
    { id: 'maatoob-13', category: 'maatoob', name: 'مرسة قشطة', prices: null, price: 12, calories: 700, image: null }  
];  
const potatoesItems = [  
    { id: 'potatoes-1', category: 'potatoes', name: 'بطاط عادي', prices: [5, 7, 10], price: null, calories: 446, image: null },  
    { id: 'potatoes-2', category: 'potatoes', name: 'بطاط كرسي', prices: [7, 10, 15], price: null, calories: 471, image: 'images/menu/batch05-photo-03.jpg' },  
    { id: 'potatoes-3', category: 'potatoes', name: 'بطاط حراق', prices: [7, 10, 12], price: null, calories: 511, image: null },  
    { id: 'potatoes-4', category: 'potatoes', name: 'بطاط خلطة عادي', prices: [7, 10, 12], price: null, calories: 516, image: null },  
    { id: 'potatoes-5', category: 'potatoes', name: 'بطاط خلطة حراق', prices: [7, 10, 12], price: null, calories: 597, image: null },  
    { id: 'potatoes-6', category: 'potatoes', name: 'بطاط جبن', prices: [7, 10, 12], price: null, calories: 504, image: 'images/menu/batch03-photo-08.jpg' },  
    { id: 'potatoes-7', category: 'potatoes', name: 'بطاط وبرجر', prices: [7, 10, 12], price: null, calories: 395, image: null }  
];  
const appetizersItems = [  
    { id: 'appetizers-1', category: 'appetizers', name: 'حمص', prices: [7, 11, 16, 22], price: null, calories: 475, image: null },  
    { id: 'appetizers-2', category: 'appetizers', name: 'متبل', prices: [7, 11, 16, 22], price: null, calories: 243, image: null },  
    { id: 'appetizers-3', category: 'appetizers', name: 'تبولة', prices: [7, 11, 16, 22], price: null, calories: 225, image: null },  
    { id: 'appetizers-4', category: 'appetizers', name: 'بابا غنوج', prices: [7, 11, 16, 22], price: null, calories: 113, image: null },  
    { id: 'appetizers-5', category: 'appetizers', name: 'سلطة خضار', prices: [7, 11, 16, 22], price: null, calories: 242, image: null },  
    { id: 'appetizers-6', category: 'appetizers', name: 'سلطة ملفوف', prices: [7, 11, 16, 22], price: null, calories: 311, image: null },  
    { id: 'appetizers-7', category: 'appetizers', name: 'سلطة زيتون', prices: [7, 11, 16, 22], price: null, calories: 317, image: null },  
    { id: 'appetizers-8', category: 'appetizers', name: 'ورق عنب', prices: [11, 22, 33, 50], price: null, calories: 345, image: null }  
];  

const menuItems = [].concat(  
    pizzaItems, fatayerItems, brostItems, saucesItems,  
    shawarmaItems, grillsItems, juicesItems, breakfastItems,  
    pastaItems, maatoobItems, potatoesItems, appetizersItems  
);  

// فارغة عمدًا حتى خطوة الاعتماد — لا featured من عندنا  
const featuredDishes = menuItems.filter((i) => i.featured);  

return Object.freeze({  
    meta: Object.freeze({  
        demo: false,  
        source: 'قائمة المنيو الشاملة المرسلة من إدارة المشروع — آخر قائمة شاملة',  
        note: 'الأطباق المميزة والصور تُضاف في خطوات لاحقة بعد الاعتماد.',  
        promotions: Object.freeze([  
            Object.freeze({  
                id: 'opening-50',  
                title: 'عرض الافتتاح',  
                discount: '50%',  
                dates: Object.freeze(['24 يناير', '25 يناير', '26 يناير']),  
                status: 'تاريخي',  
                activeInUI: false  
            })  
        ]),  
        sectionNotes: Object.freeze({  
            pizza: Object.freeze({  
                doughOptions: Object.freeze(['خفيف', 'سميك', 'حراق', 'عادي', 'خفيف وسط دبل']),  
                edgesCheeseExtraPrice: 2,  
                edgesCheeseNote: 'محشية من الأطراف جبنة: +2 ريال'  
            })  
        })  
    }),  

    restaurant: Object.freeze({  
        name: 'الصاج - المشوي',  
        tagline: 'مشوي على أصله ... بطعم لا يُنسى',  
        phone: '0502686862',  
        phoneInternational: '+966502686862',  
        email: 'alsajalmashwy@gmail.com',  
        address: 'نجران، طريق الملك سلمان بن عبدالعزيز (ش الجيش)',  
        city: 'نجران',  

        assets: Object.freeze({  
            logo: 'images/logo.png',  
            heroVideo: 'videos/hero.mp4',  
            heroVideoWebm: 'videos/hero.webm',  
            heroPoster: 'images/hero-poster.jpg',  
            heroStatic: 'images/hero-static.jpg'  
        })  
    }),  

    categories: Object.freeze(categories),  

    menuItems: Object.freeze(  
        menuItems.map(Object.freeze)  
    ),  

    featuredDishes: Object.freeze(  
        featuredDishes.map(Object.freeze)  
    ),  

    services: Object.freeze([  
        Object.freeze({  
            id: 'service-1',  
            image: 'images/services/service-1.jpg',  
            name: 'الشواء على الصاج'  
        }),  
        Object.freeze({  
            id: 'service-2',  
            image: 'images/services/service-2.jpg',  
            name: 'الطلب السريع'  
        }),  
        Object.freeze({  
            id: 'service-3',  
            image: 'images/services/service-3.jpg',  
            name: 'التوصيل'  
        }),  
        Object.freeze({  
            id: 'service-4',  
            image: 'images/services/service-4.jpg',  
            name: 'الحجوزات'  
        })  
    ]),  

    branches: Object.freeze({  
        main: Object.freeze({  
            id: 'branch-main',  
            name: 'الفرع (1)',  
            address: 'نجران - شارع الملك سلمان',  
            city: 'نجران',  
            phone: '0502686862',  
            phoneInternational: '+966502686862',  
            whatsapp: '+966502686862',  
            phones: Object.freeze(['0502686862', '0555646765', '0536210206']),  
            mapUrl: null  
        }),  

        // أرقام/عناوين صاحب المشروع كما وردت حرفيًا — بلا ساعات، بلا روابط خرائط،  
        // وبلا whatsapp لغير الفرع (1) (قاعدة الاعتماد)  
        additional: Object.freeze([  
            Object.freeze({  
                id: 'branch-2', name: 'الفرع (2)',  
                address: 'نجران - شارع الملك سلمان',  
                phone: '0556868632', phones: Object.freeze(['0556868632']),  
                mapUrl: null  
            }),  
            Object.freeze({  
                id: 'branch-3', name: 'الفرع (3)',  
                address: 'نجران - القابل',  
                phone: '0538921202', phones: Object.freeze(['0538921202', '0550167030']),  
                mapUrl: null  
            }),  
            Object.freeze({  
                id: 'branch-4', name: 'الفرع (4)',  
                address: 'نجران - الرديف - بجوار شاهي ظبية',  
                phone: '0506012990', phones: Object.freeze(['0506012990', '0506032114']),  
                mapUrl: null  
            }),  
            Object.freeze({  
                id: 'branch-5', name: 'الفرع (5)',  
                address: 'نجران - الجامعة - طريق الملك - بجوار مطعم مائدة النعمان',  
                phone: '0500815252', phones: Object.freeze(['0500815252', '0555712613']),  
                mapUrl: null  
            }),  
            Object.freeze({  
                id: 'branch-6', name: 'الفرع (6)',  
                address: 'نجران - المشعلية - بجوار ماركت العلا',  
                phone: '0559700449', phones: Object.freeze(['0559700449', '0551605113']),  
                mapUrl: null  
            }),  
            Object.freeze({  
                id: 'branch-7', name: 'الفرع (7)',  
                address: 'أحد رفيدة - طريق المدينة العسكرية - مقابل البوابة الثالثة',  
                phone: '0557121298', phones: Object.freeze(['0557121298']),  
                mapUrl: null  
            }),  
            Object.freeze({  
                id: 'branch-8', name: 'الفرع (8)',  
                address: 'طريق الجامعة - مقابل أسواق المزرعة',  
                phone: '0551167266', phones: Object.freeze(['0551167266']),  
                mapUrl: null  
            })  
        ])  
    }),  

    contact: Object.freeze({  
        phone: '0502686862',  
        phoneInternational: '+966502686862',  
        whatsapp: '+966502686862',  
        email: 'alsajalmashwy@gmail.com',  
        address: 'نجران، طريق الملك سلمان بن عبدالعزيز (ش الجيش)',  
        hours: 'يوميًا 4:00 عصرًا — 4:00 فجرًا'  
    }),  

    social: Object.freeze([  
        Object.freeze({ platform: 'snapchat',  label: 'Snapchat',  url: null }),  
        Object.freeze({ platform: 'x',         label: 'X',         url: null }),  
        Object.freeze({ platform: 'instagram', label: 'Instagram', url: null }),  
        Object.freeze({ platform: 'facebook',  label: 'Facebook',  url: null })  
    ]),  

    designer: Object.freeze({  
        name: 'خالد الجراش',  
        role: 'مصمم مواقع وحلول رقمية',  
        phone: '779184839',  
        logoText: 'KJ'  
    })  
});

})();

if (typeof window !== 'undefined') {
window.RestaurantData = RestaurantData;
}
