/* ===================================
   الصاج - المشوي — صفحة «من نحن»
   تأثير آلة الكتابة + السنة
   =================================== */
(function () {
    'use strict';

    var STORY = 'في الصاج المشوي، نؤمن بأن الطعام الرائع يبدأ بالنار، والحديد، والشغف. تأسست قصتنا في قلب نجران بمهمة بسيطة: تقديم المذاق الأصيل للشواء التقليدي على الصاج بلمسة عصرية. نحن متخصصون في مزيج التراث مع النكهة الغنية، لنضمن أن كل لقمة تحكي قصة من الجودة والإتقان.';

    // ===== السنة الحالية =====
    var yearEl = document.getElementById('aboutYear');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // ===== آلة الكتابة: كتابة ← وقفة ← مسح ← وقفة ← تكرار =====
    var out = document.getElementById('typeText');
    if (!out) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    function showStatic() {
        out.textContent = STORY;
    }

    function startLoop() {
        var i = 0;
        var deleting = false;
        var TYPE_MS = 42;      // إيقاع الكتابة: هادئ لا سريع
        var DEL_MS = 18;       // المسح أسرع قليلًا كرجوع الآلة
        var HOLD_END = 2600;   // وقفة بعد اكتمال النص
        var HOLD_EMPTY = 1100; // وقفة عند الفراغ قبل إعادة الكتابة

        function tick() {
            out.textContent = STORY.slice(0, i);

            if (!deleting) {
                if (i >= STORY.length) {
                    deleting = true;
                    window.setTimeout(tick, HOLD_END);
                    return;
                }
                i += 1;
                window.setTimeout(tick, TYPE_MS);
            } else {
                if (i <= 0) {
                    deleting = false;
                    window.setTimeout(tick, HOLD_EMPTY);
                    return;
                }
                i -= 1;
                window.setTimeout(tick, DEL_MS);
            }
        }

        tick();
    }

    function initByMotion() {
        if (reduced.matches) {
            showStatic();
        } else {
            startLoop();
        }
    }

    initByMotion();

    // لو غيّر المستخدم تفضيل الحركة أثناء الجلسة
    if (typeof reduced.addEventListener === 'function') {
        reduced.addEventListener('change', function () {
            window.location.reload(); // أبسط سبيل لإعادة الضبط دون تعارض المؤقتات
        });
    }
})();
