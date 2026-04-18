import type { CSSProperties } from 'react'
import type { Payload } from 'payload'

const defaultBrandName = 'הבוטיק'

type IconProps = {
  className?: string
  fill?: string
  style?: CSSProperties
}

export function AdminBrandIcon({ className, fill = 'currentColor', style }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="28"
      style={style}
      viewBox="0 0 180 180"
      width="28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill={fill} height="180" rx="37" width="180" />
      <g fill="var(--admin-brand-icon-foreground, var(--theme-bg, #111111))">
        <path d="M101.141 53H136.632C151.023 53 162.689 64.6662 162.689 79.0573V112.904H148.112V79.0573C148.112 78.7105 148.098 78.3662 148.072 78.0251L112.581 112.898C112.701 112.902 112.821 112.904 112.941 112.904H148.112V126.672H112.941C98.5504 126.672 86.5638 114.891 86.5638 100.5V66.7434H101.141V100.5C101.141 101.15 101.191 101.792 101.289 102.422L137.56 66.7816C137.255 66.7563 136.945 66.7434 136.632 66.7434H101.141V53Z" />
        <path d="M65.2926 124.136L14 66.7372H34.6355L64.7495 100.436V66.7372H80.1365V118.47C80.1365 126.278 70.4953 129.958 65.2926 124.136Z" />
      </g>
    </svg>
  )
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
      <AdminBrandIcon />
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
