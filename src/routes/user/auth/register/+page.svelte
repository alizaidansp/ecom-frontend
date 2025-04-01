<script>

    import { register } from '../../../../services/api/auth';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { getToken } from '../../../../services/api/store';

    onMount(() => {
      const token = getToken();
      if (token) {
        goto('/user/dashboard'); // Redirect authenticated users
      }
    });


        let email = '';
        let password = '';
        let username = '';
      
        async function handleRegister() {
      try {
        const response = await register(username,email, password);
        console.log('Login Successful:', response);
        goto('/user/dashboard'); // Redirect to dashboard on success
      } catch (err) {
        console.error('Login Error:', err);
        // Ensure 'err' is treated as an object with a 'message' property
        // error = err instanceof Error ? err.message : 'Login failed. Please try again.';
      }
    }
      </script>
      
      <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div class="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 max-w-sm w-full shadow-lg">
          <h1 class="text-3xl font-semibold text-white mb-6 text-center">We are happy you want to join us</h1>
      
          <form on:submit|preventDefault={handleRegister} class="space-y-4">
           
             <!-- Username Input -->
             <div>
              <label for="email" class="block text-sm text-white mb-1">Username</label>
              <input
                id="username"
                type="username"
                bind:value={username}
                placeholder="Enter your username"
                class="w-full p-3 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
             <!-- Email Input -->
             <div>
              <label for="username" class="block text-sm text-white mb-1">Email</label>
              <input
                id="email"
                type="email"
                bind:value={email}
                placeholder="Enter your email"
                class="w-full p-3 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                class="w-full p-3 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
      
            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full p-3 mt-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition duration-300"
            >
              Register!
            </button>
          </form>
      
          <!-- Sign-Up Link -->
          <p class="text-sm text-gray-300 mt-6 text-center">
           Already have an account? <a href="/user/auth/login" class="text-blue-400 hover:underline">Login</a>
          </p>
        </div>
      </div>
      