import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

const variants: Record<Variant, string> = {
  primary: 'bg-emerald-700 text-white hover:bg-emerald-800 active:bg-emerald-900 disabled:bg-stone-300 dark:disabled:bg-stone-700',
  secondary:
    'bg-white text-stone-900 ring-1 ring-stone-300 hover:bg-stone-100 dark:bg-stone-900 dark:text-stone-100 dark:ring-stone-700 dark:hover:bg-stone-800',
  ghost: 'text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-stone-900',
  danger: 'bg-red-700 text-white hover:bg-red-800',
}

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      {...props}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold transition disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    />
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl bg-white p-5 shadow-sm ring-1 ring-stone-200 dark:bg-stone-900 dark:ring-stone-800 ${className}`}>
      {children}
    </div>
  )
}

export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800 ${className}`}>
      <div className="h-full rounded-full bg-emerald-600 transition-all duration-300" style={{ width: `${Math.round(Math.min(1, value) * 100)}%` }} />
    </div>
  )
}

/** Renders text with `**bold**` segments. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') ? (
          <strong key={i} className="font-semibold text-emerald-800 dark:text-emerald-300">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

export function Table({ rows }: { rows: string[][] }) {
  const [head, ...body] = rows
  return (
    <div className="-mx-1 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i} className="border-b border-stone-200 px-2 py-2 text-left font-semibold text-stone-500 dark:border-stone-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={`border-b border-stone-100 px-2 py-2 dark:border-stone-800 ${j === 0 ? 'text-stone-500' : 'font-medium'}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <header className="mb-5 flex items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-stone-500 dark:text-stone-400">{subtitle}</p>}
      </div>
      {children}
    </header>
  )
}
