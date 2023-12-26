import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseImgUrl, options } from '../utils/contants';
import axios from 'axios';
import Loading from '../components/Loading';
import Badges from './../components/Badges';

const DetailPage = () => {
  const [movie, setMovie] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    axios
      .get(`movie/${movieId}?language=tr`, options)
      .then((res) => setMovie(res.data));
  }, []);

  console.log(movie);
  return (
    <div className="movide-detail row p-4">
      {!movie ? (
        <Loading />
      ) : (
        <>
          <div className="col-md-4 d-flex justify-content-center mb-5  ">
            <div
              className="position-relative"
              style={{ maxWidth: '400px' }}
            >
              <img
                className="rounded shadow w-100"
                src={baseImgUrl.concat(movie.poster_path)}
              />
              <p
                style={{ right: '30px' }}
                className="position-absolute bg-warning rounded fs-5 p-1 shadow bottom-0 "
              >
                {movie.vote_average.toFixed(1)}
              </p>
            </div>
          </div>
          <div className="col-md-8 ">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>

            <div className="row">
              <div>
                <Badges
                  title="Kategoriler"
                  list={movie.genres}
                  color="bg-primary"
                />
                <Badges
                  title="Diller"
                  list={movie.spoken_languages}
                  color="bg-danger"
                />
                <Badges
                  title="Yapımcı Şirketler"
                  list={movie.production_companies}
                  color="bg-success"
                />
              </div>

              <div>
                <p>Maliyet: {movie.budget}</p>
                <p>Hasılat: {movie.revenue}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;