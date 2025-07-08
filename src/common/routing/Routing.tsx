import { Main } from '@/app/Main'
import { Login } from '@/features/auth/ui/Login'
import { Route, Routes } from 'react-router'
import { PageNotFound } from '@/common/components/PageNotFound/PageNotFound.tsx'

export const Path = {
  Main: '/',
  Login: 'login',
  PageNotFound: '*',
} as const

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<Main />} />
    <Route path={Path.Login} element={<Login />} />
    <Route path={Path.PageNotFound} element={<PageNotFound />} />
  </Routes>
)
