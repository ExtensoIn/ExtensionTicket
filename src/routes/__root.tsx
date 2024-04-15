import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Header from '../shared/components/Header'
import ImageLinear from '../shared/components/ImageLinear'

export const Route = createRootRoute({
    component: () => (
        <main>
            <Header />
            <Outlet />
            <TanStackRouterDevtools />
        </main>
    ),
})