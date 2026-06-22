<template>
  <div class="app-shell">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/search">Search</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background:
    radial-gradient(circle at 15% 10%, rgba(245, 158, 11, 0.16), transparent 30%),
    linear-gradient(135deg, #090e18 0%, #101827 52%, #151827 100%);
  color: #e5edf8;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

a {
  color: inherit;
}

.app-shell {
  min-height: 100vh;
}

nav {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 18px 16px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(9, 14, 24, 0.72);
  backdrop-filter: blur(14px);
}

nav a {
  border-radius: 6px;
  padding: 9px 12px;
  color: #cbd5e1;
  font-weight: 700;
  text-decoration: none;
}

nav a:hover,
nav a.router-link-active {
  background: #f59e0b;
  color: #111827;
}
</style>
