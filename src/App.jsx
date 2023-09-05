import { Route, Routes, useNavigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Feed from './pages/Feed';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';

function App() {
  const navigate = useNavigate();

  // kullanıcnın oturumunu izleme
  useEffect(() => {
    // kullanıcı varsa anasayfaya
    // yoksa logine yönlendirir
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home');
      } else {
        navigate('/');
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Feed />} />
    </Routes>
  );
}

export default App;