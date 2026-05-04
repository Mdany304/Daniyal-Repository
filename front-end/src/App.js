import { useState, useEffect } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_PROPERTIES = [
  { id: 1, title: "Clifton Sea-View Penthouse", price: 85000000, location: "Clifton, Karachi", type: "sale", category: "Penthouse", beds: 4, baths: 3, area: 3200, description: "Ultra-luxury penthouse with panoramic Arabian Sea views, Italian marble flooring, and a private rooftop terrace. Fully smart-home enabled.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", featured: true },
  { id: 2, title: "DHA Phase 6 Modern Villa", price: 45000, location: "DHA Phase 6, Lahore", type: "rent", category: "Villa", beds: 5, baths: 4, area: 4500, description: "Elegant 1-kanal villa with a manicured lawn, modular kitchen, and premium fittings throughout. Gated community with 24/7 security.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", featured: true },
  { id: 3, title: "Bahria Town Luxury Apartment", price: 22000000, location: "Bahria Town, Islamabad", type: "sale", category: "Apartment", beds: 3, baths: 2, area: 1800, description: "Beautifully designed apartment in Bahria Town's prime zone. Features a spacious living area, modern kitchen, and stunning city views.", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", featured: false },
  { id: 4, title: "Gulberg III Commercial Office", price: 180000, location: "Gulberg III, Lahore", type: "rent", category: "Commercial", beds: 0, baths: 2, area: 2200, description: "Premium commercial office space on the main boulevard. Ideal for corporate headquarters with a dedicated parking lot.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", featured: false },
  { id: 5, title: "F-7 Margalla-View Bungalow", price: 120000000, location: "F-7, Islamabad", type: "sale", category: "Bungalow", beds: 6, baths: 5, area: 6000, description: "Opulent 2-kanal bungalow with direct Margalla Hills view. Features a private pool, home cinema, and lush landscaped garden.", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80", featured: true },
  { id: 6, title: "North Nazimabad Townhouse", price: 28000, location: "North Nazimabad, Karachi", type: "rent", category: "Townhouse", beds: 3, baths: 2, area: 1600, description: "Neat and well-maintained townhouse in a quiet residential block. Close to schools, hospitals, and major transport routes.", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80", featured: false },
  { id: 7, title: "Raiwind Road Farmhouse", price: 65000000, location: "Raiwind Road, Lahore", type: "sale", category: "Farmhouse", beds: 4, baths: 3, area: 10000, description: "Sprawling farmhouse on 4 kanals with lush green surroundings, fruit orchards, and a private guest cottage.", image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80", featured: false },
  { id: 8, title: "Gulshan-e-Iqbal Modern Flat", price: 15000, location: "Gulshan-e-Iqbal, Karachi", type: "rent", category: "Apartment", beds: 2, baths: 1, area: 950, description: "Stylish and affordable 2-bedroom flat in a secure high-rise building. Ideal for young professionals.", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", featured: false },
];

let nextId = MOCK_PROPERTIES.length + 1;

const Icon = {
  bed: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 14h20"/><path d="M6 8V4"/></svg>,
  bath: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/></svg>,
  area: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 4-8"/></svg>,
  loc: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  edit: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  close: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  arrow: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  grid: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  list: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  home: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  shield: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ink: #0f0f0f; --ink-2: #2a2a2a; --ink-3: #555; --ink-4: #888;
    --cream: #faf8f4; --cream-2: #f2ede4; --gold: #b8962e; --gold-light: #d4b055;
    --gold-pale: #f5eedc; --sale: #c0392b; --rent: #1a6b4a; --white: #ffffff;
    --border: #e8e0d0; --shadow-sm: 0 2px 12px rgba(15,15,15,0.06);
    --shadow-md: 0 8px 32px rgba(15,15,15,0.10); --shadow-lg: 0 24px 64px rgba(15,15,15,0.14);
    --r: 4px; --r-lg: 10px;
  }
  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--ink); }
  .nav { position: sticky; top: 0; z-index: 100; background: rgba(250,248,244,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 48px; height: 68px; }
  .nav-brand { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 500; letter-spacing: 0.04em; color: var(--ink); }
  .nav-brand span { color: var(--gold); }
  .nav-links { display: flex; gap: 8px; }
  .nav-btn { background: none; border: none; padding: 8px 16px; border-radius: var(--r); font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 500; cursor: pointer; color: var(--ink-3); transition: all 0.2s; }
  .nav-btn:hover, .nav-btn.active { background: var(--gold-pale); color: var(--gold); }
  .nav-btn.admin-btn { background: var(--ink); color: var(--white); display: flex; align-items: center; gap: 6px; }
  .nav-btn.admin-btn:hover { background: var(--ink-2); color: var(--white); }
  .hero { background: var(--ink); padding: 96px 48px 80px; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=60') center/cover; opacity: 0.18; }
  .hero-content { position: relative; max-width: 680px; }
  .hero-eyebrow { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 20px; }
  .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.8rem, 5vw, 4.2rem); font-weight: 300; line-height: 1.1; color: var(--white); margin-bottom: 20px; }
  .hero-title em { font-style: italic; color: var(--gold-light); }
  .hero-sub { color: #aaa; font-size: 1rem; font-weight: 300; max-width: 460px; line-height: 1.7; }
  .hero-stats { display: flex; gap: 40px; margin-top: 48px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.1); }
  .hero-stat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 400; color: var(--white); }
  .hero-stat-label { font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: #666; margin-top: 2px; }
  .search-section { background: var(--white); border-bottom: 1px solid var(--border); padding: 20px 48px; }
  .search-row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
  .search-input-wrap { flex: 1; min-width: 220px; position: relative; }
  .search-input-wrap svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--ink-4); }
  .search-input { width: 100%; padding: 10px 14px 10px 42px; border: 1px solid var(--border); border-radius: var(--r); font-family: 'DM Sans', sans-serif; font-size: 0.9rem; background: var(--cream); color: var(--ink); outline: none; transition: border 0.2s; }
  .search-input:focus { border-color: var(--gold); background: var(--white); }
  .select-field { padding: 10px 14px; border: 1px solid var(--border); border-radius: var(--r); font-family: 'DM Sans', sans-serif; font-size: 0.9rem; background: var(--cream); color: var(--ink); outline: none; cursor: pointer; min-width: 150px; transition: border 0.2s; }
  .select-field:focus { border-color: var(--gold); }
  .btn-primary { padding: 10px 22px; background: var(--gold); color: var(--white); border: none; border-radius: var(--r); font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: all 0.2s; white-space: nowrap; display: flex; align-items: center; gap: 8px; }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); box-shadow: var(--shadow-md); }
  .btn-secondary { padding: 10px 18px; background: none; color: var(--ink-3); border: 1px solid var(--border); border-radius: var(--r); font-family: 'DM Sans', sans-serif; font-size: 0.875rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
  .btn-secondary:hover { border-color: var(--ink-3); color: var(--ink); }
  .btn-danger { padding: 8px 14px; background: none; color: var(--sale); border: 1px solid var(--sale); border-radius: var(--r); font-family: 'DM Sans', sans-serif; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 5px; }
  .btn-danger:hover { background: var(--sale); color: var(--white); }
  .main { max-width: 1400px; margin: 0 auto; padding: 40px 48px; }
  .results-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 12px; }
  .results-count { font-size: 0.85rem; color: var(--ink-4); }
  .results-count strong { color: var(--ink); font-weight: 600; }
  .view-toggle { display: flex; gap: 4px; background: var(--cream-2); border-radius: var(--r); padding: 3px; }
  .view-btn { padding: 6px 10px; border: none; border-radius: 3px; cursor: pointer; background: none; color: var(--ink-4); transition: all 0.15s; display: flex; align-items: center; }
  .view-btn.active { background: var(--white); color: var(--ink); box-shadow: var(--shadow-sm); }
  .property-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
  .property-list-view { display: flex; flex-direction: column; gap: 16px; }
  .card { background: var(--white); border-radius: var(--r-lg); overflow: hidden; box-shadow: var(--shadow-sm); transition: all 0.3s; cursor: pointer; position: relative; }
  .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
  .card-img { width: 100%; height: 210px; object-fit: cover; display: block; transition: transform 0.4s; }
  .card:hover .card-img { transform: scale(1.03); }
  .card-img-wrap { overflow: hidden; position: relative; }
  .card-badge { position: absolute; top: 14px; left: 14px; padding: 4px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
  .badge-sale { background: var(--sale); color: var(--white); }
  .badge-rent { background: var(--rent); color: var(--white); }
  .card-featured { position: absolute; top: 14px; right: 14px; background: var(--gold); color: var(--white); padding: 4px 10px; border-radius: 20px; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
  .card-body { padding: 20px; }
  .card-cat { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); margin-bottom: 6px; }
  .card-title { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 500; line-height: 1.3; color: var(--ink); margin-bottom: 6px; }
  .card-loc { display: flex; align-items: center; gap: 5px; font-size: 0.82rem; color: var(--ink-4); margin-bottom: 14px; }
  .card-specs { display: flex; gap: 16px; margin-bottom: 16px; flex-wrap: wrap; }
  .card-spec { display: flex; align-items: center; gap: 5px; font-size: 0.8rem; color: var(--ink-3); }
  .card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid var(--border); }
  .card-price { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 500; color: var(--ink); }
  .card-cta { padding: 7px 14px; background: var(--gold-pale); color: var(--gold); border: none; border-radius: var(--r); font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 5px; }
  .card-cta:hover { background: var(--gold); color: var(--white); }
  .list-card { background: var(--white); border-radius: var(--r-lg); overflow: hidden; box-shadow: var(--shadow-sm); transition: all 0.3s; cursor: pointer; display: flex; align-items: stretch; }
  .list-card:hover { box-shadow: var(--shadow-md); transform: translateX(4px); }
  .list-card-img { width: 240px; min-width: 240px; object-fit: cover; }
  .list-card-body { padding: 20px 24px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
  .list-card-bottom { display: flex; align-items: center; justify-content: space-between; }
  .overlay { position: fixed; inset: 0; background: rgba(15,15,15,0.7); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn 0.2s ease; }
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  .modal { background: var(--white); border-radius: 16px; width: 100%; max-width: 640px; max-height: 90vh; overflow-y: auto; box-shadow: var(--shadow-lg); animation: slideUp 0.25s ease; }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
  .modal-header { padding: 24px 28px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; background: var(--white); }
  .modal-title { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 500; }
  .modal-close { background: none; border: none; cursor: pointer; color: var(--ink-4); padding: 4px; border-radius: var(--r); transition: all 0.15s; }
  .modal-close:hover { background: var(--cream-2); color: var(--ink); }
  .modal-body { padding: 24px 28px; }
  .detail-img { width: 100%; height: 300px; object-fit: cover; border-radius: var(--r-lg); margin-bottom: 22px; }
  .detail-badges { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
  .detail-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; }
  .detail-title { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 500; margin-bottom: 8px; line-height: 1.2; }
  .detail-loc { display: flex; align-items: center; gap: 6px; font-size: 0.9rem; color: var(--ink-4); margin-bottom: 20px; }
  .detail-specs { display: flex; gap: 24px; padding: 16px; background: var(--cream); border-radius: var(--r-lg); margin-bottom: 20px; flex-wrap: wrap; }
  .detail-spec { display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .detail-spec-val { font-size: 1.1rem; font-weight: 600; color: var(--ink); }
  .detail-spec-key { font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-4); }
  .detail-desc { font-size: 0.92rem; line-height: 1.8; color: var(--ink-3); margin-bottom: 24px; }
  .detail-price-row { display: flex; align-items: baseline; gap: 8px; padding-top: 20px; border-top: 1px solid var(--border); }
  .detail-price { font-family: 'Cormorant Garamond', serif; font-size: 2.4rem; font-weight: 500; color: var(--gold); }
  .detail-price-label { font-size: 0.85rem; color: var(--ink-4); }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-group.full { grid-column: 1 / -1; }
  .form-label { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-3); }
  .form-input, .form-textarea, .form-select { padding: 10px 14px; border: 1px solid var(--border); border-radius: var(--r); font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: var(--ink); background: var(--cream); outline: none; transition: border 0.2s; }
  .form-input:focus, .form-textarea:focus, .form-select:focus { border-color: var(--gold); background: var(--white); }
  .form-textarea { resize: vertical; min-height: 90px; }
  .form-actions { display: flex; gap: 10px; justify-content: flex-end; padding-top: 20px; border-top: 1px solid var(--border); margin-top: 8px; }
  .btn-submit { padding: 10px 24px; background: var(--gold); color: var(--white); border: none; border-radius: var(--r); font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .btn-submit:hover { background: var(--gold-light); }
  .admin-panel { background: var(--white); border-radius: var(--r-lg); overflow: hidden; box-shadow: var(--shadow-sm); }
  .admin-header { padding: 20px 28px; background: var(--ink); display: flex; align-items: center; justify-content: space-between; }
  .admin-header h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 400; color: var(--white); }
  .admin-table { width: 100%; border-collapse: collapse; }
  .admin-table th { padding: 12px 20px; text-align: left; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-4); background: var(--cream); border-bottom: 1px solid var(--border); }
  .admin-table td { padding: 14px 20px; font-size: 0.875rem; border-bottom: 1px solid var(--border); vertical-align: middle; }
  .admin-table tr:last-child td { border-bottom: none; }
  .admin-table tr:hover td { background: var(--cream); }
  .admin-img { width: 56px; height: 40px; object-fit: cover; border-radius: var(--r); }
  .admin-actions { display: flex; gap: 8px; }
  .price-cell { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-weight: 500; }
  .empty { text-align: center; padding: 80px 20px; color: var(--ink-4); }
  .empty-icon { font-size: 3rem; margin-bottom: 16px; }
  .empty h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 400; margin-bottom: 8px; color: var(--ink-3); }
  .footer { background: var(--ink); padding: 40px 48px; margin-top: 80px; text-align: center; }
  .footer-brand { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 400; color: var(--white); margin-bottom: 8px; }
  .footer-brand span { color: var(--gold-light); }
  .footer-sub { font-size: 0.82rem; color: #555; }
  .toast { position: fixed; bottom: 28px; right: 28px; z-index: 999; background: var(--ink); color: var(--white); padding: 14px 20px; border-radius: var(--r-lg); font-size: 0.875rem; box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: 10px; animation: slideUp 0.3s ease; border-left: 3px solid var(--gold); }
  @media (max-width: 768px) {
    .nav { padding: 0 20px; } .hero { padding: 64px 20px 56px; } .hero-stats { gap: 24px; flex-wrap: wrap; }
    .search-section { padding: 16px 20px; } .main { padding: 28px 20px; } .form-grid { grid-template-columns: 1fr; }
    .list-card-img { width: 140px; min-width: 140px; } .admin-table { display: block; overflow-x: auto; } .footer { padding: 32px 20px; }
  }
`;

const formatPrice = (price, type) => {
  if (type === "rent") return `PKR ${price.toLocaleString()}/mo`;
  if (price >= 10000000) return `PKR ${(price / 10000000).toFixed(1)} Cr`;
  if (price >= 100000) return `PKR ${(price / 100000).toFixed(1)} Lac`;
  return `PKR ${price.toLocaleString()}`;
};

function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  return <div className="toast">✓ {msg}</div>;
}

function PropertyCard({ prop, onView, onEdit, onDelete, isAdmin }) {
  return (
    <div className="card" onClick={() => !isAdmin && onView(prop)}>
      <div className="card-img-wrap">
        <img className="card-img" src={prop.image} alt={prop.title} />
        <span className={`card-badge badge-${prop.type}`}>{prop.type === "sale" ? "For Sale" : "For Rent"}</span>
        {prop.featured && <span className="card-featured">Featured</span>}
      </div>
      <div className="card-body">
        <div className="card-cat">{prop.category}</div>
        <div className="card-title">{prop.title}</div>
        <div className="card-loc"><Icon.loc /> {prop.location}</div>
        <div className="card-specs">
          {prop.beds > 0 && <span className="card-spec"><Icon.bed /> {prop.beds} Beds</span>}
          {prop.baths > 0 && <span className="card-spec"><Icon.bath /> {prop.baths} Baths</span>}
          <span className="card-spec"><Icon.area /> {prop.area.toLocaleString()} sq ft</span>
        </div>
        <div className="card-footer">
          <span className="card-price">{formatPrice(prop.price, prop.type)}</span>
          {isAdmin ? (
            <div style={{ display: "flex", gap: 8 }} onClick={e => e.stopPropagation()}>
              <button className="btn-secondary" style={{ padding: "6px 12px" }} onClick={() => onEdit(prop)}><Icon.edit /> Edit</button>
              <button className="btn-danger" onClick={() => onDelete(prop.id)}><Icon.trash /> Del</button>
            </div>
          ) : (
            <button className="card-cta" onClick={e => { e.stopPropagation(); onView(prop); }}>View <Icon.arrow /></button>
          )}
        </div>
      </div>
    </div>
  );
}

function ListCard({ prop, onView, onEdit, onDelete, isAdmin }) {
  return (
    <div className="list-card" onClick={() => !isAdmin && onView(prop)}>
      <img className="list-card-img" src={prop.image} alt={prop.title} />
      <div className="list-card-body">
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <span className={`card-badge badge-${prop.type}`}>{prop.type === "sale" ? "For Sale" : "For Rent"}</span>
            <span style={{ fontSize: "0.72rem", color: "var(--gold)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>{prop.category}</span>
          </div>
          <div className="card-title" style={{ marginBottom: 4 }}>{prop.title}</div>
          <div className="card-loc"><Icon.loc /> {prop.location}</div>
          <div className="card-specs" style={{ marginTop: 10 }}>
            {prop.beds > 0 && <span className="card-spec"><Icon.bed /> {prop.beds} Beds</span>}
            {prop.baths > 0 && <span className="card-spec"><Icon.bath /> {prop.baths} Baths</span>}
            <span className="card-spec"><Icon.area /> {prop.area.toLocaleString()} sq ft</span>
          </div>
        </div>
        <div className="list-card-bottom">
          <span className="card-price">{formatPrice(prop.price, prop.type)}</span>
          {isAdmin ? (
            <div style={{ display: "flex", gap: 8 }} onClick={e => e.stopPropagation()}>
              <button className="btn-secondary" style={{ padding: "6px 12px" }} onClick={() => onEdit(prop)}><Icon.edit /> Edit</button>
              <button className="btn-danger" onClick={() => onDelete(prop.id)}><Icon.trash /> Del</button>
            </div>
          ) : (
            <button className="card-cta" onClick={e => { e.stopPropagation(); onView(prop); }}>View <Icon.arrow /></button>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailModal({ prop, onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Property Details</span>
          <button className="modal-close" onClick={onClose}><Icon.close /></button>
        </div>
        <div className="modal-body">
          <img className="detail-img" src={prop.image} alt={prop.title} />
          <div className="detail-badges">
            <span className={`detail-badge badge-${prop.type}`}>{prop.type === "sale" ? "For Sale" : "For Rent"}</span>
            <span className="detail-badge" style={{ background: "var(--gold-pale)", color: "var(--gold)" }}>{prop.category}</span>
            {prop.featured && <span className="detail-badge" style={{ background: "var(--gold)", color: "var(--white)" }}>Featured</span>}
          </div>
          <div className="detail-title">{prop.title}</div>
          <div className="detail-loc"><Icon.loc /> {prop.location}</div>
          <div className="detail-specs">
            {prop.beds > 0 && <div className="detail-spec"><span className="detail-spec-val">{prop.beds}</span><span className="detail-spec-key">Bedrooms</span></div>}
            {prop.baths > 0 && <div className="detail-spec"><span className="detail-spec-val">{prop.baths}</span><span className="detail-spec-key">Bathrooms</span></div>}
            <div className="detail-spec"><span className="detail-spec-val">{prop.area.toLocaleString()}</span><span className="detail-spec-key">Sq Ft</span></div>
          </div>
          <p className="detail-desc">{prop.description}</p>
          <div className="detail-price-row">
            <span className="detail-price">{formatPrice(prop.price, prop.type)}</span>
            <span className="detail-price-label">{prop.type === "rent" ? "monthly rent" : "sale price"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const EMPTY_FORM = { title: "", price: "", location: "", type: "sale", category: "Apartment", beds: "", baths: "", area: "", description: "", image: "", featured: false };

function PropertyForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSave = () => {
    if (!form.title || !form.price || !form.location) return alert("Title, price, and location are required.");
    onSave({ ...form, price: Number(form.price), beds: Number(form.beds) || 0, baths: Number(form.baths) || 0, area: Number(form.area) || 0, image: form.image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" });
  };
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{initial ? "Edit Property" : "Add New Property"}</span>
          <button className="modal-close" onClick={onClose}><Icon.close /></button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group full"><label className="form-label">Title *</label><input className="form-input" value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. DHA Phase 5 Luxury Villa" /></div>
            <div className="form-group"><label className="form-label">Price (PKR) *</label><input className="form-input" type="number" value={form.price} onChange={e => set("price", e.target.value)} placeholder="e.g. 45000000" /></div>
            <div className="form-group"><label className="form-label">Location *</label><input className="form-input" value={form.location} onChange={e => set("location", e.target.value)} placeholder="e.g. DHA Phase 5, Lahore" /></div>
            <div className="form-group"><label className="form-label">Type</label><select className="form-select" value={form.type} onChange={e => set("type", e.target.value)}><option value="sale">For Sale</option><option value="rent">For Rent</option></select></div>
            <div className="form-group"><label className="form-label">Category</label><select className="form-select" value={form.category} onChange={e => set("category", e.target.value)}>{["Apartment","Villa","Bungalow","Penthouse","Townhouse","Commercial","Farmhouse"].map(c => <option key={c}>{c}</option>)}</select></div>
            <div className="form-group"><label className="form-label">Bedrooms</label><input className="form-input" type="number" value={form.beds} onChange={e => set("beds", e.target.value)} placeholder="0" /></div>
            <div className="form-group"><label className="form-label">Bathrooms</label><input className="form-input" type="number" value={form.baths} onChange={e => set("baths", e.target.value)} placeholder="0" /></div>
            <div className="form-group full"><label className="form-label">Area (sq ft)</label><input className="form-input" type="number" value={form.area} onChange={e => set("area", e.target.value)} placeholder="e.g. 2400" /></div>
            <div className="form-group full"><label className="form-label">Image URL</label><input className="form-input" value={form.image} onChange={e => set("image", e.target.value)} placeholder="https://..." /></div>
            <div className="form-group full"><label className="form-label">Description</label><textarea className="form-textarea" value={form.description} onChange={e => set("description", e.target.value)} placeholder="Describe the property..." /></div>
            <div className="form-group"><label className="form-label" style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}><input type="checkbox" checked={form.featured} onChange={e => set("featured", e.target.checked)} /> Mark as Featured</label></div>
          </div>
          <div className="form-actions">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn-submit" onClick={handleSave}>{initial ? "Save Changes" : "Add Property"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [properties, setProperties] = useState(MOCK_PROPERTIES);
  const [view, setView] = useState("user");
  const [gridMode, setGridMode] = useState("grid");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCat, setFilterCat] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [selected, setSelected] = useState(null);
  const [formProp, setFormProp] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = msg => setToast(msg);

  const filtered = properties.filter(p => {
    const q = search.toLowerCase();
    return (!q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q))
      && (filterType === "all" || p.type === filterType)
      && (filterCat === "all" || p.category === filterCat)
      && (!maxPrice || p.price <= Number(maxPrice));
  });

  const handleSave = (data) => {
    if (data.id) { setProperties(ps => ps.map(p => p.id === data.id ? data : p)); showToast("Property updated successfully"); }
    else { setProperties(ps => [...ps, { ...data, id: nextId++ }]); showToast("Property added successfully"); }
    setFormProp(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this property?")) return;
    setProperties(ps => ps.filter(p => p.id !== id));
    showToast("Property deleted");
  };

  const cats = ["all", ...Array.from(new Set(properties.map(p => p.category)))];

  return (
    <>
      <style>{css}</style>
      <nav className="nav">
        <div className="nav-brand">Estat<span>iq</span></div>
        <div className="nav-links">
          <button className={`nav-btn ${view === "user" ? "active" : ""}`} onClick={() => setView("user")} style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon.home /> Browse</button>
          <button className={`nav-btn admin-btn`} onClick={() => setView("admin")} style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon.shield /> Admin Panel</button>
        </div>
      </nav>

      {view === "user" ? (
        <>
          <div className="hero">
            <div className="hero-content">
              <div className="hero-eyebrow">Pakistan's Premier Property Platform</div>
              <h1 className="hero-title">Find Your <em>Perfect</em><br />Property</h1>
              <p className="hero-sub">Discover curated luxury properties across Karachi, Lahore, and Islamabad.</p>
              <div className="hero-stats">
                <div className="hero-stat"><div className="hero-stat-num">{properties.length}+</div><div className="hero-stat-label">Listings</div></div>
                <div className="hero-stat"><div className="hero-stat-num">{properties.filter(p => p.type === "sale").length}</div><div className="hero-stat-label">For Sale</div></div>
                <div className="hero-stat"><div className="hero-stat-num">{properties.filter(p => p.type === "rent").length}</div><div className="hero-stat-label">For Rent</div></div>
                <div className="hero-stat"><div className="hero-stat-num">3</div><div className="hero-stat-label">Cities</div></div>
              </div>
            </div>
          </div>
          <div className="search-section">
            <div className="search-row">
              <div className="search-input-wrap"><Icon.search /><input className="search-input" placeholder="Search by title or location…" value={search} onChange={e => setSearch(e.target.value)} /></div>
              <select className="select-field" value={filterType} onChange={e => setFilterType(e.target.value)}><option value="all">All Types</option><option value="sale">For Sale</option><option value="rent">For Rent</option></select>
              <select className="select-field" value={filterCat} onChange={e => setFilterCat(e.target.value)}>{cats.map(c => <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>)}</select>
              <input className="select-field" type="number" placeholder="Max price (PKR)" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} style={{ minWidth: 170 }} />
            </div>
          </div>
          <div className="main">
            <div className="results-header">
              <div className="results-count">Showing <strong>{filtered.length}</strong> of {properties.length} properties</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {(search || filterType !== "all" || filterCat !== "all" || maxPrice) && (
                  <button className="btn-secondary" style={{ fontSize: "0.8rem", padding: "6px 12px" }} onClick={() => { setSearch(""); setFilterType("all"); setFilterCat("all"); setMaxPrice(""); }}>Clear Filters</button>
                )}
                <div className="view-toggle">
                  <button className={`view-btn ${gridMode === "grid" ? "active" : ""}`} onClick={() => setGridMode("grid")}><Icon.grid /></button>
                  <button className={`view-btn ${gridMode === "list" ? "active" : ""}`} onClick={() => setGridMode("list")}><Icon.list /></button>
                </div>
              </div>
            </div>
            {filtered.length === 0 ? (
              <div className="empty"><div className="empty-icon">🏚</div><h3>No properties found</h3><p>Try adjusting your search filters.</p></div>
            ) : gridMode === "grid" ? (
              <div className="property-grid">{filtered.map(p => <PropertyCard key={p.id} prop={p} onView={setSelected} isAdmin={false} />)}</div>
            ) : (
              <div className="property-list-view">{filtered.map(p => <ListCard key={p.id} prop={p} onView={setSelected} isAdmin={false} />)}</div>
            )}
          </div>
        </>
      ) : (
        <div className="main">
          <div className="admin-panel">
            <div className="admin-header">
              <h2>Property Management</h2>
              <button className="btn-primary" onClick={() => setFormProp({})}><Icon.plus /> Add Property</button>
            </div>
            {properties.length === 0 ? (
              <div className="empty"><div className="empty-icon">📋</div><h3>No properties yet</h3></div>
            ) : (
              <table className="admin-table">
                <thead><tr><th>Image</th><th>Title</th><th>Location</th><th>Type</th><th>Category</th><th>Price</th><th>Actions</th></tr></thead>
                <tbody>
                  {properties.map(p => (
                    <tr key={p.id}>
                      <td><img className="admin-img" src={p.image} alt={p.title} /></td>
                      <td style={{ fontWeight: 500, maxWidth: 200 }}>{p.title}</td>
                      <td style={{ color: "var(--ink-3)" }}>{p.location}</td>
                      <td><span className={`card-badge badge-${p.type}`}>{p.type === "sale" ? "Sale" : "Rent"}</span></td>
                      <td style={{ color: "var(--ink-3)" }}>{p.category}</td>
                      <td className="price-cell">{formatPrice(p.price, p.type)}</td>
                      <td><div className="admin-actions"><button className="btn-secondary" style={{ padding: "6px 12px" }} onClick={() => setFormProp(p)}><Icon.edit /> Edit</button><button className="btn-danger" onClick={() => handleDelete(p.id)}><Icon.trash /> Delete</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      <div className="footer"><div className="footer-brand">Estat<span>iq</span></div><div className="footer-sub">Premium Real Estate Platform · Pakistan</div></div>
      {selected && <DetailModal prop={selected} onClose={() => setSelected(null)} />}
      {formProp !== null && <PropertyForm initial={formProp.id ? formProp : null} onSave={handleSave} onClose={() => setFormProp(null)} />}
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </>
  );
}
