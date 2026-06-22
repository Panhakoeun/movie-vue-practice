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

    <div class="search-box">
      <input v-model="keyword" type="search" placeholder="Search by title..." />
      <span>{{ results.length }} results</span>
    </div>

    <section v-if="results.length" class="movie-grid">
      <MovieCard v-for="movie in results" :key="movie.id" :movie="movie" />
    </section>

    <p v-else class="empty">No movies found.</p>
  </main>
</template>

<style lang="scss" scoped>
.search-page {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: clamp(28px, 5vw, 52px) 0 58px;
}

.heading {
  margin-bottom: 20px;
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
  overflow-wrap: anywhere;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.search-box span {
  color: var(--muted);
  font-weight: 800;
  white-space: nowrap;
}

input {
  width: min(520px, 100%);
  min-height: 48px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 0 16px;
  background: #ffffff;
  color: var(--ink);
  font: inherit;
  outline: none;
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
}

input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.1);
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

@media (max-width: 480px) {
  .search-page {
    width: min(100% - 20px, 1180px);
    padding-bottom: 40px;
  }

  .search-box {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
