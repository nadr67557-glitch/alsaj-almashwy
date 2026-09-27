/* ===================================
   الصاج - المشوي
   Main JavaScript
   =================================== */
(function() {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ===== 1. Hero Video =====
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        if (prefersReducedMotion) {
            heroVideo.pause();
            heroVideo.removeAttribute('autoplay');
            heroVideo.currentTime = 0;
        } else {
            const playPromise = heroVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => console.log('Video autoplay blocked:', err.message));
            }
        }
    }

    // ===== 2. Smooth scroll for Hero CTA =====
    const ctaButton = document.querySelector('.hero-cta');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
            }
        });
    }

    // ===== 3. المنيو الحقيقي — مصدر وحيد: window.RestaurantData =====
    const MENU_DATA = window.RestaurantData || null;

    function menuEsc(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    var IMG_PH_HTML = '<span class="menu-image-placeholder" aria-hidden="true"><span>الصورة قريبًا</span><em>ننتظر الصورة الأصلية</em></span>';

    // قرار معتمد: المنتجات متعددة الأسعار تُعرض ويُحسب لها أعلى سعر فقط.
    // prices[] الأصلية تبقى داخل RestaurantData كما هي — لا تعديل ولا حذف.
    function maxOf(prices) {
        var nums = prices.map(Number).filter(function (n) { return Number.isFinite(n); });
        return nums.length ? Math.max.apply(null, nums) : null;
    }

    function menuPriceText(item) {
        if (!item) return '';
        if (item.price != null && String(item.price).trim() !== '') {
            return menuEsc(item.price) + ' ر.س';
        }
        if (Array.isArray(item.prices) && item.prices.length) {
            var top = maxOf(item.prices);
            if (top !== null) return menuEsc(top) + ' ر.س';
        }
        return '';
    }

    if (MENU_DATA && Array.isArray(MENU_DATA.menuItems) && MENU_DATA.menuItems.length) {
        var menuActiveCategory = 'all';

        function menuImageStyle(item) {
            if (!item.image || String(item.image).trim() === '') return '';
            return ' style="background-image: url(\'' + menuEsc(item.image) + '\');"';
        }

        // بلايسهولر احترافي عند غياب الصورة — لا طلب ملف ولا 404؛ يختفي تلقائيًا عند وجود image حقيقي
        function menuImagePlaceholder(item) {
            if (item.image && String(item.image).trim() !== '') return '';
            return IMG_PH_HTML;
        }

        function menuDescHtml(item) {
            var parts = [];
            if (item.description && String(item.description).trim() !== '') parts.push(String(item.description));
            if (item.calories != null && String(item.calories).trim() !== '') parts.push(item.calories + ' سعرة');
            if (!parts.length) return '';
            return '<p class="menu-item-desc">' + menuEsc(parts.join(' — ')) + '</p>';
        }

        function renderMenuCategories() {
            var wrap = document.querySelector('.menu-categories');
            if (!wrap || !Array.isArray(MENU_DATA.categories)) return;
            var html = '<button class="category-btn' + (menuActiveCategory === 'all' ? ' active' : '') + '" type="button" data-category="all">الكل</button>';
            MENU_DATA.categories.forEach(function (c) {
                html += '<button class="category-btn' + (menuActiveCategory === c.id ? ' active' : '') + '" type="button" data-category="' + menuEsc(c.id) + '">' + menuEsc(c.name) + '</button>';
            });
            wrap.innerHTML = html;
        }

        function renderMenuList() {
            var grid = document.querySelector('.menu-grid');
            if (!grid) return;
            var items = MENU_DATA.menuItems.filter(function (item) {
                return menuActiveCategory === 'all' || item.category === menuActiveCategory;
            });
            grid.innerHTML = items.map(function (item) {
                return '<article class="menu-item" data-item-id="' + menuEsc(item.id) + '" data-category="' + menuEsc(item.category) + '">' +
                    '<div class="menu-item-image"' + menuImageStyle(item) + '>' + menuImagePlaceholder(item) + '</div>' +
                    '<div class="menu-item-body">' +
                    '<h3 class="menu-item-name">' + menuEsc(item.name || '') + '</h3>' +
                    menuDescHtml(item) +
                    '<div class="menu-item-footer">' +
                    '<span class="menu-item-price">' + menuPriceText(item) + '</span>' +
                    '<button class="menu-item-add" type="button">+ للسلة</button>' +
                    '</div></div></article>';
            }).join('');
        }

        renderMenuCategories();
        renderMenuList();

        // ===== 3b. «أبرز الأطباق» — 8 معرفات معتمدة فقط من data.js =====
        var FEATURED_IDS = ['grills-2','grills-5','brost-1','potatoes-6','brost-12','pizza-30','shawarma-17','pizza-21'];

        function renderFeaturedDishes() {
            var grid = document.getElementById('featuredGrid');
            if (!grid) return;
            grid.innerHTML = FEATURED_IDS.map(function (fid) {
                return MENU_DATA.menuItems.find(function (item) { return item.id === fid; });
            }).filter(Boolean).map(function (item) {
                var cal = (item.calories != null && String(item.calories).trim() !== '')
                    ? '<p class="menu-item-desc">' + menuEsc(item.calories) + ' سعرة</p>' : '';
                return '<article class="dish-card" data-item-id="' + menuEsc(item.id) + '">' +
                    '<div class="dish-image"' + menuImageStyle(item) + '>' + menuImagePlaceholder(item) +
                        '<span class="dish-badge">مميز</span>' +
                    '</div>' +
                    '<div class="dish-info">' +
                        '<h3 class="dish-name">' + menuEsc(item.name || '') + '</h3>' +
                        '<p class="dish-price">' + (menuPriceText(item) || '—') + '</p>' +
                        cal +
                        '<button class="dish-add-btn" type="button">' +
                            '<span>أضف للسلة</span><span class="btn-icon">+</span>' +
                        '</button>' +
                    '</div></article>';
            }).join('');
        }

        renderFeaturedDishes();

        // ===== 3c. الخدمات — تُولَّد من MENU_DATA.services فقط، بلا خدمات مخترعة =====
        // SERVICE_IMAGES_READY: تُضاف هنا معرفات الخدمات فقط بعد رفع ملف صورتها الفعلي واعتماده،
        // لتفادي أي مسار غير موجود (بلا 404). حاليًا: لا صور خدمات مرفوعة ⇒ placeholder للجميع.
        var SERVICE_IMAGES_READY = [];

        function serviceImageStyle(item) {
            if (item.image && SERVICE_IMAGES_READY.indexOf(item.id) !== -1) {
                return ' style="background-image: url(\'' + menuEsc(item.image) + '\');"';
            }
            return '';
        }

        function renderServices() {
            var grid = document.getElementById('servicesGrid');
            if (!grid || !Array.isArray(MENU_DATA.services)) return;
            grid.innerHTML = MENU_DATA.services.map(function (item) {
                var visual = (SERVICE_IMAGES_READY.indexOf(item.id) !== -1) ? item.image : null;
                return '<div class="service-card" data-service-id="' + menuEsc(item.id || '') + '">' +
                    '<div class="service-image"' + serviceImageStyle(item) + '>' + menuImagePlaceholder({ image: visual }) + '</div>' +
                    '<h3 class="service-name">' + menuEsc(item.name || '') + '</h3>' +
                '</div>';
            }).join('');
        }

        renderServices();

        var menuCategoriesWrap = document.querySelector('.menu-categories');
        if (menuCategoriesWrap) {
            menuCategoriesWrap.addEventListener('click', function (e) {
                var btn = e.target.closest('.category-btn');
                if (!btn) return;
                menuActiveCategory = btn.dataset.category || 'all';
                renderMenuCategories();
                renderMenuList();
            });
        }
    } else {
        // وضع احتياطي (بلا بيانات محمّلة): نفس منطق الفلترة السابق على البطاقات الثابتة
        const categoryBtns = document.querySelectorAll('.category-btn');
        const menuItems = document.querySelectorAll('.menu-item');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const category = this.dataset.category;
                menuItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ===== 4. Cart System =====
    const cartFab = document.getElementById('cartFab');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartClose = document.getElementById('cartClose');
    const cartBackdrop = document.getElementById('cartBackdrop');
    const cartBody = document.getElementById('cartBody');
    const cartFabCount = document.getElementById('cartFabCount');
    const cartTotal = document.getElementById('cartTotal');
    const cartCheckout = document.getElementById('cartCheckout');
    const branchSelect = document.getElementById('branchSelect');

    let cart = [];

    function openCart() {
        cartDrawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cartDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (cartFab) cartFab.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

    // بطاقة/زر المنيو أو بطاقة «أبرز الأطباق» → فتح Modal ببيانات الصنف الحقيقي
    document.addEventListener('click', function(e) {
        var btn = e.target.closest('.dish-add-btn, .menu-item-add');
        var card = e.target.closest('[data-item-id]');
        if (!btn && !card) return;
        e.preventDefault();

        var itemId = card ? card.getAttribute('data-item-id') : null;
        var product = null;
        if (itemId && MENU_DATA && Array.isArray(MENU_DATA.menuItems)) {
            product = MENU_DATA.menuItems.find(function (item) { return item.id === itemId; }) || null;
        }
        // بطاقة بارزة ثابتة بلا معرف حقيقي ⇒ Modal فارغ كما كان سلوكها السابق
        openProductModal(product);
    });

    // سعر وحدة رقمي آمن: price المفرد فقط؛ المتعدد يبقى غير محسوب — بلا اختيار تلقائي
    function unitPriceNumber(entry) {
        var p = entry && entry.product;
        if (!p) return null;
        if (p.price != null && String(p.price).trim() !== '') {
            var n = Number(p.price);
            if (Number.isFinite(n) && n > 0) return n;
        }
        if (Array.isArray(p.prices) && p.prices.length) {
            var top = maxOf(p.prices); // أعلى سعر — لا prices[0] ولا Math.min ولا صفر
            if (top !== null) return top;
        }
        return null;
    }

    function renderCart() {
        if (!cartBody) return;

        if (cart.length === 0) {
            cartBody.innerHTML = `
                <div class="cart-empty">
                    <p>سلتك فارغة</p>
                    <p class="cart-empty-hint">أضف أطباقك المفضلة من المنيو</p>
                </div>`;
        } else {
            cartBody.innerHTML = cart.map(function (entry) {
                var p = entry.product || {};
                var id = menuEsc(p.id || '');
                var priceLine = menuPriceText(p) || '—';
                var n = unitPriceNumber(entry);
                var totalLine = n ? (n * entry.quantity) + ' ر.س' : '';
                return '<div class="cart-line" style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem 0;border-bottom:1px solid rgba(255,255,255,0.06);">' +
                    '<div class="qty-control" style="flex:none;">' +
                        '<button type="button" class="qty-btn" data-cart-dec="' + id + '" aria-label="إنقاص الكمية">−</button>' +
                        '<span class="qty-value">' + entry.quantity + '</span>' +
                        '<button type="button" class="qty-btn" data-cart-inc="' + id + '" aria-label="زيادة الكمية">+</button>' +
                    '</div>' +
                    '<div style="flex:1;min-width:0;">' +
                        '<p style="font-weight:700;font-size:0.98rem;margin:0 0 3px;word-break:break-word;">' + menuEsc(p.name || '') + '</p>' +
                        '<p style="color:#ff6b1a;font-weight:700;font-size:0.88rem;margin:0;direction:ltr;text-align:right;">' + menuEsc(priceLine) + (totalLine ? ' = ' + menuEsc(totalLine) : '') + '</p>' +
                    '</div>' +
                    '<button type="button" class="cart-line-del" data-cart-del="' + id + '" aria-label="حذف الصنف" style="font-size:1.1rem;font-weight:800;padding:0.4rem 0.6rem;opacity:0.7;">✕</button>' +
                '</div>';
            }).join('');
        }

        if (cartFabCount) cartFabCount.textContent = cart.reduce((s, i) => s + i.quantity, 0);
        if (cartTotal) cartTotal.textContent = cart.reduce((s, i) => {
            var n = unitPriceNumber(i);
            return s + (n ? n * i.quantity : 0);
        }, 0).toFixed(2);
    }

    renderCart();

    // تحكم أسطر السلة (زيادة/نقص/حذف) — تفويض أحداث على الحاوية الموجودة
    if (cartBody) {
        cartBody.addEventListener('click', function (e) {
            var inc = e.target.closest('[data-cart-inc]');
            var dec = e.target.closest('[data-cart-dec]');
            var del = e.target.closest('[data-cart-del]');
            var pid = (inc || dec || del) ? (inc || dec || del).dataset[(inc ? 'cartInc' : dec ? 'cartDec' : 'cartDel')] : null;
            if (!pid) return;
            e.preventDefault();

            var entry = cart.find(function (x) { return x.product && x.product.id === pid; });
            if (!entry) return;

            if (inc) entry.quantity += 1;
            else if (dec) entry.quantity = Math.max(1, entry.quantity - 1); // لا صفر ولا سالب
            else if (del) cart = cart.filter(function (x) { return x !== entry; });
            else return;

            renderCart();
        });
    }

    // ===== 4b. تعبئة قائمة الفروع داخل السلة من بيانات RestaurantData =====
    // لا إنشاء فروع ولا أرقام: فقط ما هو موجود داخل branches.
    function branchList() {
        var out = [];
        if (MENU_DATA && MENU_DATA.branches) {
            if (MENU_DATA.branches.main) out.push(MENU_DATA.branches.main);
            if (Array.isArray(MENU_DATA.branches.additional)) out = out.concat(MENU_DATA.branches.additional);
        }
        return out;
    }

    function renderBranchOptions() {
        if (!branchSelect) return;
        var branches = branchList();
        if (!branches.length) return;
        // يعاد بناء الخيارات فقط عند وجود فروع في البيانات؛ نص الـplaceholder كما هو في الصفحة
        branchSelect.innerHTML = '';
        var ph = document.createElement('option');
        ph.value = '';
        ph.textContent = '— اختر فرعاً —';
        branchSelect.appendChild(ph);
        branches.forEach(function (br) {
            if (!br || !br.id) return;
            var op = document.createElement('option');
            op.value = br.id;
            op.textContent = (br.name || '') + (br.city ? ' — ' + br.city : '');
            branchSelect.appendChild(op);
        });
    }

    renderBranchOptions();

    // الفرع النشط بصريًا — branch-main افتراضيًا عند التحميل (بيانات data.js كما هي)
    var selectedBranchId = 'branch-main';

    function renderBranches() {
        var grid = document.getElementById('branchesGrid');
        if (!grid) return;
        var branches = branchList();
        if (!branches.length) return;
        var sub = document.getElementById('branchesSubtitle');
        if (sub && branches[0].city && branches[0].address) {
            sub.textContent = branches[0].city + '، ' + branches[0].address;
        }
        grid.innerHTML = branches.map(function (br) {
            if (!br || !br.id) return '';
            var isMain = br.id === 'branch-main';
            var isActive = br.id === selectedBranchId;
            var actions = '';
            if (br.phone) {
                actions += '<a class="branch-btn branch-call" href="tel:' + menuEsc(br.phone) + '"><span>📞</span> اتصال</a>';
            }
            if (br.whatsapp) {
                var digits = String(br.whatsapp).replace(/\D/g, '');
                // لا اختراع أرقام: نستخدم القيمة كما هي في data.js
                if (digits) actions += '<a class="branch-btn branch-whatsapp" target="_blank" rel="noopener" href="https://wa.me/' + digits + '"><span>💬</span> واتساب</a>';
            }
            // زر الخريطة لا يظهر إطلاقًا ما لم يوجد mapUrl حقيقي في البيانات — بلا إنشاء روابط
            if (br.mapUrl) {
                actions += '<a class="branch-btn branch-map" target="_blank" rel="noopener" href="' + menuEsc(br.mapUrl) + '"><span>🗺️</span> الاتجاهات</a>';
            }
            // منطقة "الخريطة" بصرية فقط بالـCSS — لا صورة، لا GPS، لا خرائط خارجية
            return '<article class="branch-card' + (isMain ? ' branch-main' : '') + (isActive ? ' is-active' : '') + '"' +
                ' data-branch-id="' + menuEsc(br.id) + '" tabindex="0" role="button" aria-pressed="' + (isActive ? 'true' : 'false') + '">' +
                '<div class="branch-locate" aria-hidden="true"><span class="branch-pin"></span>' +
                    '<div class="branch-info-panel">' +
                        '<p class="branch-info-name">' + menuEsc(br.name || '') + '</p>' +
                        (br.phone ? '<p class="branch-info-phone" dir="ltr">' + menuEsc(br.phone) + '</p>' : '') +
                        (br.address ? '<p class="branch-info-address">' + menuEsc(br.address) + '</p>' : '') +
                    '</div>' +
                '</div>' +
                '<div class="branch-body">' +
                '<h3 class="branch-name">' + menuEsc(br.name || '') + '</h3>' +
                (br.address ? '<p class="branch-address">' + menuEsc(br.address) + '</p>' : '') +
                (actions ? '<div class="branch-actions">' + actions + '</div>' : '') +
                '</div>' +
            '</article>';
        }).join('');
    }

    renderBranches();

    // ===== اختيار الفرع النشط (بدون route / بدون تغيير URL — نفس الصفحة) =====
    function applyBranchActiveClass(id) {
        var cards = document.querySelectorAll('#branchesGrid .branch-card');
        for (var i = 0; i < cards.length; i++) {
            var on = cards[i].getAttribute('data-branch-id') === id;
            cards[i].classList.toggle('is-active', on);
            cards[i].setAttribute('aria-pressed', on ? 'true' : 'false');
        }
    }

    function selectBranch(id, opts) {
        if (!id) return;
        selectedBranchId = id;
        applyBranchActiveClass(id);
        // مزامنة آمنة مع قائمة الفرع في السلة: لا نلمس منطق checkout ولا الإرسال
        if (branchSelect && !(opts && opts.fromSelect)) {
            for (var j = 0; j < branchSelect.options.length; j++) {
                if (branchSelect.options[j].value === id) {
                    branchSelect.value = id;
                    break;
                }
            }
        }
    }

    var branchesGridEl = document.getElementById('branchesGrid');
    if (branchesGridEl) {
        branchesGridEl.addEventListener('click', function (e) {
            if (e.target.closest('a')) return; // اتصال/واتساب/اتجاهات لا تُعتبر اختيارًا
            var card = e.target.closest('.branch-card');
            if (card) selectBranch(card.getAttribute('data-branch-id'));
        });
        branchesGridEl.addEventListener('keydown', function (e) {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            var card = e.target.closest('.branch-card');
            if (!card) return;
            e.preventDefault();
            selectBranch(card.getAttribute('data-branch-id'));
        });
    }

    // عند تغيير القائمة المنسدلة في السلة تتحدث البطاقة النشطة فقط (منطق السلة كما هو)
    if (branchSelect) {
        branchSelect.addEventListener('change', function () {
            if (branchSelect.value) selectBranch(branchSelect.value, { fromSelect: true });
        });
    }

    // ===== 5. إرسال الطلب عبر واتساب =====
    if (cartCheckout) {
        cartCheckout.addEventListener('click', function() {
            var branchId = branchSelect ? branchSelect.value : '';

            if (cart.length === 0) {
                alert('السلة فارغة');
                return;
            }

            if (!branchId) {
                alert('الرجاء اختيار الفرع أولاً');
                return;
            }

            var branch = branchList().find(function (br) { return br && br.id === branchId; }) || null;

            // الرقم من بيانات الفرع المختار (whatsapp)، وإلا من بيانات التواصل المعتمدة — لا اختراع أرقام
            var raw = (branch && branch.whatsapp) ||
                      (MENU_DATA && MENU_DATA.contact && MENU_DATA.contact.whatsapp) || '';
            var phoneNumber = String(raw).replace(/\D/g, '');
            if (!phoneNumber) {
                alert('رقم واتساب هذا الفرع غير معتمد بعد.');
                return;
            }

            var lines = cart.map(function (entry) {
                var p = entry.product || {};
                return '• ' + (p.name || '') + ' × ' + entry.quantity + ' = ' + (menuPriceText(p) || '');
            });

            var parts = ['طلب جديد من موقع الصاج - المشوي', 'الفرع: ' + (branch && branch.name ? branch.name : branchId)]
                .concat(lines)
                .concat(['الإجمالي: ' + cartTotal.textContent + ' ر.س']);

            var message = encodeURIComponent(parts.join('\n'));

            window.open('https://wa.me/' + phoneNumber + '?text=' + message, '_blank');
        });
    }

    // ===== 5b. «تواصل معنا» ديناميكي — مصدر واحد: MENU_DATA.contact + MENU_DATA.social =====
    function renderContact() {
        var grid = document.getElementById('contactGrid');
        if (!grid || !MENU_DATA || !MENU_DATA.contact) return;
        var C = MENU_DATA.contact;
        var addressLines = C.address ? C.address.split('، ') : [];
        var cards = '';
        if (C.phone) {
            cards += '<div class="contact-item"><span class="contact-icon">📞</span><h3>الهاتف</h3>' +
                '<a href="tel:' + menuEsc(C.phone) + '" dir="ltr">' + menuEsc(C.phone) + '</a></div>';
        }
        if (C.whatsapp) {
            var wd = String(C.whatsapp).replace(/\D/g, '');
            if (wd) {
                cards += '<div class="contact-item"><span class="contact-icon">💬</span><h3>واتساب</h3>' +
                    '<a href="https://wa.me/' + wd + '" target="_blank" rel="noopener" dir="ltr">' + menuEsc(C.phone || wd) + '</a></div>';
            }
        }
        if (C.email) {
            cards += '<div class="contact-item"><span class="contact-icon">✉️</span><h3>البريد الإلكتروني</h3>' +
                '<a href="mailto:' + menuEsc(C.email) + '" dir="ltr">' + menuEsc(C.email) + '</a></div>';
        }
        if (addressLines.length) {
            cards += '<div class="contact-item"><span class="contact-icon">📍</span><h3>العنوان</h3>' +
                '<p>' + addressLines.map(function (line) { return menuEsc(line); }).join('<br>') + '</p></div>';
        }
        if (C.hours) {
            cards += '<div class="contact-item"><span class="contact-icon">🕐</span><h3>ساعات العمل</h3>' +
                '<p>' + menuEsc(C.hours) + '</p></div>';
        }
        grid.innerHTML = cards;
    }

    function renderSocial() {
        var wrap = document.getElementById('socialLinks');
        if (!wrap || !MENU_DATA || !Array.isArray(MENU_DATA.social)) return;
        wrap.innerHTML = MENU_DATA.social.map(function (s) {
            if (!s || !s.label) return '';
            var attr = 'class="social-link" data-platform="' + menuEsc(s.platform || '') + '" aria-label="' + menuEsc(s.label) + '"';
            // رابط حقيقي فقط إذا اعتمده المطعم بقيمة url غير null — بخلافه placeholder آمن
            var href = s.url ? ' href="' + menuEsc(s.url) + '" target="_blank" rel="noopener"' : ' href="#"';
            return '<a ' + href + ' ' + attr + '><span>' + menuEsc(s.label) + '</span></a>';
        }).join('');
    }

    renderContact();
    renderSocial();

    // ===== 6. السنة الحالية في Footer =====
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ===== 7. Escape key لإغلاق السلة =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && cartDrawer && cartDrawer.getAttribute('aria-hidden') === 'false') {
            closeCart();
        }
    });

    // ===== 8. فتح/إغلاق Product Modal — هيكل فقط، بلا ربط بأي بيانات منتجات =====
    const productModal = document.getElementById('productModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalClose = document.getElementById('modalClose');

    function openProductModal(product) {
        if (!productModal) return;
        pendingProduct = product || null; // المنتج الحقيقي الممرَّر — لا نسخة ولا بيانات Demo
        ensureModalEmpty();               // تنظيف كامل لكل فتحة (بما فيها حقول صنف سابق)
        if (pendingProduct) fillModalFromProduct(pendingProduct);
        setModalQty(1); // كل فتح يبدأ من 1 — منطق الكمية الحالي بلا تغيير
        productModal.setAttribute('aria-hidden', 'false');
        productModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    // يعرض المتوفر فقط: name، price أو prices كاملة، calories، image عند وجودها فقط — بلا اختراع
    function fillModalFromProduct(product) {
        if (!product || typeof product !== 'object') return;
        var name = document.getElementById('modalName');
        var desc = document.getElementById('modalDesc');
        var price = document.getElementById('modalPrice');
        var image = document.getElementById('modalImage');

        if (name) name.textContent = product.name != null ? String(product.name) : '';

        var descParts = [];
        if (product.description != null && String(product.description).trim() !== '') {
            descParts.push(String(product.description));
        }
        if (product.calories != null && String(product.calories).trim() !== '') {
            descParts.push(product.calories + ' سعرة');
        }
        if (desc) desc.textContent = descParts.length ? descParts.join(' — ') : '';

        if (price) price.textContent = menuPriceText(product);

        if (image) {
            var oldPh = image.querySelector('.menu-image-placeholder');
            if (oldPh) oldPh.remove();
            var img = (typeof product.image === 'string') ? product.image.trim() : '';
            if (img !== '') {
                image.style.backgroundImage = "url('" + img.replace(/'/g, "\\'") + "')";
            } else {
                image.insertAdjacentHTML('beforeend', IMG_PH_HTML);
                // null/فارغ ⇒ بلايسهولر داخل المودال أيضًا، بلا طلب ملف غير موجود
            }
        }
        // #modalAdditions يبقى مخفيًا: لا بيانات إضافات لكل صنف حاليًا في data.js
    }

    function ensureModalEmpty() {
        var image = document.getElementById('modalImage');
        var name = document.getElementById('modalName');
        var desc = document.getElementById('modalDesc');
        var price = document.getElementById('modalPrice');
        var additions = document.getElementById('modalAdditions');
        var qty = document.getElementById('qtyValue');
        if (image) {
            if (image.style.backgroundImage) image.style.backgroundImage = '';
            var ph = image.querySelector('.menu-image-placeholder');
            if (ph) ph.remove();
        }
        if (name && name.textContent) name.textContent = '';
        if (desc && desc.textContent) desc.textContent = '';
        if (price && price.textContent) price.textContent = '';
        if (additions && !additions.hidden) additions.hidden = true;
        if (qty && qty.textContent !== '1') qty.textContent = '1';
    }

    function closeProductModal() {
        if (!productModal) return;
        productModal.setAttribute('aria-hidden', 'true');
        productModal.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    // عدّاد الكمية داخل الـModal — بلا ربط بمنتج/سعر/سلة في هذه المرحلة
    function getModalQty() {
        var el = document.getElementById('qtyValue');
        var n = el ? parseInt(el.textContent, 10) : 1;
        return (Number.isFinite(n) && n >= 1) ? n : 1;
    }

    function setModalQty(n) {
        var el = document.getElementById('qtyValue');
        if (el) el.textContent = String(Math.max(1, n));
    }

    var qtyMinusBtn = document.getElementById('qtyMinus');
    var qtyPlusBtn = document.getElementById('qtyPlus');
    if (qtyPlusBtn) qtyPlusBtn.addEventListener('click', function() { setModalQty(getModalQty() + 1); });
    if (qtyMinusBtn) qtyMinusBtn.addEventListener('click', function() { setModalQty(getModalQty() - 1); });

    // ===== إضافة المنتج الحقيقي من الـModal إلى السلة =====
    const modalAddBtn = document.getElementById('modalAddBtn');
    var pendingProduct = null; // المنتج الحقيقي المحال من RestaurantData — لا نسخ ولا إعادة كتابة

    if (modalAddBtn) {
        modalAddBtn.addEventListener('click', function() {
            if (!pendingProduct) return; // بلا منتج: لا شيء إطلاقًا
            var quantity = getModalQty();  // عدد صحيح ≥ 1
            var existing = cart.find(function (e) { return e.product && e.product.id === pendingProduct.id; });
            if (existing) existing.quantity += quantity; // منع التكرار: تجميع في سطر واحد
            else cart.push({ product: pendingProduct, quantity: quantity });
            renderCart();
            closeProductModal(); // مقياس الاعتماد: إغلاق المودال بعد الإضافة (قرار A)
        });
    }

    if (modalClose) modalClose.addEventListener('click', closeProductModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeProductModal);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && productModal && productModal.getAttribute('aria-hidden') === 'false') {
            closeProductModal();
        }
    });

})();
