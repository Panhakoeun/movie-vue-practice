<template>
  <main class="not-found">
    <h1>404</h1>
    <p>Page Not Found</p>

    <RouterLink to="/">Go Home</RouterLink>
  </main>
</template>

<style scoped>
.not-found {
  width: min(760px, calc(100% - 24px));
  margin: 0 auto;
  padding: clamp(34px, 8vw, 72px) 0;
  text-align: center;
}

h1 {
  margin: 0;
  color: #f8fafc;
  font-size: clamp(4rem, 18vw, 8rem);
  line-height: 1;
}

p {
  margin: 12px 0 24px;
  color: #cbd5e1;
  font-size: 1.15rem;
}

a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  border-radius: 6px;
  padding: 0 16px;
  background: #f59e0b;
  color: #111827;
  font-weight: 700;
  text-decoration: none;
}

@media (max-width: 480px) {
  .not-found {
    width: min(100% - 20px, 760px);
  }

  a {
    width: 100%;
  }
}
</style>
