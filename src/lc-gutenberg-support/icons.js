import { createElement } from '@wordpress/element';

// Small curated set; easy to extend.
export const ICONS = [
  { name: 'arrow-right', label: 'Arrow Right', keywords: ['arrow','right'], svg: () => (
    <svg className="lc-button__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>
  ) },
  { name: 'arrow-left', label: 'Arrow Left', keywords: ['arrow','left'], svg: () => (
    <svg className="lc-button__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M11 19L4 12l7-7"/></svg>
  ) },
  { name: 'external', label: 'External Link', keywords: ['out','new','link'], svg: () => (
    <svg className="lc-button__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3h7v7"/><path d="M21 3l-9 9"/><path d="M14 13v6H4V10h6"/></svg>
  ) },
  { name: 'chevron-right', label: 'Chevron Right', keywords: ['chevron','right'], svg: () => (
    <svg className="lc-button__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
  ) },
  { name: 'chevron-left', label: 'Chevron Left', keywords: ['chevron','left'], svg: () => (
    <svg className="lc-button__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
  ) },
  { name: 'download', label: 'Download', keywords: ['download','arrow'], svg: () => (
    <svg className="lc-button__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>
  ) },
  { name: 'upload', label: 'Upload', keywords: ['upload','arrow'], svg: () => (
    <svg className="lc-button__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5-5 5 5"/><path d="M12 5v12"/></svg>
  ) },
  { name: 'check', label: 'Check', keywords: ['check','ok','success'], svg: () => (
    <svg className="lc-button__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
  ) },
  { name: 'close', label: 'Close', keywords: ['x','close'], svg: () => (
    <svg className="lc-button__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
  ) },
  { name: 'mail', label: 'Mail', keywords: ['mail','email'], svg: () => (
    <svg className="lc-button__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" fill="none"/><path d="M22 6l-10 7L2 6"/></svg>
  ) },
  { name: 'phone', label: 'Phone', keywords: ['phone','call'], svg: () => (
    <svg className="lc-button__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8 9a16 16 0 0 0 7 7l.67-1.2a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92z"/></svg>
  ) },
  { name: 'play', label: 'Play', keywords: ['play'], svg: () => (
    <svg className="lc-button__icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>
  ) },
  { name: 'star', label: 'Star', keywords: ['star','favorite'], svg: () => (
    <svg className="lc-button__icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
  ) },
];

export const renderIcon = (name) => {
  const icon = ICONS.find( (i) => i.name === name );
  return icon ? icon.svg() : null;
};

