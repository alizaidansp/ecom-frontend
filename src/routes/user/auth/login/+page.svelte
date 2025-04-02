<script>
  import { login } from '../../../../services/api/auth';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { getToken } from '../../../../services/api/store';
  import { Loader2 } from "lucide-svelte";

  let email = '';
  let password = '';
  let error = '';
  let loading = false;

  onMount(() => {
    const token = getToken();
    if (token) {
      goto('/user/dashboard'); // Redirect authenticated users
    }
  });

  async function handleLogin() {
    error = "";
    loading = true;
    
    try {
      const response = await login(email, password);
      console.log('Login Successful:', response);

      // ✅ Ensure response exists before accessing its properties
      if (response && response.message) {
        error = "Invalid Credentials!!"; // Display error message
        return; // Stop execution if login fails
      }

      goto('/user/dashboard'); // Redirect on success
    } catch (err) {
      console.error('Login Error:', err);
      error = err?.message || 'An unexpected error occurred. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
  <div class="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 max-w-sm w-full shadow-lg">
    <h1 class="text-3xl font-semibold text-white mb-6 text-center">
      Welcome back!
    </h1>

    <form on:submit|preventDefault={handleLogin} class="space-y-4">
      <!-- Error Message -->
      {#if error}
        <p class="text-red-500">{error}</p>
      {/if}

      <!-- Email Input -->
      <div>
        <label for="email" class="block text-sm text-white mb-1">Email</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          placeholder="Enter your email"
          class="w-full p-3 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          required
          disabled={loading}
        />
      </div>

      <!-- Password Input -->
      <div>
        <label for="password" class="block text-sm text-white mb-1">Password</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          placeholder="Enter your password"
          class="w-full p-3 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          required
          disabled={loading}
        />
      </div>

      <!-- Submit Button with Loader -->
      <button
        type="submit"
        class="w-full p-3 mt-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition duration-300 flex items-center justify-center disabled:opacity-50"
        disabled={loading}
      >
        {#if loading}
          <Loader2 class="animate-spin w-5 h-5 mr-2" />
          Logging in...
        {:else}
          Login!
        {/if}
      </button>
    </form>
  </div>
</div>
