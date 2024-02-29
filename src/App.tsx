import './App.css';
import { store } from './store';
import { Provider } from 'react-redux';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import CustomSnackbar from './components/CustomSnackbar'

function App() {
 
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
       <CustomSnackbar vertical="top" horizontal="center"/>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
