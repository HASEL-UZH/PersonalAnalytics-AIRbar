import { createRouter, createWebHashHistory, Router } from 'vue-router'

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/experience-sampling',
      name: 'ExperienceSampling',
      component: () => import('../views/ExperienceSamplingView.vue')
    },
    // ***AIRBAR - START
    {
      path: '/planning',
      name: 'Planning',
      component: () => import('@externalVue/renderer/views/PlanningView.vue')
    },
    {
      path: '/taskbar-view',
      name: 'Taskbar View',
      component: () => import('@externalVue/renderer/views/TaskBarView.vue')
    },
    {
      path: '/retrospection',
      name: 'Retrospection',
      component: () => import('@externalVue/renderer/views/RetrospectionView.vue')
    },
    // ***AIRBAR - END
    {
      path: '/onboarding',
      name: 'Onboarding',
      component: () => import('../views/OnboardingView.vue'),
      props: (route) => ({ query: route.query.isMacOS })
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/SettingsView.vue'),
      props: (route) => ({ query: route.query.isMacOS }),
      children: [
        {
          path: '',
          name: 'General',
          redirect: 'about'
        },
        {
          path: '/about',
          name: 'About',
          component: () => import('../views/settings/AboutView.vue')
        },
        // ***AIRBAR - START
        {
          path: '/airbar',
          name: 'Airbar',
          component: () => import('../views/settings/AirbarView.vue')
        },
        // ***AIRBAR - END
        {
          path: '/work-hours',
          name: 'Active Times',
          component: () => import('../views/settings/WorkHoursView.vue')
        }
      ]
    },
    {
      path: '/data-export',
      name: 'DataExport',
      component: () => import('../views/DataExportView.vue')
    }
  ]
})

export default router
