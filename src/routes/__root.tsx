import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Header from '../shared/components/layout/Header'
import NotFound from '../shared/components/NotFound'
import Footer from '../shared/components/layout/Footer'

export const Route = createRootRoute({
    component: () => (
        <main className='flex flex-col'>
            <Header />
            <Outlet />
            <Footer />
            {/* <TanStackRouterDevtools /> */}
        </main>
    ),
    notFoundComponent: () => (
        <NotFound />
    ),

})