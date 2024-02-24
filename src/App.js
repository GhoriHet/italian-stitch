
import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import { Provider } from 'react-redux';
import { store } from './user/redux/store';
import { SnackbarProvider } from 'notistack'
import Alert from './user/components/Alert';

function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Alert />
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
        </SnackbarProvider>
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
