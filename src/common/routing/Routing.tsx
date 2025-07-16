import { Main } from '@/app/Main'
import { Login } from '@/features/auth/ui/Login'
import { Route, Routes } from 'react-router'
import { PageNotFound } from '@/common/components/PageNotFound/PageNotFound.tsx'
import { ProtectedRoute } from '@/common/components/ProtectedRoute/ProtectedRoute.tsx'
import { useAppSelector } from '@/common/hooks/useAppSelector.ts'
import { selectIsLoggedIn } from '@/app/appSlice.ts'

export const Path = {
  Main: '/',
  Login: '/login',
  PageNotFound: '*',
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path={Path.Main} element={<Main />} />
      </Route>
      <Route
        element={
          <ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main} />
        }
      >
        <Route path={Path.Login} element={<Login />} />
      </Route>
      <Route path={Path.PageNotFound} element={<PageNotFound />} />
    </Routes>
  )
}
