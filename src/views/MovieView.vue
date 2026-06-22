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
  grid-template-columns: minmax(220px, 340px) minmax(0, 1fr);
  gap: clamp(22px, 4vw, 34px);
  width: min(980px, calc(100% - 24px));
  margin: 0 auto;
  padding: clamp(26px, 5vw, 42px) 0 60px;
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
  font-size: clamp(2.1rem, 9vw, 5rem);
  line-height: 1;
  overflow-wrap: anywhere;
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
  line-height: 1.2;
  cursor: pointer;
  text-align: center;
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

@media (max-width: 480px) {
  .movie-page {
    width: min(100% - 20px, 980px);
    padding-bottom: 42px;
  }

  .poster {
    justify-self: center;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .watch-link,
  .review-link,
  button {
    justify-content: center;
    width: 100%;
  }
}
</style>
