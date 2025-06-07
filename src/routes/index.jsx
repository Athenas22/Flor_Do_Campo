import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'
import HomePage from '../pages/Home'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProductPage from '../pages/Product'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <HomePage />,
})

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product',
  component: () => <ProductPage />,
})

const routeTree = rootRoute.addChildren([indexRoute, productRoute])

export const router = createRouter({ routeTree })
