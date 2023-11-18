import { useLocalStorage } from "../Hooks/useLocalStorage"

export const FilmSave = (id) => {
    const {value: filmSave, setValue: setFilmSave} = useLocalStorage(`filmSave_${id}`, false)
    
    const handleSave = () => {
        setFilmSave(!filmSave)
    }
    
  return {filmSave, handleSave}
}
