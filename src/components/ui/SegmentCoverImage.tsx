import { useState, type CSSProperties } from 'react'

type SegmentCoverImageProps = {
  src: string
  alt: string
  className?: string
  objectPosition?: string
  objectPositionMobile?: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  sizes?: string
}

/**
 * Segment cover <img> with CLS-safe dimensions, framing via CSS vars,
 * and a controlled navy/gray fallback on real load errors (no broken icon).
 */
export function SegmentCoverImage({
  src,
  alt,
  className = '',
  objectPosition,
  objectPositionMobile,
  width = 640,
  height = 360,
  loading = 'lazy',
  fetchPriority,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: SegmentCoverImageProps) {
  const [failed, setFailed] = useState(false)
  const framing =
    objectPosition || objectPositionMobile
      ? ({
          '--segment-pos': objectPosition ?? 'center center',
          '--segment-pos-mobile':
            objectPositionMobile ?? objectPosition ?? 'center center',
        } as CSSProperties)
      : undefined

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-brand-navy/20 ${className}`}
        role="img"
        aria-label={alt}
        title={
          import.meta.env.DEV && src
            ? `Falha ao carregar: ${src}`
            : undefined
        }
        data-image-failed={src || 'missing'}
      >
        {import.meta.env.DEV && src ? (
          <span className="px-3 text-center text-[10px] leading-snug text-brand-navy/50">
            {src}
          </span>
        ) : null}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`segment-framed-img bg-brand-navy/15 ${className}`}
      style={framing}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      sizes={sizes}
      onError={() => setFailed(true)}
    />
  )
}
