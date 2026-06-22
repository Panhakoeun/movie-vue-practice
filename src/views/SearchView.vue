<script setup>
import MovieCard from '@/components/MovieCard.vue'
import { movies } from '@/stores/movieStore'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const keyword = ref(route.query.q || '')

watch(keyword, (value) => {
  router.push({
    query: {
      q: value,
    },
  })
})

const results = computed(() => {
  const q = route.query.q?.toLowerCase() || ''

  return movies.value.filter((m) => m.title.toLowerCase().includes(q))
})
</script>

<template>
  <main class="search-page">
    <section class="heading">
      <p>Search</p>
      <h1>Find your movie</h1>
    </section>

    <input v-model="keyword" type="search" placeholder="Search by title..." />

    <section v-if="results.length" class="movie-grid">
      <MovieCard v-for="movie in results" :key="movie.id" :movie="movie" />
    </section>

    <p v-else class="empty">No movies found.</p>
  </main>
</template>

<style lang="scss" scoped>
.search-page {
  width: min(1120px, calc(100% - 24px));
  margin: 0 auto;
  padding: clamp(24px, 5vw, 34px) 0 54px;
}

.heading {
  margin-bottom: 20px;
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
  font-size: clamp(2rem, 8vw, 4rem);
  line-height: 1.05;
  overflow-wrap: anywhere;
}

input {
  width: min(520px, 100%);
  min-height: 48px;
  margin-bottom: 26px;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 0 16px;
  background: #121a29;
  color: #f8fafc;
  font: inherit;
  outline: none;
}

input:focus {
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.16);
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
  gap: clamp(16px, 3vw, 22px);
}

.empty {
  color: #cbd5e1;
}

@media (max-width: 480px) {
  .search-page {
    width: min(100% - 20px, 1120px);
    padding-bottom: 40px;
  }
}
</style>
