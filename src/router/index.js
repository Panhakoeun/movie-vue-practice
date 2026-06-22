import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

import MovieView from '@/views/MovieView.vue'

import SearchView from '@/views/SearchView.vue'

import NotFoundView from '@/views/NotFoundView.vue'

import ReviewsView from '@/views/ReviewsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',

    component: HomeView,
  },

  {
    path: '/movies/:id',

    name: 'movie',

    component: MovieView,

    props: true,
  },

  {
    path: '/movies/:id/reviews',

    name: 'reviews',

    component: ReviewsView,

    props: true,
  },

  {
    path: '/search',

    name: 'search',

    component: SearchView,
  },

  {
    path: '/:pathMatch(.*)*',

    name: 'not-found',

    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(),

  routes,
})

export default router
