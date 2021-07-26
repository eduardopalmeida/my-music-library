import { Route, Switch } from 'react-router-dom';
import './App.css';
import React, { Suspense, useEffect } from 'react';
import Layout from './layout/Layout';
import LoadingSpinner from './UI/LoadingSpinner';
import AlbumDetail from './components/Albums/AlbumDetail';
import AddGenre from './components/Genres/AddGenre';
import AddArtist from './components/Artists/AddArtist';
import AddAlbum from './components/Albums/AddAlbum';
import { useDispatch } from 'react-redux';
import { fetchGenreArtistSet } from './store/data-actions';
import NotFound from './pages/NotFound';

const Genres    = React.lazy( () => import('./pages/Genres'));
const Artists   = React.lazy( () => import('./pages/Artists'));
const Albums    = React.lazy( () => import('./pages/Albums'));
const Tracks    = React.lazy( () => import("./pages/Tracks"));

function App() {

  const welcomeParagraph = (
    <div className='ParagrafoBonito'>
      <h1>Hi !</h1>
      <h3>Welcome to my music library.</h3>
      <p>
        Here you can access from my music data from 3 categories: Genres, Artists and Albums.<br/>
        A search-engine feature will be available soon. I hope you enjoy this project.
      </p>
      <p>
        If you have any questions, send me an email to:<br/>
        <i>eduardopalmeida at gmail dot com</i>
      </p>
    </div>

  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenreArtistSet('genres'));
    dispatch(fetchGenreArtistSet('artists'));
  }, [dispatch]);


  return (
    <div>
      <Layout>
        <Suspense fallback={
            <LoadingSpinner />
          } >
          <Switch>
            <Route path='/' exact>
              {welcomeParagraph}
            </Route>
            <Route path='/genres' exact >
              <Genres />
            </Route>
            <Route path='/genres/:genreId' >
              {/* <AlbumList albumSource={1} /> */}
              <Albums albumSource={1} />
            </Route>
            <Route path='/new-genre'>
              <AddGenre />
            </Route>
            <Route path='/artists' exact>
              <Artists />
            </Route>
            <Route path='/artists/:artistId' >
              <Albums albumSource={2} />
            </Route>
            <Route path='/new-artist'>
              <AddArtist />
            </Route>
            <Route path='/albums' exact>
              <Albums artistAlbums={3}/>
            </Route>
            <Route path='/albums/:albumId'>
              <AlbumDetail />
            </Route>
            <Route path='/new-album'>
              <AddAlbum />
            </Route>
            <Route path='/tracks' >
              <Tracks/>
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
