import { Route, Switch } from 'react-router-dom';
import './App.css';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import Layout from './layout/Layout';
import LoadingSpinner from './UI/LoadingSpinner';
import AlbumDetail from './components/Albums/AlbumDetail';

const Genres    = React.lazy( () => import('./pages/Genres'));
const Artists   = React.lazy( () => import('./pages/Artists'));
const Albums    = React.lazy( () => import('./pages/Albums'));
const Tracks    = React.lazy( () => import("./pages/Tracks"));

const FIREBASE_URL = 'https://react-http-1eb72-default-rtdb.firebaseio.com/music_library.json';

function App() {

  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);

  let GENRE_ID = 0;
  let ARTIST_ID = 0;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sortGenreArtist = ( a, b ) => {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }

  const fieldSorter = (fields) => (a, b) => fields.map(o => {
    let dir = 1;
    if (o[0] === '-') { dir = -1; o=o.substring(1); }
    return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
  }).reduce((p, n) => p ? p : n, 0);

  const fetchLibrary = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(FIREBASE_URL);
      
      if(!response.ok) {
          throw new Error('Something went wrong!')
      }

      const music_library = await response.json();

      const loadedGenres = [];
      const loadedArtists = [];
      const loadedAlbums = [];

      for(const album in music_library) {
        if( ! loadedGenres.some( genre => genre.name === music_library[album].genre ) ) {
          loadedGenres.push({
              key : "g_" + GENRE_ID,
              name: music_library[album].genre
          });
          GENRE_ID++;
        }

        if( ! loadedArtists.some( artist => artist.name === music_library[album].artist ) ){
          loadedArtists.push({
              key : "a_" + ARTIST_ID,
              name: music_library[album].artist
          });
          ARTIST_ID++;
        }

        loadedAlbums.push({
          key    : album,
          artist : music_library[album].artist,
          genre  : music_library[album].genre,
          title  : music_library[album].title,
          year   : music_library[album].year,
          cover  : music_library[album].cover
        });
      }

      // ORDENAR

      loadedGenres.sort(sortGenreArtist);
      loadedArtists.sort(sortGenreArtist);

      const sortedAlbums = loadedAlbums.sort(fieldSorter(['genre', 'artist', 'year', 'title']));
    

      setGenres(loadedGenres);
      setArtists(loadedArtists);
      setAlbums(sortedAlbums);
        
    } catch (error) {
        setError(error.message);
    }

    setIsLoading(false);

  }, [ARTIST_ID, GENRE_ID]);

  useEffect(() => {
    fetchLibrary();
  }, [fetchLibrary]);

  let content = <p>Found no genres!</p>;
  
  
  const welcomeParagraph = (
    <div className='ParagrafoBonito'>
      <h1>Hi !</h1>
      <h3>Welcome to my music library.</h3>
      <p>
        Here you can access from my music data from 3 categories: Genres, Artists and Albums.<br/>
        A search-engine feature will be available soon. I hope you enjoy this project.
      </p>
      <p>
        If you have any qestions, send me an email to:<br/>
        <i>eduardopalmeida at gmail dot com</i>
      </p>
    </div>

  );

  if(genres.length > 0) {
      // notificação a dizer que CARREGOU
      // console.log("CARREGOU!");
      content = welcomeParagraph;
  }

  if(error) {
      content = welcomeParagraph;
  }

  if(isLoading) {
      content = <p>Loading...</p>;
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={
            <div className='centered'>
              <LoadingSpinner />
            </div>
          } >
          <Switch>
            <Route path='/' exact>
              {content}
            </Route>
            <Route path='/genres' exact >
              <Genres genres={genres} />
            </Route>
            <Route path='/genres/:genreId' >
              <Albums albums={albums} albumSource={1} />
            </Route>
            <Route path='/artists' exact>
              <Artists artists={artists}/>
            </Route>
            <Route path='/artists/:artistId' >
              <Albums albums={albums} albumSource={2} />
            </Route>
            <Route path='/albums' exact>
              <Albums albums={albums} artistAlbums={3}/>
            </Route>
            <Route path='/albums/:albumId'>
              <AlbumDetail />
            </Route>
            <Route path='/tracks' >
              <Tracks/>
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
