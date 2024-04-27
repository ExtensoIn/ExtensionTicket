import { createRootRoute, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Header from '../shared/components/layout/Header'
import NotFound from '../shared/components/NotFound'
import Footer from '../shared/components/layout/Footer'
import { Toaster } from 'sonner'

export const Route = createRootRoute({
    component: Layout,
    notFoundComponent: () => (
        <NotFound />
    ),

})

function Layout() {
    return (
        <main className='dark'>
            <ScrollRestoration getKey={(location) => location.pathname} />
            <Header />
            <Outlet />
            <Footer />
            <Toaster />
            <TanStackRouterDevtools />
        </main>
    )
}
