import './style.css';

const products = [
  {id:1, name:'سماعة لاسلكية Pro', category:'إلكترونيات', price:1299, old:1599, tag:'الأكثر مبيعاً', emoji:'🎧', commission:8, vendor:'متجر التقنية'},
  {id:2, name:'ساعة ذكية Active', category:'إلكترونيات', price:1890, old:2290, tag:'عرض اليوم', emoji:'⌚', commission:10, vendor:'متجر التقنية'},
  {id:3, name:'حقيبة يومية أنيقة', category:'موضة', price:790, old:990, tag:'اختيار مميز', emoji:'👜', commission:12, vendor:'ستايل'},
  {id:4, name:'مجموعة عناية بالبشرة', category:'جمال', price:560, old:680, tag:'خصم 18%', emoji:'🧴', commission:15, vendor:'بيوتي هاوس'},
  {id:5, name:'مصباح مكتب ذكي', category:'منزل', price:475, old:620, tag:'سعر لقطة', emoji:'💡', commission:7, vendor:'هوم تك'},
  {id:6, name:'حذاء رياضي يومي', category:'موضة', price:1450, old:1750, tag:'وصل حديثاً', emoji:'👟', commission:9, vendor:'ستايل'}
];
let cart = [];
let active = 'home';
let filter = 'الكل';

const money = n => new Intl.NumberFormat('ar-EG').format(n) + ' ج.م';
const el = (tag, cls='', html='') => `<${tag}${cls?` class="${cls}"`:''}>${html}</${tag}>`;

