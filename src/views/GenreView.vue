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
      <h1>{{ slug }}</h1>
    </section>

    <section v-if="filteredMovies.length" class="movie-grid">
      <MovieCard v-for="movie in filteredMovies" :key="movie.id" :movie="movie" />
    </section>

    <p v-else class="empty">No movies found in this genre.</p>
  </main>
</template>

<style lang="scss" scoped>
.genre-page {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 34px 0 54px;
}

.heading {
  margin-bottom: 24px;
}

.heading p {
  margin: 0 0 8px;
  color: #f59e0b;
  font-weight: 700;
  text-transform: uppercase;
}

.heading h1 {
  margin: 0;
  color: #f8fafc;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1;
  text-transform: capitalize;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 22px;
}

.empty {
  color: #cbd5e1;
}
</style>
