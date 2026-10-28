export const ArrowTA = ({ diagonal = false, bidirectional = false, className = "" }: { diagonal?: boolean; bidirectional?: boolean; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
    {bidirectional ? <path d="M4 12h16m-4-4 4 4-4 4M8 8l-4 4 4 4" /> : diagonal ? <path d="M5 19 19 5M5 5h14v14" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}
  </svg>
);

export const AsteriskTA = () => (
  <svg className="native-symbol" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M10.5 2h3v6.38l4.52-4.52 2.12 2.12-4.52 4.52H22v3h-6.38l4.52 4.52-2.12 2.12-4.52-4.52V22h-3v-6.38l-4.52 4.52-2.12-2.12 4.52-4.52H2v-3h6.38L3.86 5.98l2.12-2.12 4.52 4.52Z" />
  </svg>
);

export const BagTA = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="m5 7-1 14h16L19 7Zm3 0V5a4 4 0 0 1 8 0v2" />
  </svg>
);

export const CloseTA = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>;