function header(){
 return `<header class="topbar"><a class="brand" href="#" data-page="home"><span class="brand-mark">L</span><span>Louqta<small>لقطة تستاهلها</small></span></a>
 <nav><button data-page="home" class="${active==='home'?'chosen':''}">الرئيسية</button><button data-page="catalog" class="${active==='catalog'?'chosen':''}">تسوق</button><button data-page="affiliate" class="${active==='affiliate'?'chosen':''}">التسويق بالعمولة</button><button data-page="vendors" class="${active==='vendors'?'chosen':''}">للبائعين</button><button data-page="dashboard" class="${active==='dashboard'?'chosen':''}">لوحة التحكم</button></nav>
 <div class="top-actions"><button class="icon-btn" id="cartBtn">🛒 <b>${cart.length}</b></button><button class="primary small" data-page="dashboard">ابدأ الآن</button></div></header>`;
}
function productCard(p){
 return `<article class="product"><div class="product-art"><span class="tag">${p.tag}</span><span class="emoji">${p.emoji}</span><button class="heart" aria-label="إضافة للمفضلة">♡</button></div><div class="product-info"><small>${p.category} · ${p.vendor}</small><h3>${p.name}</h3><div class="price"><b>${money(p.price)}</b><del>${money(p.old)}</del></div><div class="product-bottom"><span>عمولة ${p.commission}%</span><button class="add" data-add="${p.id}">أضف للسلة +</button></div></div></article>`;
}
function home(){
 return `<main><section class="hero"><div class="hero-copy"><span class="eyebrow">التسوق بقى أذكى ✨</span><h1>كل اللي نفسك فيه،<br><em>في لقطة واحدة.</em></h1><p>اكتشف منتجات مميزة، قارن العروض، أو ابدأ تجارتك وسوّق بالعمولة من مكان واحد.</p><div class="hero-actions"><button class="primary" data-page="catalog">اكتشف المنتجات <span>←</span></button><button class="ghost" data-page="vendors">ابدأ البيع معنا</button></div><div class="trust"><span>✓ عروض مختارة</span><span>✓ بائعون متعددون</span><span>✓ فرص عمولة</span></div></div><div class="hero-visual"><div class="orb orb1"></div><div class="orb orb2"></div><div class="hero-card"><span>اختيار الأسبوع</span><div class="hero-product">🎧</div><h3>تجربة تسوق مختلفة</h3><p>منتجات وعروض تستاهل</p><strong>Louqta picks</strong></div><div class="float-note">🔥 عروض متجددة</div><div class="float-note note2">💸 اربح من ترشيحاتك</div></div></section>
 <section class="stats"><div><b>كل احتياجاتك</b><span>في مكان واحد</span></div><div><b>تجربة أسهل</b><span>للمشتري والبائع</span></div><div><b>فرص نمو</b><span>للمسوقين بالعمولة</span></div><div><b>إدارة موحدة</b><span>للتجارة والتسويق</span></div></section>
 <section class="section"><div class="section-head"><div><span class="eyebrow">مختارة ليك</span><h2>لقطات الأسبوع</h2><p>منتجات مميزة من شركائنا.</p></div><button class="text-link" data-page="catalog">كل المنتجات ←</button></div><div class="products-grid">${products.slice(0,4).map(productCard).join('')}</div></section>
 <section class="join"><div><span class="eyebrow light">مساحتك للنمو</span><h2>مش بس بتشتري…<br>تقدر تبيع وتكسب كمان.</h2><p>انضم كبائع أو مسوّق بالعمولة وابدأ رحلتك مع Louqta.</p></div><div class="join-actions"><button class="white-btn" data-page="vendors">سجّل كبائع</button><button class="outline-light" data-page="affiliate">ابدأ التسويق بالعمولة</button></div></section></main>`;
}
function catalog(){
 const categories=['الكل','إلكترونيات','موضة','جمال','منزل'];
 const list=products.filter(p=>filter==='الكل'||p.category===filter);
 return `<main class="page"><div class="page-title"><span class="eyebrow">اكتشف الجديد</span><h1>كل المنتجات</h1><p>اختار من منتجات وعروض بائعين Louqta.</p></div><div class="filters">${categories.map(c=>`<button data-filter="${c}" class="${filter===c?'selected':''}">${c}</button>`).join('')}</div><div class="products-grid">${list.map(productCard).join('')}</div></main>`;
}
function affiliate(){
 return `<main class="page"><div class="page-title"><span class="eyebrow">شارك واكسب</span><h1>التسويق بالعمولة</h1><p>رشّح المنتجات اللي بتحبها واكسب عمولة على المبيعات المؤهلة.</p></div><div class="affiliate-hero"><div><h2>حوّل ترشيحاتك<br>لدخل إضافي.</h2><p>روابط تتبع، تقارير أداء، وعمولات واضحة — كل ده من لوحة واحدة.</p><button class="primary" id="joinAffiliate">طلب الانضمام للمسوقين</button></div><div class="commission-box"><small>مثال توضيحي للأرباح</small><strong>1,250 ج.م</strong><span>من 10 طلبات مؤهلة × متوسط عمولة 125 ج.م</span></div></div><h2 class="subhead">منتجات مناسبة للترويج</h2><div class="products-grid">${products.slice(0,3).map(p=>productCard(p)).join('')}</div><div class="notice">تنبيه: حساب العمولات وروابط التتبع الفعلية يحتاجان ربط نظام الطلبات والدفع واعتماد حساب المسوّق.</div></main>`;
}
function vendors(){
 return `<main class="page"><div class="page-title"><span class="eyebrow">كبر تجارتك</span><h1>بيع على Louqta</h1><p>اعرض منتجاتك أمام عملاء جدد، وتابع طلباتك وأداء متجرك من مكان واحد.</p></div><div class="vendor-grid"><div class="vendor-feature"><span class="big-icon">🏪</span><h2>متجرك، جمهور أكبر.</h2><p>إدارة كتالوج المنتجات، متابعة الطلبات، عروض ترويجية، وتقارير مبيعات.</p><button class="primary" id="vendorApply">قدّم طلب فتح متجر</button></div><div class="vendor-checks"><div>📦 <b>إدارة المنتجات</b><small>إضافة وتعديل الأسعار والمخزون</small></div><div>🧾 <b>إدارة الطلبات</b><small>متابعة حالة الطلبات من لوحة واحدة</small></div><div>📈 <b>تقارير الأداء</b><small>مبيعات وزيارات وأداء العروض</small></div><div>🤝 <b>مسوقون بالعمولة</b><small>إتاحة منتجاتك لشبكة المسوقين</small></div></div></div></main>`;
}
function dashboard(){
 return `<main class="page"><div class="page-title"><span class="eyebrow">مساحة الإدارة</span><h1>لوحة تحكم Louqta</h1><p>نظرة عامة تجريبية على المتجر والبائعين والتسويق.</p></div><div class="dash-grid"><div class="metric"><small>إجمالي الطلبات</small><b>128</b><span>بيانات تجريبية</span></div><div class="metric"><small>المبيعات</small><b>84,650 ج.م</b><span>بيانات تجريبية</span></div><div class="metric"><small>البائعون</small><b>12</b><span>بيانات تجريبية</span></div><div class="metric"><small>المسوقون</small><b>36</b><span>بيانات تجريبية</span></div></div><div class="dash-panels"><section class="panel"><h3>مركز التسويق الذكي</h3><p>جهّز محتوى الحملات وجدول النشر وراجع الأداء.</p><div class="automation-row"><span>✍️ اقتراح وصف للمنتجات</span><span class="status">جاهز للتفعيل</span></div><div class="automation-row"><span>📣 تجهيز حملة ترويجية</span><span class="status">جاهز للتفعيل</span></div><div class="automation-row"><span>📅 جدولة منشورات التواصل</span><span class="status muted">يتطلب ربط الحسابات</span></div><button class="primary" id="campaignBtn">إنشاء مسودة حملة</button></section><section class="panel"><h3>آخر الطلبات</h3><div class="order"><span>#LQ-1028</span><b>قيد التجهيز</b><small>1,299 ج.م</small></div><div class="order"><span>#LQ-1027</span><b>تم الشحن</b><small>790 ج.م</small></div><div class="order"><span>#LQ-1026</span><b>مكتمل</b><small>560 ج.م</small></div><p class="hint">بيانات العرض هنا تجريبية وليست طلبات حقيقية.</p></section></div><div class="notice">لوحة العرض الحالية نموذج أولي. تسجيل الدخول والصلاحيات وقاعدة البيانات والمدفوعات والنشر الآلي لم يتم ربطها بعد.</div></main>`;
}
function cartModal(){
 return `<div class="modal-backdrop" id="modal"><div class="modal"><button class="close" id="closeModal">×</button><h2>سلة التسوق</h2>${cart.length?cart.map(id=>{let p=products.find(x=>x.id===id);return `<div class="cart-line"><span>${p.emoji} ${p.name}</span><b>${money(p.price)}</b></div>`}).join(''):`<p>السلة لسه فاضية. اكتشف المنتجات وأضف اللي يعجبك.</p>`}<div class="cart-total"><span>الإجمالي</span><b>${money(cart.reduce((s,id)=>s+products.find(p=>p.id===id).price,0))}</b></div><button class="primary full" id="checkout">متابعة الشراء</button><small class="hint">إتمام الدفع غير متاح في النسخة التجريبية.</small></div></div>`;
}
function render(){
 const pages={home,catalog,affiliate,vendors,dashboard};
 document.getElementById('app').innerHTML=header()+pages[active]();
 document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.page;render();window.scrollTo(0,0)}));
 document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;render()}));
 document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>{cart.push(Number(b.dataset.add));render();toast('اتضاف المنتج للسلة')}));
 document.getElementById('cartBtn').addEventListener('click',()=>{document.body.insertAdjacentHTML('beforeend',cartModal());document.getElementById('closeModal').onclick=()=>document.getElementById('modal').remove();document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal')e.target.remove()});document.getElementById('checkout').onclick=()=>toast('الدفع سيتم تفعيله بعد ربط بوابة الدفع')});
 ['joinAffiliate','vendorApply','campaignBtn'].forEach(id=>{let b=document.getElementById(id);if(b)b.onclick=()=>toast('تم تجهيز النموذج المبدئي — يلزم ربط قاعدة البيانات لتسجيل الطلب')});
}
function toast(msg){let t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.append(t);setTimeout(()=>t.remove(),2600)}
render();
