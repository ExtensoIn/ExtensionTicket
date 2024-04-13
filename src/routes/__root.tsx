import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
    component: () => (
        <main>
            <header>
                Hola :3
            </header>
            <Outlet />
            <TanStackRouterDevtools />
        </main>
    ),
})