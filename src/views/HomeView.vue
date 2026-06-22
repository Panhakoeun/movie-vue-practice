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

const totalGenres = computed(() => movieGenres.value.length)

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
    genre: form.genre.trim(),
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
      <div>
        <p>Movie Library</p>
        <h1>Choose a movie to watch</h1>
      </div>

      <div class="stats">
        <span>
          <strong>{{ movies.length }}</strong>
          Movies
        </span>
        <span>
          <strong>{{ totalGenres }}</strong>
          Genres
        </span>
      </div>
    </section>

    <section class="manage-panel">
      <div class="filter-panel">
        <div>
          <p class="panel-label">Choose type</p>
          <h2>Browse by movie type</h2>
        </div>

        <label>
          Movie type
          <select v-model="selectedGenre">
            <option value="all">All movies</option>
            <option v-for="genre in movieGenres" :key="genre" :value="genre">
              {{ genre }}
            </option>
          </select>
        </label>

        <div class="type-summary">
          <span>
            <strong>{{ filteredMovies.length }}</strong>
            Showing
          </span>
          <span>
            <strong>{{ selectedGenre === 'all' ? 'All' : selectedGenre }}</strong>
            Selected
          </span>
        </div>
      </div>

      <form class="movie-form" @submit.prevent="saveMovie">
        <div class="form-heading">
          <div>
            <p class="panel-label">Movie details</p>
            <h2>{{ editingId ? 'Update Movie' : 'Add New Movie' }}</h2>
          </div>

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

          <label class="wide-field">
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
    </section>

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
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: clamp(28px, 5vw, 52px) 0 58px;
}

.intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 22px;
  align-items: end;
  margin-bottom: 28px;
}

.intro p {
  margin: 0 0 8px;
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 900;
  text-transform: uppercase;
}

.intro h1 {
  margin: 0;
  max-width: 760px;
  color: var(--ink);
  font-size: clamp(2.25rem, 8vw, 5rem);
  line-height: 1.05;
  overflow-wrap: anywhere;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(104px, 1fr));
  gap: 10px;
}

.stats span {
  display: grid;
  gap: 2px;
  min-height: 76px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.76);
  color: var(--muted);
  font-weight: 800;
}

.stats strong {
  color: var(--ink);
  font-size: 1.8rem;
  line-height: 1;
}

.manage-panel {
  display: grid;
  grid-template-columns: minmax(250px, 0.72fr) minmax(0, 1.55fr);
  gap: 18px;
  margin-bottom: 34px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: clamp(14px, 3vw, 18px);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: var(--shadow);
}

.filter-panel,
.movie-form {
  display: grid;
  align-content: start;
  gap: 16px;
}

.filter-panel {
  min-height: 100%;
  border-radius: 8px;
  padding: 18px;
  background: var(--ink);
  color: #ffffff;
}

.movie-form {
  padding: 4px;
}

.form-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.panel-label {
  margin: 0 0 6px;
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 900;
  text-transform: uppercase;
}

.filter-panel .panel-label {
  color: #fda4af;
}

.filter-panel h2,
.form-heading h2 {
  margin: 0;
  font-size: 1.35rem;
}

.filter-panel h2 {
  color: #ffffff;
}

.form-heading h2 {
  color: var(--ink);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.wide-field {
  grid-column: span 2;
}

label {
  display: grid;
  gap: 8px;
  color: #475467;
  font-size: 0.93rem;
  font-weight: 800;
}

.filter-panel label {
  color: #d8dee8;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 12px 13px;
  background: #ffffff;
  color: var(--ink);
  font: inherit;
  outline: none;
}

textarea {
  resize: vertical;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.1);
}

.type-summary {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.type-summary span {
  display: grid;
  gap: 4px;
  min-width: 0;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
  font-weight: 800;
}

.type-summary strong {
  overflow: hidden;
  color: #ffffff;
  font-size: clamp(1.15rem, 4vw, 1.7rem);
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  background: var(--accent);
  color: #ffffff;
}

.secondary-button {
  background: var(--surface-soft);
  color: var(--ink);
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
  gap: clamp(16px, 3vw, 22px);
}

.empty {
  border: 1px dashed var(--line);
  border-radius: 8px;
  padding: 22px;
  background: rgba(255, 255, 255, 0.62);
  color: var(--muted);
  text-align: center;
}

@media (max-width: 720px) {
  .intro {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .manage-panel {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .wide-field {
    grid-column: auto;
  }

  .form-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .home {
    width: min(100% - 20px, 1180px);
    padding-bottom: 40px;
  }

  .submit-button,
  .secondary-button {
    width: 100%;
  }
}
</style>
