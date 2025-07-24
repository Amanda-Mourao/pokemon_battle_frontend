import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { useNavigate } from "react-router-dom";

export default function BattlePage() {
  const [favorites, setFavorites] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [wildPokemon, setWildPokemon] = useState(null);
  const [result, setResult] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [width, height] = useWindowSize();
  const navigate = useNavigate();

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(Array.isArray(favs) ? favs : []);
  }, []);

  useEffect(() => {
    generateWildPokemon();
  }, []);

  const generateWildPokemon = async () => {
    const randomId = Math.floor(Math.random() * 150) + 1;
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const wild = res.data;
      setWildPokemon({
        name: wild.name,
        image:
          wild.sprites?.other?.dream_world?.front_default ||
          wild.sprites?.front_default,
        attack: wild.stats[1].base_stat,
        defense: wild.stats[2].base_stat,
        hp: wild.stats[0].base_stat,
      });
    } catch (err) {
      console.error("Error loading opponent:", err);
    }
  };

  function startBattle() {
    if (!selectedPokemon || !wildPokemon) {
      setResult("Choose your Pokémon and your Opponent");
      return;
    }

    const userPower =
      selectedPokemon.attack + selectedPokemon.defense + selectedPokemon.hp;
    const wildPower = wildPokemon.attack + wildPokemon.defense + wildPokemon.hp;

    if (userPower > wildPower) {
      setResult("You won the Battle!");
      setScore(userPower);
      setShowConfetti(true);
    } else if (userPower < wildPower) {
      setResult("You lost the Battle!");
      setScore(userPower);
    } else {
      setResult("It's a draw!");
      setScore(userPower);
    }
  }

  function resetGame() {
    setSelectedPokemon(null);
    setWildPokemon(null);
    setResult("");
    setShowConfetti(false);
    setScore(0);
    setUsername("");
    setNameSubmitted(false);
    generateWildPokemon();
  }

  async function submitScore() {
    if (!username) return;

    try {
      await axios.post(
        "https://pokemon-battle-backend-z30t.onrender.com/leaderboard",
        {
          username,
          score,
        }
      );
      setNameSubmitted(true);
      navigate("/leaderboard");
    } catch (err) {
      console.error("Error", err);
    }
  }

  function PokemonCard({ pokemon, onClick, selected, label }) {
    return (
      <div
        className={`cursor-pointer rounded-xl shadow p-3 flex flex-col items-center border transition-all duration-200 ${
          selected
            ? "border-lime-500 bg-lime-100"
            : "border-gray-200 bg-white hover:shadow-md"
        }`}
        onClick={onClick}
        style={{ minWidth: 140, maxWidth: 180 }}
        title={pokemon.name}
      >
        <div className="text-sm text-green-900 mb-1">{label}</div>
        <div className="font-bold capitalize mb-1">{pokemon.name}</div>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-20 h-20 object-contain mb-2"
        />
        <p className="text-xs text-green-900 font-semibold text-center ">
          HP: {pokemon.hp} | ATK: {pokemon.attack} | DEF: {pokemon.defense}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f6f8] min-h-screen py-10 text-green-900 relative">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={300}
        />
      )}

      <h2 className="text-4xl font-bold mb-8 text-center text-green-900">
        Pokémon Battle!
      </h2>

      <div className="max-w-6xl mx-auto text-green-900 bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center flex-1">
            <h3 className="font-bold mb-2 text-lg text-green-900">
              Choose From Your Roster
            </h3>
            <div className="flex flex-wrap gap-4  justify-center">
              {favorites.map((p) => (
                <PokemonCard
                  key={p.name}
                  pokemon={{
                    ...p,
                    attack: p.stats[1]?.base_stat,
                    defense: p.stats[2]?.base_stat,
                    hp: p.stats[0]?.base_stat,
                  }}
                  onClick={() =>
                    setSelectedPokemon({
                      ...p,
                      attack: p.stats[1]?.base_stat,
                      defense: p.stats[2]?.base_stat,
                      hp: p.stats[0]?.base_stat,
                    })
                  }
                  selected={selectedPokemon?.name === p.name}
                  label="You"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center min-w-[220px] mx-4">
            <div className="flex items-center justify-center my-4">
              {selectedPokemon ? (
                <PokemonCard pokemon={selectedPokemon} selected label="You" />
              ) : (
                <div className="rounded-full bg-gray-200 w-24 h-24 flex items-center justify-center mb-2 text-2xl text-green-900">
                  ?
                </div>
              )}
              <div className="mx-4 font-bold text-2xl text-green-900">VS</div>
              {wildPokemon ? (
                <PokemonCard pokemon={wildPokemon} label="Computer" />
              ) : (
                <div className="rounded-full bg-gray-200 w-24 h-24 flex items-center justify-center mb-2 text-2xl text-green-900">
                  ?
                </div>
              )}
            </div>

            <button
              className="bg-green-900 hover:bg-green-700 text-white font-bold px-6 py-2 rounded shadow transition duration-200"
              onClick={startBattle}
              disabled={!selectedPokemon || !wildPokemon}
            >
              Fight!
            </button>

            {result && (
              <div className="mt-4 text-center text-lg font-semibold text-green-900">
                {result}
              </div>
            )}

            {result && (
              <div className="mt-4 text-center">
                <p className="text-sm text-green-900 font-semibold mb-2">
                  Score: {score}
                </p>
                {!nameSubmitted ? (
                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Name"
                      className="border-1 border-green-800 px-4 py-2 font-semibold rounded text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-green-800"
                    />

                    <button
                      className="bg-green-900 hover:bg-green-700 text-white font-bold px-6 py-2 rounded shadow transition duration-200"
                      onClick={submitScore}
                      disabled={!username.trim()}
                    >
                      Save Score
                    </button>
                  </div>
                ) : (
                  <p className="bg-green-900 hover:bg-green-700 text-white font-bold px-6 py-2 rounded shadow transition duration-200">
                    Score saved
                  </p>
                )}
              </div>
            )}

            {result && (
              <button
                className="bg-green-900 hover:bg-green-700 text-white font-bold p-2 mt-3 rounded shadow transition duration-200"
                onClick={resetGame}
              >
                New Battle
              </button>
            )}
          </div>

          <div className="flex flex-col items-center flex-1">
            <h3 className="font-bold mb-2 text-lg text-green-900">Computer</h3>
            {wildPokemon ? (
              <PokemonCard pokemon={wildPokemon} label="Opponent" />
            ) : (
              <p className="text-green-900 font-semibold">
                Loading Opponent...
              </p>
            )}
            <button
              onClick={generateWildPokemon}
              className="bg-green-900 hover:bg-green-700 text-white font-bold p-2 mt-3 rounded shadow transition duration-200"
            >
              Get New Opponent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
