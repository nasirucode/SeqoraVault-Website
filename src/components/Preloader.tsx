'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import logo from '@/assets/seqoravault-logo.svg'
import './Preloader.css'

const BRAND = 'SeqoraVault'
const TYPE_MS = 42
const MIN_VISIBLE_MS = 300
const EXIT_MS = 440
const FALLBACK_MS = 1000

const PreloaderReadyContext = createContext(false)

export function usePreloaderReady() {
  return useContext(PreloaderReadyContext)
}

type Phase = 'loading' | 'exiting' | 'gone'

export function Preloader({ children }: { children: React.ReactNode }) {
  const startRef = useRef<number | null>(null)
  const [phase, setPhase] = useState<Phase>('loading')
  const [ready, setReady] = useState(false)
  /** Same default on server + first client paint; real value after layout (avoids hydration mismatch). */
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [loadDone, setLoadDone] = useState(false)

  useLayoutEffect(() => {
    startRef.current = Date.now()
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    queueMicrotask(() => {
      setPrefersReducedMotion(mq.matches)
      if (mq.matches) {
        setCharCount(BRAND.length)
      }
    })
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return
    if (charCount >= BRAND.length) return
    const id = window.setTimeout(() => {
      setCharCount((c) => c + 1)
    }, TYPE_MS)
    return () => window.clearTimeout(id)
  }, [charCount, prefersReducedMotion])

  useEffect(() => {
    if (document.readyState === 'complete') {
      queueMicrotask(() => setLoadDone(true))
      return
    }
    const onLoad = () => setLoadDone(true)
    window.addEventListener('load', onLoad)
    const fallback = window.setTimeout(() => setLoadDone(true), FALLBACK_MS)
    return () => {
      window.removeEventListener('load', onLoad)
      window.clearTimeout(fallback)
    }
  }, [])

  const tryExit = useCallback(() => {
    if (phase !== 'loading') return
    const started = startRef.current ?? Date.now()
    const elapsed = Date.now() - started
    const minOk = elapsed >= MIN_VISIBLE_MS
    const typeOk = prefersReducedMotion || charCount >= BRAND.length
    if (!loadDone || !minOk || !typeOk) return
    setPhase('exiting')
    window.setTimeout(() => {
      setPhase('gone')
      setReady(true)
    }, EXIT_MS)
  }, [phase, loadDone, charCount, prefersReducedMotion])

  useEffect(() => {
    tryExit()
  }, [tryExit])

  useEffect(() => {
    if (phase !== 'loading') return
    const started = startRef.current ?? Date.now()
    const elapsed = Date.now() - started
    if (elapsed >= MIN_VISIBLE_MS) return
    const id = window.setTimeout(() => tryExit(), MIN_VISIBLE_MS - elapsed)
    return () => window.clearTimeout(id)
  }, [phase, tryExit])

  const displayText = BRAND.slice(0, charCount)
  const showCaret =
    !prefersReducedMotion && phase === 'loading' && charCount < BRAND.length

  return (
    <PreloaderReadyContext.Provider value={ready}>
      {phase !== 'gone' && (
        <div
          className={`preloader ${phase === 'exiting' ? 'preloader--done' : ''}`}
          role="status"
          aria-live="polite"
          aria-busy={phase === 'loading'}
        >
          <PreloaderCard
            brandSlice={displayText}
            caretActive={showCaret}
          />
        </div>
      )}
      {children}
    </PreloaderReadyContext.Provider>
  )
}

type PreloaderCardProps = {
  brandSlice: string
  caretActive: boolean
}

/** Shared logo + title card — same DOM/CSS as the initial splash screen. */
function PreloaderCard({ brandSlice, caretActive }: PreloaderCardProps) {
  return (
    <div className="preloaderInner">
      <div className="preloaderLogoWrap">
        <div className="preloaderGlow" aria-hidden="true" />
        <span className="logoCutout">
          <span className="logoBlueDot" />
          <img
            src={typeof logo === 'string' ? logo : logo.src}
            alt=""
            className="logoImg"
          />
        </span>
      </div>
      <div className="preloaderText">
        <span className="preloaderName">
          <span className="preloaderNameWrap">
            {brandSlice}
            <span
              className={caretActive ? 'preloaderCaret' : 'preloaderCaret preloaderCaret--hidden'}
              aria-hidden="true"
            />
          </span>
        </span>
        <p className="preloaderSub">Loading experience</p>
      </div>
    </div>
  )
}

/**
 * Same visuals as the initial preloader — for Next.js `loading.tsx` during route transitions.
 * Full brand title (no typing); stacks above header/cookies via `.preloader--navigation`.
 */
export function PreloaderScreen() {
  return (
    <div
      className="preloader preloader--navigation"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <PreloaderCard brandSlice={BRAND} caretActive={false} />
    </div>
  )
}
