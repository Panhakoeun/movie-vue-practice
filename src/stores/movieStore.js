import defaultMovies from '@/data/movies'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'movie-vue-practice-movies'
const fallbackImage =
  'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=700&q=80'

function loadMovies() {
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
