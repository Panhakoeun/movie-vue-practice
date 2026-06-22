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
  padding: clamp(28px, 5vw, 52px) 0 58px;
}

.heading {
  margin-bottom: 22px;
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

ul {
  display: grid;
  gap: 12px;
  padding: 0;
  list-style: none;
}

li {
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 18px;
  background: #ffffff;
  color: #344054;
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
}

.back-link {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  margin-top: 18px;
  border-radius: 6px;
  padding: 0 16px;
  background: var(--ink);
  color: #ffffff;
  font-weight: 800;
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
