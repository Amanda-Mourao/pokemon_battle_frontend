import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DotSpinner } from "ldrs/react";
import "ldrs/react/DotSpinner.css";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    const fetchPokemons = async () => {
      const fetchedPokemons = [];
      for (let i = 1; i <= 150; i++) {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${i}`
          );
          fetchedPokemons.push(response.data);
        } catch (error) {
          console.error(`Error ID ${i}:`, error);
        } finally {
          setLoading(false);
        }
      }
      setPokemons(fetchedPokemons);
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favorites.map((fav) => fav.id));
  }, []);

  const handleAddToFavorites = (pokemon) => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const alreadyExists = currentFavorites.some((fav) => fav.id === pokemon.id);

    if (!alreadyExists) {
      const newFavorites = [
        ...currentFavorites,
        {
          id: pokemon.id,
          name: pokemon.name,
          image:
            pokemon.sprites?.other?.dream_world?.front_default ||
            pokemon.sprites?.front_default,
          stats: pokemon.stats,
          types: pokemon.types,
          abilities: pokemon.abilities,
          height: pokemon.height,
          weight: pokemon.weight,
        },
      ];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setFavorites([...favorites, pokemon.id]);
    } else {
      alert(`${pokemon.name} is already in your favorites`);
    }
  };

  const handleRemoveFromFavorites = (pokemon) => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = currentFavorites.filter(
      (fav) => fav.id !== pokemon.id
    );

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(favorites.filter((id) => id !== pokemon.id));
  };

  const isFavorite = (pokemon) => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    return currentFavorites.some((fav) => fav.id === pokemon.id);
  };

  const filteredPokemons = searchTerm
    ? pokemons.filter(
        (el) =>
          el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          el.id.toString() === searchTerm
      )
    : pokemons;

  return (
    <div className="bg-[#f5f6f8] min-h-screen py-4 sm:py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-center text-green-900">
          Pokémon Battle Game
        </h1>
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-center text-green-900">
          Choose Your Pokémon!
        </h1>
        {loading ? (
          <div className="text-center mt-16">
            <DotSpinner size="100" speed="0.9" color="green" />
          </div>
        ) : (
          <div
            id="pokemon-container"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-4 lg:gap-6"
          >
            {filteredPokemons.length === 0 && (
              <p className="text-center col-span-full text-green-900 font-bold text-base sm:text-lg">
                No Pokémon Found For "{searchTerm}"!
              </p>
            )}
            {filteredPokemons.map((pokemon) => (
              <div
                key={pokemon.id}
                className="bg-white text-green-900 rounded-xl shadow p-3 sm:p-4 hover:shadow-lg transition-all duration-300 h-auto"
              >
                <div className="flex justify-between items-baseline">
                  <h2 className="text-xl sm:text-3xl font-bold capitalize mb-2">
                    {pokemon.name}
                  </h2>
                  <button
                    onClick={() =>
                      isFavorite(pokemon)
                        ? handleRemoveFromFavorites(pokemon)
                        : handleAddToFavorites(pokemon)
                    }
                    className={`text-3xl sm:text-4xl transition-colors duration-200 ${
                      isFavorite(pokemon)
                        ? "text-yellow-300 hover:text-green-900"
                        : "text-green-900 hover:text-yellow-300"
                    }`}
                  >
                    {isFavorite(pokemon) ? "★" : "☆"}
                  </button>
                </div>
                <Link to={`/pokemon/${pokemon.id}`}>
                  <img
                    src={pokemon.sprites?.other.dream_world.front_default}
                    alt={pokemon.name}
                    className="h-60 sm:h-80 w-full object-contain"
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
