import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ErrorPage from './pages/ErrorPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { MainContextProvider } from './context/MainContext'
import {Toaster} from 'react-hot-toast'
import ProfilePage from './pages/ProfilePage'
import ProtectedLayout from './layouts/ProtectedLayout'
import NewBlogPage from './pages/New Blog Page'
import AllBlogsPage from './pages/All Blogs Page'
import UpdateBlogPage from './pages/Update Blog Page'
import ViewBlogPage from './pages/ViewBlogPage'
import AboutPage from './pages/AboutPage'



function App() {
  const location=useLocation();
  // Hide navbar and footer on error page
  const hideLayout = !(
  location.pathname === '/' ||
  location.pathname === '/login' ||
  location.pathname === '/register' ||
  location.pathname === '/profile' ||
  location.pathname === '/new-blog' ||
  location.pathname === '/all-blogs' ||
  location.pathname === '/about' ||
  location.pathname.startsWith('/blog/update/') ||
  location.pathname.startsWith('/blog/')
)

  return (
    <>
      <MainContextProvider>
        <Toaster toastOptions={{
            success: {
              iconTheme: {
                primary:'#fd366e' // changes only the background behind tick to custom color from default green
              },
            },
          }} 
        />
        {!hideLayout && <Navbar/>}
        <Routes>
          <Route path='/' Component={HomePage}/>
          <Route path='/login' Component={LoginPage}/>
          <Route path='/register' Component={RegisterPage}/>
          <Route path='/blog/:slug' Component={ViewBlogPage}/>
          <Route path='/about' Component={AboutPage}/>
          <Route Component={ProtectedLayout}>
              {/* these are protected routes only logged in users can access */}
             <Route path='/profile' Component={ProfilePage}/>
             <Route path='/new-blog' Component={NewBlogPage}/>
             <Route path='/all-blogs' Component={AllBlogsPage}/>
             <Route path='/blog/update/:id' Component={UpdateBlogPage}/>
          </Route>
          <Route path='*' Component={ErrorPage}/>
        </Routes>
        {!hideLayout &&<Footer/>}
      </MainContextProvider>
    </>
  )
}

export default App
