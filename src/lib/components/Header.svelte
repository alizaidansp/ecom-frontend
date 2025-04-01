<script>
    import { createEventDispatcher } from 'svelte';
    import { Search, LogOut } from 'lucide-svelte';
    import { goto } from '$app/navigation';
    // import { clearToken } from '../../services/api/store';
  
    export let title = "Homepage";
    const dispatch = createEventDispatcher();
  
    function handleLogout() {
    //   clearToken();
    //   goto('/auth/login');
    }
  
    function handleInput(event) {
      // alert(event.target.value)
    //   dispatch('search', event.target.value);
    }
  </script>
  
  <header class="flex justify-between items-center mb-8">
    <h2 class="text-2xl font-bold">{title}</h2>
    
  </header>