import { useMemo, useState } from "react";
import { Heart, Sparkles, ArrowDown, RotateCcw } from "lucide-react";

const COLLAGE = "/assets/prinm-collage.jpg";
const PORTRAIT = "/assets/prinm-portrait.jpg";

const heartSymbols = ["♥", "♡", "✦", "♥", "♡", "✧", "♥", "♡", "✦", "♥", "♡", "♥", "✧", "♡", "♥", "✦", "♡", "♥"];

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [nopeCount, setNopeCount] = useState(0);
  const [nopePosition, setNopePosition] = useState({ x: 0, y: 0 });

  const hearts = useMemo(() => heartSymbols.map((symbol, index) => ({
    symbol,
    left: `${(index * 17 + 5) % 97}%`,
    delay: `${(index % 9) * 0.72}s`,
    duration: `${8 + (index % 6) * 1.3}s`,
    size: `${14 + (index % 5) * 6}px`,
    opacity: 0.25 + (index % 4) * 0.12,
  })), []);

  const teaseMessages = ["กดตกลงเถอะนะ 🥺", "เค้ารออยู่น้าา", "ปุ่มนี้กดได้นะคนเก่ง", "ให้โอกาสเค้าได้ดูแลเธอนะ", "แง อย่าหนีเค้าสิ 💗"];

  const moveNope = () => {
    const x = (Math.random() - 0.5) * 220;
    const y = (Math.random() - 0.5) * 140;
    setNopePosition({ x, y });
    setNopeCount((count) => Math.min(count + 1, teaseMessages.length));
  };

  return (
    <main className={accepted ? "proposal-page accepted" : "proposal-page"}>
      <div className="grain" aria-hidden="true" />
      <div className="orb orb-one" aria-hidden="true" />
      <div className="orb orb-two" aria-hidden="true" />
      <div className="heartfield" aria-hidden="true">
        {hearts.map((heart, index) => (
          <span key={index} style={{ left: heart.left, animationDelay: heart.delay, animationDuration: heart.duration, fontSize: heart.size, opacity: heart.opacity }}>
            {heart.symbol}
          </span>
        ))}
      </div>

      <section className="shell">
        <header className="topbar">
          <div className="brand"><span className="brand-dot"><Heart size={15} fill="currentColor" /></span><span>for <em>ปริม</em></span></div>
          <div className="small-note"><Sparkles size={14} /> a little something from me</div>
        </header>

        {!accepted ? (
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">จดหมายรักฉบับเล็กๆ ถึงเธอ</p>
              <h1>เป็นแฟนกับ<br /><span>เค้าไหม</span><i>?</i></h1>
              <p className="intro">เค้ามีบางอย่างอยากบอกปริม<br />มานานแล้วนะ</p>
              <div className="actions">
                <button className="yes-button" onClick={() => setAccepted(true)}><Heart size={20} fill="currentColor" /> ตกลงนะ</button>
                <button className="maybe-button" style={{ transform: `translate(${nopePosition.x}px, ${nopePosition.y}px)` }} onMouseEnter={moveNope} onClick={moveNope}>ยังไม่แน่ใจ</button>
              </div>
              <p className="tease">{nopeCount > 0 ? teaseMessages[nopeCount - 1] : "เลือกคำตอบที่หัวใจบอกนะ"}</p>
              <div className="scroll-hint"><ArrowDown size={15} /> เลื่อนลงไปดูความในใจ</div>
            </div>
            <div className="photo-stack" aria-label="รูปของปริม">
              <div className="photo-card photo-back"><img src={COLLAGE} alt="ปริมในความทรงจำ" /></div>
              <div className="photo-card photo-front"><img src={PORTRAIT} alt="รูปของปริม" /><div className="photo-caption">my favorite person ♡</div></div>
              <div className="sticker">ปริม<br /><span>♡</span></div>
            </div>
          </div>
        ) : (
          <div className="accepted-view">
            <div className="success-badge"><Sparkles size={18} /> yay, you said yes!</div>
            <h2>ขอบคุณที่เข้ามา<br /><span>ในชีวิตของเค้า</span>นะเจ้าเด้กน้อย</h2>
            <p className="love-line">เธอสวยและน่ารักที่สุดเลยสำหรับเค้า<br />เค้ารักเธอนะ <Heart size={20} fill="currentColor" /></p>
            <div className="reveal-gallery">
              <div className="reveal-photo portrait"><img src={PORTRAIT} alt="ปริม" /></div>
              <div className="reveal-photo collage"><img src={COLLAGE} alt="รูปความทรงจำของปริม" /></div>
              <div className="gallery-note">to my<br /><strong>favorite girl</strong><br /><span>always & forever ♡</span></div>
            </div>
            <button className="restart" onClick={() => { setAccepted(false); setNopeCount(0); }}><RotateCcw size={15} /> ดูอีกครั้ง</button>
          </div>
        )}

        <footer className="footer-note">made with a little bit of courage & lots of love</footer>
      </section>
    </main>
  );
}
