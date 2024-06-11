import Image from "next/image";

export default function Home() {
  return (
    <main className="home-container flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Home</h1>
      <div className="welcome-box bg-white p-8 rounded shadow-lg text-center max-w-md">
        <p className="text-xl mb-4">
          Welcome to CarApp, the platform that allows you to share pictures of cars you spotted and consult other cars spotted by others.
        </p>
        <p className="text-lg">
          Please log in or create an account to add new cars.
        </p>
      </div>
      <footer className="credits text-center mt-4">
        <p>&copy; ELophem</p>
      </footer>
    </main>
  );
}
