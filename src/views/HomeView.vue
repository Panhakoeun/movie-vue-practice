<script setup>
import MovieCard from '@/components/MovieCard.vue'
import { addMovie, deleteMovie, movies, updateMovie } from '@/stores/movieStore'
import { computed, reactive, ref } from 'vue'

const emptyForm = {
  title: '',
  genre: '',
  year: '',
  description: '',
  image: '',
  videoUrl: '',
}

const form = reactive({ ...emptyForm })
const editingId = ref(null)
const selectedGenre = ref('all')

const movieGenres = computed(() => {
  const genres = movies.value.map((movie) => movie.genre).filter(Boolean)

  return [...new Set(genres)].sort()
})

const filteredMovies = computed(() => {
  if (selectedGenre.value === 'all') {
    return movies.value
  }

  return movies.value.filter((movie) => movie.genre === selectedGenre.value)
})

function resetForm() {
  Object.assign(form, emptyForm)
  editingId.value = null
}

function saveMovie() {
  const movie = {
    title: form.title.trim(),
    genre: form.genre.trim().toLowerCase(),
    year: form.year,
    description: form.description.trim(),
    image: form.image.trim(),
    videoUrl: form.videoUrl.trim(),
  }

  if (editingId.value) {
    updateMovie(editingId.value, movie)
  } else {
    addMovie(movie)
  }

  resetForm()
}

function editMovie(movie) {
  editingId.value = movie.id
  Object.assign(form, {
    title: movie.title,
    genre: movie.genre,
    year: movie.year,
    description: movie.description,
    image: movie.image,
    videoUrl: movie.videoUrl || '',
  })

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function removeMovie(id) {
  deleteMovie(id)

  if (editingId.value === id) {
    resetForm()
  }
}
</script>

<template>
  <main class="home">
    <section class="intro">
      <p>Movie Library</p>
      <h1>Choose a movie to watch</h1>
    </section>

    <section class="type-filter">
      <label>
        Select movie type
        <select v-model="selectedGenre">
          <option value="all">All movies</option>
          <option v-for="genre in movieGenres" :key="genre" :value="genre">
            {{ genre }}
          </option>
        </select>
      </label>
    </section>

    <form class="movie-form" @submit.prevent="saveMovie">
      <div class="form-heading">
        <h2>{{ editingId ? 'Update Movie' : 'Add New Movie' }}</h2>
        <button v-if="editingId" type="button" class="secondary-button" @click="resetForm">
          Cancel
        </button>
      </div>

      <div class="form-grid">
        <label>
          Title
          <input v-model="form.title" type="text" required placeholder="Movie title" />
        </label>

        <label>
          Genre
          <input v-model="form.genre" type="text" required placeholder="action" />
        </label>

        <label>
          Year
          <input
            v-model="form.year"
            type="number"
            required
            min="1900"
            max="2100"
            placeholder="2026"
          />
        </label>

        <label>
          Image URL
          <input v-model="form.image" type="url" placeholder="https://..." />
        </label>

        <label>
          Video Link
          <input v-model="form.videoUrl" type="url" placeholder="https://youtube.com/..." />
        </label>
      </div>

      <label>
        Description
        <textarea
          v-model="form.description"
          required
          rows="3"
          placeholder="Short movie description"
        ></textarea>
      </label>

      <button class="submit-button" type="submit">
        {{ editingId ? 'Save Update' : 'Add Movie' }}
      </button>
    </form>

    <section class="movie-grid">
      <MovieCard
        v-for="movie in filteredMovies"
        :key="movie.id"
        :movie="movie"
        @edit="editMovie"
        @delete="removeMovie"
      />
    </section>

    <p v-if="!filteredMovies.length" class="empty">No movies found for this type.</p>
  </main>
</template>

<style lang="scss" scoped>
.home {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 34px 0 54px;
}

.intro {
  margin-bottom: 24px;
}

.intro p {
  margin: 0 0 8px;
  color: #f59e0b;
  font-weight: 700;
  text-transform: uppercase;
}

.intro h1 {
  margin: 0;
  color: #f8fafc;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1;
}

.type-filter {
  margin-bottom: 22px;
}

.type-filter label {
  max-width: 320px;
}

.movie-form {
  display: grid;
  gap: 16px;
  margin-bottom: 30px;
  border: 1px solid #263247;
  border-radius: 8px;
  padding: 20px;
  background: rgba(18, 26, 41, 0.9);
}

.form-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.form-heading h2 {
  margin: 0;
  color: #f8fafc;
  font-size: 1.35rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

label {
  display: grid;
  gap: 8px;
  color: #cbd5e1;
  font-weight: 700;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid #334155;
  border-radius: 6px;
  padding: 12px 13px;
  background: #0f172a;
  color: #f8fafc;
  font: inherit;
  outline: none;
}

textarea {
  resize: vertical;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.16);
}

.submit-button,
.secondary-button {
  min-height: 42px;
  border: 0;
  border-radius: 6px;
  padding: 0 16px;
  font: inherit;
  font-weight: 800;
  cursor: pointer;
}

.submit-button {
  width: fit-content;
  background: #f59e0b;
  color: #111827;
}

.secondary-button {
  background: #263247;
  color: #f8fafc;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 22px;
}

.empty {
  color: #cbd5e1;
}

@media (max-width: 720px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
