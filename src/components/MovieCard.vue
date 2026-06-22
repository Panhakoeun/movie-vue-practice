<script setup>
defineProps({
  movie: Object,
})

defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="card">
    <RouterLink class="poster-link" :to="`/movies/${movie.id}`">
      <img class="poster" :src="movie.image" :alt="movie.title" />
    </RouterLink>

    <div class="content">
      <div class="meta">
        <span class="genre">{{ movie.genre }}</span>
        <span class="year">{{ movie.year }}</span>
      </div>

      <h3>{{ movie.title }}</h3>

      <div class="actions">
        <RouterLink class="details-link" :to="`/movies/${movie.id}`">Details</RouterLink>
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
  height: 100%;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  box-shadow: 0 16px 42px rgba(15, 23, 42, 0.08);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(225, 29, 72, 0.36);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.14);
}

.poster-link {
  display: block;
  background: var(--surface-soft);
}

.poster {
  display: block;
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  background: var(--surface-soft);
}

.content {
  display: grid;
  gap: 10px;
  padding: 16px;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.genre {
  min-width: 0;
  overflow: hidden;
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 900;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
  letter-spacing: 0;
}

h3 {
  margin: 0;
  min-height: 2.6em;
  color: var(--ink);
  font-size: 1.15rem;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

.year {
  flex: 0 0 auto;
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 800;
}

p {
  margin: 0;
  color: var(--muted);
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
  background: var(--ink);
  color: #ffffff;
  text-decoration: none;
}

.details-link:hover {
  background: #263244;
}

.watch-link {
  grid-column: 1 / -1;
  background: var(--accent);
  color: #ffffff;
  text-decoration: none;
}

.watch-link:hover {
  background: var(--accent-dark);
}

button {
  background: var(--surface-soft);
  color: var(--ink);
}

button:hover {
  background: #dde6ef;
}

.delete-button {
  background: #fff1f3;
  color: var(--accent-dark);
}

.delete-button:hover {
  background: #ffe4e9;
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
