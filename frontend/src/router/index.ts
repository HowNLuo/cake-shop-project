import { useAuthStore } from '@/stores/authStore'
import { useMessageStore } from '@/stores/messageStore'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: () => {
      const authStore = useAuthStore()
      return authStore.user?.role === 'Admin' ? '/dashboard' : '/home'
    },
  },
  // 一般使用者
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('@/pages/shared/SignUp.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/user/Home.vue'),
  },
  {
    path: '/products',
    name: 'product-listing',
    component: () => import('@/pages/user/ProductListing.vue'),
  },
  {
    path: '/product/:id',
    name: 'product-details',
    component: () => import('@/pages/user/ProductDetails.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/pages/user/Cart.vue'),
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/pages/user/Checkout.vue'),
  },
  {
    path: '/checkout/confirm/:id',
    name: 'checkout-confirmation',
    component: () => import('@/pages/user/CheckoutConfirmation.vue'),
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/pages/user/Orders.vue'),
  },
  // 後台
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/admin/Dashboard.vue'),
  },
  {
    path: '/products-management',
    name: 'product-management',
    component: () => import('@/pages/admin/ProductManagement.vue'),
  },
  {
    path: '/categories-management',
    name: 'categories-management',
    component: () => import('@/pages/admin/CategoryManagement.vue'),
  },
  {
    path: '/orders-management',
    name: 'order-management',
    component: () => import('@/pages/admin/OrderManagement.vue'),
  },
  {
    path: '/users-management',
    name: 'user-management',
    component: () => import('@/pages/admin/UserManagement.vue'),
  },
  // 共用
  {
    path: '/signin',
    name: 'sign-in',
    component: () => import('@/pages/shared/SignIn.vue'),
  },
  // 萬用路由
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      const authStore = useAuthStore()
      return authStore.user?.role === 'Admin' ? '/dashboard' : '/home'
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const message = useMessageStore()
  const authStore = useAuthStore()
  const role = authStore.user?.role

  const publicPaths = ['/signin', '/home', '/products', '/product', '/cart', '/signup']
  const isPublic = publicPaths.includes(to.path)

  const userPaths = ['/checkout', '/checkout/confirm', '/orders']
  const adminPaths = [
    '/dashboard',
    '/products-management',
    '/categories-management',
    '/orders-management',
    '/users-management',
  ]

  const isUserRoute = userPaths.some((path) => to.path === path || to.path.startsWith(path + '/'))
  const isAdminRoute = adminPaths.includes(to.path)

  if (to.path === '/signin' && authStore.user) {
    return next(authStore.user.role === 'Admin' ? '/dashboard' : '/home')
  }

  if (!authStore.user && !isPublic) {
    message.show('Please sign in to continue', 'error')
    return next('/signin')
  }

  if (isUserRoute && role !== 'User') {
    message.show('Only general users are allowed to access this page', 'error')
    return next(from.path)
  }

  if (isAdminRoute && role !== 'Admin') {
    message.show('Only administrators are allowed to access this page', 'error')
    return next(from.path)
  }

  next()
})

export default router
