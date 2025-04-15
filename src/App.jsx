import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Hero from './pages/HeroPage';
import ChatPage from './pages/ChatPage';
import ChoresPage from './pages/ChoresPage';
import FinancePage from './pages/FinancePage';
import GroceriesPage from './pages/GroceriesPage';
import SettingsPage from './pages/SettingsPage';
import FlatmatesPage from './pages/FlatmatesPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Define nested routes here */}
          <Route path="/" element={<Hero />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chores" element={<ChoresPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/flatmates" element={<FlatmatesPage />} />
          <Route path="/groceries" element={<GroceriesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Add other routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
