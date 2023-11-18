import { useLocalStorage } from "../Hooks/useLocalStorage";

export const FilmLike = (id) => {
  const {value: filmLike, setValue: setFilmLike} = useLocalStorage(`like_${id}`, false)

  const handleLike = () => {
    setFilmLike(!filmLike);
  };

  return { filmLike, handleLike };
};
