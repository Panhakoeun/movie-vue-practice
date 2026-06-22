import defaultMovies from '@/data/movies'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'movie-vue-practice-movies'
// Bump this version to bust stale localStorage data
const DATA_VERSION = '2'
const VERSION_KEY = 'movie-vue-practice-version'

const fallbackImage =
  'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=700&q=80'

function loadMovies() {
  const savedVersion = localStorage.getItem(VERSION_KEY)

  // If version mismatch, clear stale data and return fresh defaults
  if (savedVersion !== DATA_VERSION) {
    localStorage.setItem(VERSION_KEY, DATA_VERSION)
    localStorage.removeItem(STORAGE_KEY)
    return [...defaultMovies]
  }

  const savedMovies = localStorage.getItem(STORAGE_KEY)

  if (!savedMovies) {
    return [...defaultMovies]
  }

  try {
    return JSON.parse(savedMovies)
  } catch {
    return [...defaultMovies]
  }
}

export const movies = ref(loadMovies())

watch(
  movies,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true },
)

export function addMovie(movie) {
  const nextId = Math.max(0, ...movies.value.map((item) => Number(item.id))) + 1

  movies.value.push({
    ...movie,
    id: nextId,
    year: Number(movie.year),
    image: movie.image || fallbackImage,
  })
}

export function updateMovie(id, movie) {
  const index = movies.value.findIndex((item) => item.id === id)

  if (index === -1) return

  movies.value[index] = {
    ...movie,
    id,
    year: Number(movie.year),
    image: movie.image || fallbackImage,
  }
}

export function deleteMovie(id) {
  movies.value = movies.value.filter((movie) => movie.id !== id)
}

export function findMovie(id) {
  return movies.value.find((movie) => movie.id == id)
}
