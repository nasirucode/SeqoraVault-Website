import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import logo from '../assets/seqoravault-logo.svg'
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
  const startRef = useRef(Date.now())
  const [phase, setPhase] = useState<Phase>('loading')
  const [ready, setReady] = useState(false)
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [charCount, setCharCount] = useState(() =>
    reducedMotion ? BRAND.length : 0,
  )
  const [loadDone, setLoadDone] = useState(
    typeof document !== 'undefined' && document.readyState === 'complete',
  )

  useEffect(() => {
    if (reducedMotion) {
      setCharCount(BRAND.length)
      return
    }
    if (charCount >= BRAND.length) return
    const id = window.setTimeout(() => {
      setCharCount((c) => c + 1)
    }, TYPE_MS)
    return () => window.clearTimeout(id)
  }, [charCount, reducedMotion])

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.readyState === 'complete') return
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
    const elapsed = Date.now() - startRef.current
    const minOk = elapsed >= MIN_VISIBLE_MS
    const typeOk = reducedMotion || charCount >= BRAND.length
    if (!loadDone || !minOk || !typeOk) return
    setPhase('exiting')
    window.setTimeout(() => {
      setPhase('gone')
      setReady(true)
    }, EXIT_MS)
  }, [phase, loadDone, charCount, reducedMotion])

  useEffect(() => {
    tryExit()
  }, [tryExit])

  useEffect(() => {
    if (phase !== 'loading') return
    const elapsed = Date.now() - startRef.current
    if (elapsed >= MIN_VISIBLE_MS) return
    const id = window.setTimeout(() => tryExit(), MIN_VISIBLE_MS - elapsed)
    return () => window.clearTimeout(id)
  }, [phase, tryExit])

  const displayText = BRAND.slice(0, charCount)
  const showCaret =
    !reducedMotion && phase === 'loading' && charCount < BRAND.length

  return (
    <PreloaderReadyContext.Provider value={ready}>
      {phase !== 'gone' && (
        <div
          className={`preloader ${phase === 'exiting' ? 'preloader--done' : ''}`}
          role="status"
          aria-live="polite"
          aria-busy={phase === 'loading'}
        >
          <div className="preloaderInner">
            <div className="preloaderLogoWrap">
              <div className="preloaderGlow" aria-hidden="true" />
              <span className="logoCutout">
                <span className="logoBlueDot" />
                <img src={logo} alt="" className="logoImg" />
              </span>
            </div>
            <div className="preloaderText">
              <span className="preloaderName">
                <span className="preloaderNameWrap">
                  {displayText}
                  <span
                    className={
                      showCaret ? 'preloaderCaret' : 'preloaderCaret preloaderCaret--hidden'
                    }
                    aria-hidden="true"
                  />
                </span>
              </span>
              <p className="preloaderSub">Loading experience</p>
            </div>
          </div>
        </div>
      )}
      {children}
    </PreloaderReadyContext.Provider>
  )
}
