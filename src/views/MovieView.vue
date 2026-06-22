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
    <div class="poster-wrap">
      <img class="poster" :src="movie.image" :alt="movie.title" />
    </div>

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
  width: min(1040px, calc(100% - 32px));
  margin: 0 auto;
  padding: clamp(30px, 5vw, 58px) 0 64px;
  align-items: start;
}

.poster-wrap {
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 10px;
  background: #ffffff;
  box-shadow: var(--shadow);
}

.poster {
  display: block;
  width: 100%;
  border-radius: 8px;
  aspect-ratio: 2 / 3;
  object-fit: cover;
}

.details {
  padding-top: 18px;
}

span {
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 900;
  text-transform: uppercase;
}

h1 {
  margin: 10px 0 8px;
  color: var(--ink);
  font-size: clamp(2.25rem, 9vw, 5.5rem);
  line-height: 1.02;
  overflow-wrap: anywhere;
}

.year {
  margin: 0 0 24px;
  color: var(--muted);
  font-size: 1.15rem;
  font-weight: 800;
}

.description {
  max-width: 560px;
  margin: 0;
  color: #344054;
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
  color: #ffffff;
  text-decoration: none;
}

.watch-link {
  background: var(--accent);
}

.review-link {
  background: var(--ink);
}

button {
  background: var(--surface-soft);
  color: var(--ink);
}

@media (max-width: 720px) {
  .movie-page {
    grid-template-columns: 1fr;
  }

  .poster-wrap {
    max-width: 340px;
  }
}

@media (max-width: 480px) {
  .movie-page {
    width: min(100% - 20px, 1040px);
    padding-bottom: 42px;
  }

  .poster-wrap {
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
