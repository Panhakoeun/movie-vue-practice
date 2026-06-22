<template>
  <div class="app-shell">
    <nav class="top-nav">
      <RouterLink class="brand" to="/">
        <span class="brand-mark">M</span>
        <span>Movie Shelf</span>
      </RouterLink>

      <div class="nav-links">
        <RouterLink to="/">Library</RouterLink>
        <RouterLink to="/search">Search</RouterLink>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

:root {
  --bg: #f5f7fb;
  --surface: #ffffff;
  --surface-soft: #eef3f8;
  --text: #111827;
  --muted: #667085;
  --line: #d9e1ea;
  --accent: #e11d48;
  --accent-dark: #be123c;
  --accent-soft: #fff1f3;
  --ink: #0f172a;
  --shadow: 0 20px 55px rgba(15, 23, 42, 0.1);
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background:
    linear-gradient(180deg, rgba(255, 241, 243, 0.72) 0, rgba(245, 247, 251, 0) 330px),
    var(--bg);
  color: var(--text);
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

button,
input,
select,
textarea {
  font: inherit;
}

img {
  max-width: 100%;
}

a {
  color: inherit;
}

::selection {
  background: rgba(225, 29, 72, 0.18);
}

.app-shell {
  min-height: 100vh;
}

.top-nav {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 14px max(18px, calc((100% - 1180px) / 2));
  border-bottom: 1px solid rgba(217, 225, 234, 0.8);
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(18px);
}

.brand,
.nav-links a {
  text-decoration: none;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--ink);
  font-weight: 900;
}

.brand-mark {
  display: inline-grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 8px;
  background: var(--ink);
  color: #ffffff;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-links a {
  border-radius: 6px;
  padding: 9px 13px;
  color: var(--muted);
  font-weight: 800;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  background: var(--accent-soft);
  color: var(--accent-dark);
}

@media (max-width: 480px) {
  .top-nav {
    align-items: stretch;
    flex-direction: column;
    gap: 12px;
    padding: 12px 14px;
  }

  .nav-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .nav-links a {
    flex: 1;
    text-align: center;
  }
}
</style>
