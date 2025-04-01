<script>
    import Header from '../../../lib/components/Header.svelte';
    import { onMount } from 'svelte';
    import { get_user } from '../../../services/api/user';

    import { Home, User, Mail, BadgeCheck } from 'lucide-svelte';

    let user = null; // Suppresses the error by assigning 'any' type

    /**
     * Generic API Request Helper
     * @param {string} endpoint - API endpoint (e.g., '/login')
     * @param {object} [options={}] - Fetch options (e.g., method, body)
     * @returns {Promise<any>} - The JSON response
     */

    let error = '';
  
    async function fetchUser() {
      try {
        const response = await get_user();
        user = response; // ✅ Use `response` directly
        console.log('Fetched user:', user);
      } catch (err) {
        error = 'Failed to load user information.';
        console.error('Error fetching user:', err);
      }
    }
  
    onMount(fetchUser);
  </script>
  
  <Header title="Dashboard" />
  
  <div class="text-center mt-20">
    {#if error}
      <p class="text-red-500">{error}</p>
    {:else if user}
      <h1 class="text-4xl font-bold mb-8">Welcome, {user.username}!</h1>
  
      <div class="max-w-md mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-8 shadow-lg">
        <h2 class="text-2xl text-white mb-6 flex items-center justify-center">
          <User class="w-6 h-6 mr-2 text-blue-400" /> User Information
        </h2>
  
        <div class="text-left space-y-4 text-gray-300">
          <p class="flex items-center">
            <BadgeCheck class="w-5 h-5 mr-3 text-green-400" />
            <strong>ID:</strong> {user.id}
          </p>
  
          <p class="flex items-center">
            <User class="w-5 h-5 mr-3 text-blue-400" />
            <strong>Username:</strong> {user.username}
          </p>
  
          <p class="flex items-center">
            <Mail class="w-5 h-5 mr-3 text-yellow-400" />
            <strong>Email:</strong> {user.email}
          </p>
  
          <p class="flex items-center">
            <Home class="w-5 h-5 mr-3 text-purple-400" />
            <strong>Status:</strong> {user.status}
          </p>
        </div>
      </div>
    {:else}
      <p class="text-gray-400">Loading user information...</p>
    {/if}
  </div>