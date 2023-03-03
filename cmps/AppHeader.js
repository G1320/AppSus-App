export default {
  template: `
        <header class="app-header">
            <h1>AppSus</h1>
            <nav>
            <RouterLink to="/">Home</RouterLink> |
            <RouterLink to="/email/list">Email</RouterLink> |
            <RouterLink to="/note">Notes</RouterLink> |
            <RouterLink to="/about">About</RouterLink> |
                <!-- <router-link to="/">Home</router-link> | 
                <router-link to="/about">About</router-link> -->
            </nav>
        </header>
    `,
};
