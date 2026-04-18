import type { CSSProperties } from 'react'
import type { Payload } from 'payload'

const defaultBrandName = 'Site Admin'
const adminMarkSrc = '/favicon.ico'

type IconProps = {
  className?: string
  fill?: string
  style?: CSSProperties
}

type BrandMarkProps = {
  alt: string
  className?: string
  size: number
  style?: CSSProperties
}

function AdminBrandMark({ alt, className, size, style }: BrandMarkProps) {
  return (
    <img
      alt={alt}
      className={className}
      height={size}
      src={adminMarkSrc}
      style={style}
      width={size}
    />
  )
}

export function AdminBrandIcon({ className, style }: IconProps) {
  return <AdminBrandMark alt="" className={className} size={28} style={style} />
}

async function getBrandName(payload: Payload) {
  try {
    const siteShell = await payload.findGlobal({
      slug: 'site-shell',
      depth: 0,
    })

    return siteShell?.brand?.name || defaultBrandName
  } catch {
    return defaultBrandName
  }
}

export async function AdminBrandLogo({ payload }: { payload: Payload }) {
  const brandName = await getBrandName(payload)

  return (
    <div
      style={{
        alignItems: 'center',
        color: 'var(--theme-text)',
        display: 'inline-flex',
        gap: '0.75rem',
      }}
    >
      <AdminBrandMark alt={`${brandName} logo`} size={32} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 1.1,
        }}
      >
        <span
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          {brandName}
        </span>
        <span
          style={{
            color: 'var(--theme-elevation-600)',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Admin
        </span>
      </div>
    </div>
  )
}
