import { Route, Switch } from 'react-router-dom';
import './App.css';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import Layout from './layout/Layout';
import LoadingSpinner from './UI/LoadingSpinner';
import AlbumDetail from './components/Albums/AlbumDetail';
import AddGenre from './components/Genres/AddGenre';
import AddArtist from './components/Artists/AddArtist';
import AddAlbum from './components/Albums/AddAlbum';

const Genres    = React.lazy( () => import('./pages/Genres'));
const Artists   = React.lazy( () => import('./pages/Artists'));
const Albums    = React.lazy( () => import('./pages/Albums'));
const Tracks    = React.lazy( () => import("./pages/Tracks"));

const FIREBASE_URL = 'https://edpalmeida-my-music-library-1-default-rtdb.firebaseio.com/';

function App() {

  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  
  const [selectionGenres, setSelectionGenres] = useState({});
  const [selectionArtists, setSelectionArtists] = useState({});
  
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
      
      // LOAD

      const responseGenres  = await fetch(FIREBASE_URL + "genres.json");
      const responseArtists = await fetch(FIREBASE_URL + 'artists.json');
      const responseAlbums  = await fetch(FIREBASE_URL + "albums.json");
      
      const loadedGenres  = await responseGenres.json();
      const loadedArtists = await responseArtists.json();
      const loadedAlbums  = await responseAlbums.json();

      if(!responseGenres.ok || !responseArtists.ok || !responseAlbums.ok)  { 
        throw new Error('Something went wrong!') 
      }

      // MAP

      const mapedGenres  = [] ;
      const mapedArtists = [];
      const mapedAlbums  = [];

      for(const keyGenres in loadedGenres) {
        const genreObj = {
          id : keyGenres,
          ...loadedGenres[keyGenres]
        }
        mapedGenres.push(genreObj)
      }

      for(const keyArtists in loadedArtists) {
        const artistObj = {
          id : keyArtists,
          ...loadedArtists[keyArtists]
        }
        mapedArtists.push(artistObj)
      }

      for(const keyAlbums in loadedAlbums) {
        const albumObj = {
          id : keyAlbums,
          ...loadedAlbums[keyAlbums]
        }
        mapedAlbums.push(albumObj)
      }
      
      // SORT

      mapedGenres.sort(sortGenreArtist);
      mapedArtists.sort(sortGenreArtist);
      mapedAlbums.sort(fieldSorter(['artist', 'year', 'title']));

      setGenres(mapedGenres);
      setArtists(mapedArtists);
      setAlbums(mapedAlbums);

      setSelectionGenres( mapedGenres.map( 
        genre => ({
          value : genre.id,
          label : genre.name
        }))
      );

      setSelectionArtists( mapedArtists.map( 
        artist => ({
            value : artist.id,
            label : artist.name
        })) 
    );

    } catch (error) {
      setError(error.message);
    }
    
    setIsLoading(false);
    
  }, []);
  
  useEffect(() => {
    fetchLibrary();
  }, [fetchLibrary]);
  
  
  let content = <p>Found no genres!</p>;
  
  // console.log("GENREROS :: ", genres);
  // console.log("ARTISTS :: ", artists);
  // console.log("ALBUMS :: ", albums);
  
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
      content = (
          <LoadingSpinner />
      )
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={
            <LoadingSpinner />
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
            <Route path='/new-genre'>
              <AddGenre />
            </Route>
            <Route path='/artists' exact>
              <Artists artists={artists} />
            </Route>
            <Route path='/artists/:artistId' >
              <Albums albums={albums} albumSource={2} />
            </Route>
            <Route path='/new-artist'>
              <AddArtist />
            </Route>
            <Route path='/albums' exact>
              <Albums albums={albums} artistAlbums={3}/>
            </Route>
            <Route path='/albums/:albumId'>
              <AlbumDetail albums={albums} />
            </Route>
            <Route path='/new-album'>
              <AddAlbum genres={selectionGenres} artists={selectionArtists} />
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
