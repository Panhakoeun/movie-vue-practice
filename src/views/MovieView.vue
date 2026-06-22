<script setup>
import { findMovie } from '@/stores/movieStore'
import { computed } from 'vue'

const props = defineProps({
  id: String,
})

const movie = computed(() => findMovie(props.id))
</script>
<template>
  <main v-if="movie" class="movie-page">
    <img class="poster" :src="movie.image" :alt="movie.title" />

    <section class="details">
      <span>{{ movie.genre }}</span>
      <h1>{{ movie.title }}</h1>
      <p class="year">{{ movie.year }}</p>
      <p class="description">{{ movie.description }}</p>

      <div class="actions">
        <a
          v-if="movie.videoUrl"
          class="watch-link"
          :href="movie.videoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch Video
        </a>
        <RouterLink class="review-link" :to="`/movies/${id}/reviews`">See Reviews</RouterLink>
        <button @click="$router.back()">Back</button>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.movie-page {
  display: grid;
  grid-template-columns: minmax(220px, 340px) 1fr;
  gap: 34px;
  width: min(980px, calc(100% - 32px));
  margin: 0 auto;
  padding: 42px 0 60px;
  align-items: start;
}

.poster {
  width: 100%;
  border-radius: 8px;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  box-shadow: 0 22px 48px rgba(0, 0, 0, 0.38);
}

.details {
  padding-top: 12px;
}

span {
  color: #f59e0b;
  font-weight: 800;
  text-transform: uppercase;
}

h1 {
  margin: 10px 0 8px;
  color: #f8fafc;
  font-size: clamp(2.3rem, 6vw, 5rem);
  line-height: 0.95;
}

.year {
  margin: 0 0 24px;
  color: #a8b3c7;
  font-size: 1.15rem;
}

.description {
  max-width: 560px;
  margin: 0;
  color: #dbe4f0;
  font-size: 1.08rem;
  line-height: 1.7;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.watch-link,
.review-link,
button {
  min-height: 42px;
  border: 0;
  border-radius: 6px;
  padding: 0 16px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.watch-link,
.review-link {
  display: inline-flex;
  align-items: center;
  color: #111827;
  text-decoration: none;
}

.watch-link {
  background: #0ea5e9;
}

.review-link {
  background: #f59e0b;
}

button {
  background: #263247;
  color: #f8fafc;
}

@media (max-width: 720px) {
  .movie-page {
    grid-template-columns: 1fr;
  }

  .poster {
    max-width: 340px;
  }
}
</style>
