import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Header from '../shared/components/Header'
import NotFound from '../shared/components/NotFound'

export const Route = createRootRoute({
    component: () => (
        <main className='flex flex-col items-center'>
            <Header />
            <Outlet />
            <TanStackRouterDevtools />
        </main>
    ),
    notFoundComponent: () => (
        <NotFound />
    ),
    
}
)