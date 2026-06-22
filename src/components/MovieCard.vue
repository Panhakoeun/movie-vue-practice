<script setup>
defineProps({
  movie: Object,
})

defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="card">
    <img class="poster" :src="movie.image" :alt="movie.title" />

    <div class="content">
      <span class="genre">{{ movie.genre }}</span>
      <h3>{{ movie.title }}</h3>
      <p>{{ movie.year }}</p>

      <div class="actions">
        <RouterLink class="details-link" :to="`/movies/${movie.id}`">View Details</RouterLink>
        <a
          v-if="movie.videoUrl"
          class="watch-link"
          :href="movie.videoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch Video
        </a>
        <button type="button" @click="$emit('edit', movie)">Edit</button>
        <button type="button" class="delete-button" @click="$emit('delete', movie.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  overflow: hidden;
  border: 1px solid #263247;
  border-radius: 8px;
  background: #121a29;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.26);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: #f59e0b;
  box-shadow: 0 22px 48px rgba(0, 0, 0, 0.36);
}

.poster {
  display: block;
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  background: #263247;
}

.content {
  display: grid;
  gap: 8px;
  padding: 16px;
}

.genre {
  width: fit-content;
  border: 1px solid #3b4860;
  border-radius: 999px;
  padding: 4px 9px;
  color: #fbbf24;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0;
}

h3 {
  margin: 0;
  color: #f8fafc;
  font-size: 1.15rem;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

p {
  margin: 0;
  color: #a8b3c7;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 6px;
}

.details-link,
.watch-link,
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  border: 0;
  border-radius: 6px;
  padding: 0 10px;
  font: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.2;
  cursor: pointer;
  text-align: center;
}

.details-link {
  grid-column: 1 / -1;
  background: #f59e0b;
  color: #111827;
  text-decoration: none;
}

.details-link:hover {
  background: #fbbf24;
}

.watch-link {
  grid-column: 1 / -1;
  background: #0ea5e9;
  color: #06111f;
  text-decoration: none;
}

.watch-link:hover {
  background: #38bdf8;
}

button {
  background: #263247;
  color: #f8fafc;
}

button:hover {
  background: #334155;
}

.delete-button {
  background: #7f1d1d;
}

.delete-button:hover {
  background: #991b1b;
}

@media (max-width: 420px) {
  .content {
    padding: 14px;
  }

  .actions {
    grid-template-columns: 1fr;
  }

  .details-link,
  .watch-link {
    grid-column: auto;
  }
}
</style>
