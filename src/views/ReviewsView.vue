<script setup>
defineProps({
  id: String,
})
</script>

<template>
  <main class="reviews-page">
    <section class="heading">
      <p>Reviews</p>
      <h1>Audience thoughts</h1>
    </section>

    <ul>
      <li>Excellent movie</li>
      <li>Worth watching</li>
      <li>10/10</li>
    </ul>

    <RouterLink class="back-link" :to="`/movies/${id}`">Back to Movie</RouterLink>
  </main>
</template>

<style scoped>
.reviews-page {
  width: min(760px, calc(100% - 24px));
  margin: 0 auto;
  padding: clamp(24px, 5vw, 34px) 0 54px;
}

.heading {
  margin-bottom: 22px;
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

ul {
  display: grid;
  gap: 12px;
  padding: 0;
  list-style: none;
}

li {
  border: 1px solid #263247;
  border-radius: 8px;
  padding: 16px;
  background: #121a29;
  color: #dbe4f0;
}

.back-link {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  margin-top: 18px;
  border-radius: 6px;
  padding: 0 16px;
  background: #f59e0b;
  color: #111827;
  font-weight: 700;
  text-decoration: none;
}

@media (max-width: 480px) {
  .reviews-page {
    width: min(100% - 20px, 760px);
    padding-bottom: 40px;
  }

  .back-link {
    justify-content: center;
    width: 100%;
  }
}
</style>
