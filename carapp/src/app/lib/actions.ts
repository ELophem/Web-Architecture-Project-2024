import axios from 'axios';

export async function signIn(credentials: { username: string, password: string }, updateAuthState: (loggedIn: boolean) => void) {
  try {
    const response = await axios.post('http://localhost:4000/api/users/login', credentials);
    updateAuthState(true);
    return response.data;
  } catch (error) {
    let errorMessage: string = "Failed to do something exceptional"; 
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(errorMessage);
  }  
}
