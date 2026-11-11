import { useState } from 'react';
import { ArrowLeft, ArrowUpLeft, Check, ChevronDown, Clock3, Coffee, Crown, Gem, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Star, Users, X } from 'lucide-react';

const WHATSAPP = '966547143565';
const wa = (message: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

const packages = [
  {
    name: 'الباقة الفضية', en: 'SILVER EXPERIENCE', price: '2,550', icon: Star,
    description: 'ضيافة أنيقة بتفاصيلها الأساسية لكل مناسبة.',
    items: ['جميع أنواع الشاهي', '5 صبابين محترفين', 'معلم قهوة واحد', 'صينية تمر كبيرة واحدة', 'نخلة تمر واحدة'],
    featured: false,
  },
  {
    name: 'الباقة الذهبية', en: 'GOLD EXPERIENCE', price: '2,700', icon: Crown,
    description: 'توازن مثالي بين الكرم والأناقة.',
    items: ['جميع أنواع الشاهي', '5 صبابين محترفين', 'معلم قهوة واحد', 'صينية تمر كبيرة واحدة', 'نخلتا تمر'],
    featured: true,
  },
  {
    name: 'الباقة الألماسية', en: 'DIAMOND EXPERIENCE', price: '3,200', icon: Gem,
    description: 'تجربة ضيافة متكاملة للمناسبات المميزة.',
    items: ['جميع أنواع الشاهي', '5 صبابين محترفين', 'معلم قهوة واحد', 'صينيتا تمر كبيرتان', 'نخلتا تمر'],
    featured: false,
  },
];

const services = [
  { icon: Coffee, title: 'القهوة السعودية', text: 'قهوة عربية أصيلة تُقدّم بعناية واهتمام بالتفاصيل.' },
  { icon: Sparkles, title: 'الشاي والمشروبات', text: 'تشكيلة من أنواع الشاي والمشروبات التي تكمل تجربة الضيافة.' },
  { icon: Users, title: 'فريق ضيافة محترف', text: 'صبابون محترفون يعتنون بضيوفكم ويمنحون مناسبتكم حضورًا راقيًا.' },
  { icon: Crown, title: 'تجهيزات المناسبات', text: 'تنسيق طاولات الضيافة والتمر والتفاصيل التي تصنع الانطباع.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('الباقة الذهبية');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [form, setForm] = useState({ name: '', date: '', event: 'زواج أو ملكة', guests: '', location: 'المدينة المنورة', notes: '' });

  const openBooking = (name = 'استفسار عام') => {
    setSelectedPackage(name);
    setBookingOpen(true);
  };
  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `السلام عليكم، أرغب بالحجز لدى نخبة الضيافة.%0A%0Aالاسم: ${form.name}%0Aالباقة: ${selectedPackage}%0Aنوع المناسبة: ${form.event}%0Aالتاريخ: ${form.date}%0Aعدد الضيوف: ${form.guests}%0Aالموقع: ${form.location}%0Aملاحظات: ${form.notes}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="site-shell">
      <div className="topline"><span><MapPin size={13}/> المدينة المنورة والمناطق القريبة</span><span>ضيافة تُصنع لها الذكريات</span></div>
      <header className="header">
        <a href="#home" className="brand" aria-label="نخبة الضيافة">
          <span className="brand-mark"><Crown size={23}/></span>
          <span><b>نخبة الضيافة</b><small>HOSPITALITY ELITE</small></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="فتح القائمة">{menuOpen ? <X/> : <Menu/>}</button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          <a href="#home" onClick={() => setMenuOpen(false)}>الرئيسية</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>خدماتنا</a>
          <a href="#packages" onClick={() => setMenuOpen(false)}>الباقات</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>عن نخبة الضيافة</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>تواصل معنا</a>
        </nav>
        <button className="header-cta" onClick={() => openBooking()}><MessageCircle size={17}/> احجز مناسبتك</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" />
          <div className="hero-shade" />
          <div className="hero-content">
            <div className="eyebrow"><span/> فن الضيافة العربية الأصيلة <span/></div>
            <h1>لضيوفكم مقامٌ،<br/><em>ولضيافتكم نخبة.</em></h1>
            <p>نرتّب تفاصيل الضيافة بعناية، من فنجان القهوة السعودية إلى حسن الاستقبال، لتبقى مناسبتكم ذكرى تليق بكم.</p>
            <div className="hero-actions">
              <button className="btn btn-gold" onClick={() => openBooking()}>احجز ضيافتك <ArrowLeft size={18}/></button>
              <a className="text-link" href="#packages">اكتشف الباقات <ArrowUpLeft size={17}/></a>
            </div>
            <div className="hero-proof"><span><ShieldCheck size={16}/> فريق ضيافة محترف</span><i/><span><MapPin size={16}/> المدينة المنورة</span></div>
          </div>
          <div className="hero-side-note">HOSPITALITY · ELEGANCE · HERITAGE</div>
          <a href="#services" className="scroll-cue"><span/> اكتشف التجربة</a>
        </section>

        <section className="intro section-pad" id="about">
          <div className="intro-kicker">أهلاً بكم في نخبة الضيافة</div>
          <h2>الكرم عادة، <em>والإتقان أسلوبنا.</em></h2>
          <p>نؤمن أن الضيافة ليست مجرد تقديم القهوة، بل شعور بالترحيب واهتمام بكل تفصيل. لذلك نجمع أصالة الموروث السعودي مع ترتيب أنيق وفريق يعرف قيمة ضيوفكم.</p>
          <div className="intro-stats">
            <div><strong>01</strong><span>ضيافة بأصالة</span></div><b className="stat-line"/>
            <div><strong>02</strong><span>تنسيق باهتمام</span></div><b className="stat-line"/>
            <div><strong>03</strong><span>خدمة باحتراف</span></div>
          </div>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-heading">
            <div><span className="section-kicker">ما نقدمه لكم</span><h2>تفاصيل تصنع <em>الفرق</em></h2></div>
            <p>خدمات ضيافة متكاملة تُصمم لتمنح مناسبتكم حضورًا يليق بضيوفكم.</p>
          </div>
          <div className="service-grid">
            {services.map((s, i) => <article className="service-card" key={s.title}>
              <div className="service-number">0{i + 1}</div><div className="service-icon"><s.icon size={25}/></div>
              <h3>{s.title}</h3><p>{s.text}</p><span className="service-rule"/>
            </article>)}
          </div>
        </section>

        <section className="packages section-pad" id="packages">
          <div className="packages-bg-mark">نخبة</div>
          <div className="section-heading centered">
            <span className="section-kicker">اختر ما يليق بمناسبتك</span>
            <h2>باقات الضيافة <em>الخاصة</em></h2>
            <p>ثلاث تجارب، يجمعها الاهتمام بالتفاصيل وكرم الاستقبال.</p>
          </div>
          <div className="package-grid">
            {packages.map((p) => <article className={`package-card ${p.featured ? 'featured' : ''}`} key={p.name}>
              {p.featured && <div className="popular-tag">اختيار مميز</div>}
              <div className="package-top"><span className="package-icon"><p.icon size={23}/></span><span className="package-en">{p.en}</span></div>
              <h3>{p.name}</h3><p className="package-desc">{p.description}</p>
              <div className="price"><strong>{p.price}</strong><span>ريال سعودي</span></div>
              <div className="package-divider"/>
              <span className="includes-label">تتضمن الباقة</span>
              <ul>{p.items.map(item => <li key={item}><Check size={15}/>{item}</li>)}</ul>
              <button className={p.featured ? 'btn btn-gold package-btn' : 'btn btn-outline package-btn'} onClick={() => openBooking(p.name)}>اطلب هذه الباقة <ArrowLeft size={17}/></button>
            </article>)}
          </div>
          <p className="package-note">للاستفسار عن التخصيص والخدمات الإضافية، يسعدنا تواصلكم معنا.</p>
        </section>

        <section className="experience">
          <div className="experience-photo"/>
          <div className="experience-content">
            <span className="section-kicker">من أول فنجان إلى آخر وداع</span>
            <h2>نعتني بالتفاصيل،<br/><em>لتتفرغوا للحظاتكم.</em></h2>
            <p>نصل إلى موقع مناسبتكم، ونجهّز أركان الضيافة، ويهتم فريقنا بتقديم الخدمة لضيوفكم بكل ترحاب واحترافية.</p>
            <button className="btn btn-light" onClick={() => openBooking()}>دعنا نهتم بضيافتكم <ArrowLeft size={18}/></button>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-card">
            <div className="contact-decoration"><Crown size={36}/></div>
            <span className="section-kicker">مناسبتكم القادمة تبدأ من هنا</span>
            <h2>ضيفونا على <em>الفرح.</em></h2>
            <p>أخبرونا عن مناسبتكم، وسنتواصل معكم لتنسيق تفاصيل الضيافة المناسبة.</p>
            <div className="contact-actions">
              <a className="btn btn-gold" href={wa('السلام عليكم، أرغب بالاستفسار عن خدمات نخبة الضيافة وحجز مناسبة.')} target="_blank" rel="noreferrer"><MessageCircle size={18}/> تواصل عبر واتساب</a>
              <a className="phone-link" href="tel:+966547143565"><Phone size={17}/> 0547143565</a>
            </div>
            <small><MapPin size={13}/> المدينة المنورة</small>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="brand footer-brand"><span className="brand-mark"><Crown size={22}/></span><span><b>نخبة الضيافة</b><small>HOSPITALITY ELITE</small></span></a>
        <p>أصالة الضيافة، بروح النخبة.</p>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} نخبة الضيافة. جميع الحقوق محفوظة.</span><span>المدينة المنورة · المملكة العربية السعودية</span></div>
      </footer>

      <a className="floating-wa" href={wa('السلام عليكم، أرغب بحجز خدمة ضيافة.')} target="_blank" rel="noreferrer" aria-label="احجز عبر واتساب"><MessageCircle size={25}/><span>احجز عبر واتساب</span></a>

      {bookingOpen && <div className="modal-backdrop" onClick={() => setBookingOpen(false)}>
        <div className="booking-modal" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setBookingOpen(false)} aria-label="إغلاق"><X/></button>
          <span className="section-kicker">نخبة الضيافة</span><h2>لننسّق <em>مناسبتكم.</em></h2>
          <p className="modal-intro">أدخلوا التفاصيل الأساسية، وسنفتح لكم واتساب برسالة جاهزة لإرسال طلب الحجز.</p>
          <form onSubmit={submitBooking}>
            <label>الاسم<input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="الاسم الكريم"/></label>
            <label>الباقة<select value={selectedPackage} onChange={e => setSelectedPackage(e.target.value)}>{packages.map(p => <option key={p.name}>{p.name}</option>)}<option>استفسار عام</option></select></label>
            <div className="form-row">
              <label>تاريخ المناسبة<input required type="date" value={form.date} onChange={e => setForm({...form, date:e.target.value})}/></label>
              <label>عدد الضيوف<input value={form.guests} onChange={e => setForm({...form, guests:e.target.value})} placeholder="مثلاً 150"/></label>
            </div>
            <div className="form-row">
              <label>نوع المناسبة<select value={form.event} onChange={e => setForm({...form, event:e.target.value})}><option>زواج أو ملكة</option><option>اجتماع عائلي</option><option>مناسبة خاصة</option><option>فعالية شركة</option><option>أخرى</option></select></label>
              <label>الموقع<input value={form.location} onChange={e => setForm({...form, location:e.target.value})}/></label>
            </div>
            <label>ملاحظات إضافية<textarea rows={2} value={form.notes} onChange={e => setForm({...form, notes:e.target.value})} placeholder="أي تفاصيل تحبون إضافتها..."/></label>
            <button className="btn btn-gold submit-btn" type="submit">إرسال طلب الحجز عبر واتساب <ArrowLeft size={18}/></button>
          </form>
        </div>
      </div>}
    </div>
  );
}

export default App;