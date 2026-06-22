<script setup>
import MovieCard from '@/components/MovieCard.vue'
import { movies } from '@/stores/movieStore'
import { computed } from 'vue'

const props = defineProps({
  slug: String,
})

const filteredMovies = computed(() => movies.value.filter((m) => m.genre === props.slug))
</script>

<template>
  <main class="genre-page">
    <section class="heading">
      <p>Genre</p>
      <h1>{{ props.slug }}</h1>
    </section>

    <section v-if="filteredMovies.length" class="movie-grid">
      <MovieCard v-for="movie in filteredMovies" :key="movie.id" :movie="movie" />
    </section>

    <p v-else class="empty">No movies found in this genre.</p>
  </main>
</template>

<style lang="scss" scoped>
.genre-page {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: clamp(28px, 5vw, 52px) 0 58px;
}

.heading {
  margin-bottom: 24px;
}

.heading p {
  margin: 0 0 8px;
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 900;
  text-transform: uppercase;
}

.heading h1 {
  margin: 0;
  color: var(--ink);
  font-size: clamp(2.25rem, 8vw, 4.8rem);
  line-height: 1.05;
  text-transform: capitalize;
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
</style>
