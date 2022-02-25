import MainNav from './src/navigation/mainNav';
import { CurrentUserContextProvider } from './src/components/context/context'

export default function App() {
  return (
    <CurrentUserContextProvider>
      <MainNav/>
    </CurrentUserContextProvider>
  );
}
