import { HashRouter, NavLink, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { BulbIcon, GearIcon, HomeIcon, PathIcon, SearchIcon } from './components/icons'
import { KnowledgePage } from './features/knowledge/KnowledgePage'
import { LearnPage } from './features/learn/LearnPage'
import { LessonPage } from './features/lesson/LessonPage'
import { PhrasebookPage } from './features/phrasebook/PhrasebookPage'
import { ReviewPage } from './features/review/ReviewPage'
import { SettingsPage } from './features/settings/SettingsPage'
import { TodayPage } from './features/today/TodayPage'
import { useEffect } from 'react'

const tabs = [
  { to: '/', label: 'Heute', icon: HomeIcon },
  { to: '/learn', label: 'Lernen', icon: PathIcon },
  { to: '/phrases', label: 'Phrasen', icon: SearchIcon },
  { to: '/wissen', label: 'Wissen', icon: BulbIcon },
  { to: '/settings', label: 'Mehr', icon: GearIcon },
]

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/** Pages with the bottom tab bar. */
function TabLayout() {
  return (
    <>
      <main className="mx-auto w-full max-w-xl px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-28">
        <Outlet />
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-stone-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur dark:border-stone-800 dark:bg-stone-950/95">
        <div className="mx-auto grid max-w-xl grid-cols-5">
          {tabs.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition ${
                  isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-stone-500'
                }`
              }
            >
              <Icon className="h-6 w-6" />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  )
}

/** Full-screen pages for focused learning (no tab bar). */
function FocusLayout() {
  return (
    <main className="mx-auto w-full max-w-xl px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <Outlet />
    </main>
  )
}

export default function App() {
  return (
    <HashRouter>
      <ScrollTop />
      <Routes>
        <Route element={<TabLayout />}>
          <Route index element={<TodayPage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="phrases" element={<PhrasebookPage />} />
          <Route path="wissen" element={<KnowledgePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route element={<FocusLayout />}>
          <Route path="lesson/:lessonId" element={<LessonPage />} />
          <Route path="review" element={<ReviewPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
