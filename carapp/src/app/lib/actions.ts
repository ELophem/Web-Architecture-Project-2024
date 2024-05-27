import axios from 'axios';

export async function signIn(credentials: { username: string, password: string }, updateAuthState: (loggedIn: boolean) => void) {
  try {
    const response = await axios.post('http://localhost:4000/api/users/login', credentials);
    updateAuthState(true); // Update authentication state
    return response.data;
  } catch (error) {
    let errorMessage: string = "Failed to do something exceptional"; // Default error message
    if (error instanceof Error) {
      errorMessage = error.message; // Use error message if available
    }
    console.log(errorMessage);
  }  
}
