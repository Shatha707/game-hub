import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";
import LoginForm from "./components/login"; // Import your LoginForm component here
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import { Platform } from "./hooks/useGames";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {!isLoggedIn && <LoginForm onLogin={handleLogin} />}{" "}
      {/* Show login form if not logged in */}
      {isLoggedIn && (
        <Grid
          templateAreas={{
            base: `"nav" "main"`,
            lg: `"nav nav" "aside main"`,
          }}
          templateColumns={{
            base: "1fr",
            lg: "200px 1fr",
          }}
        >
          <GridItem area="nav">
            <NavBar
              onSearch={(searchText) =>
                setGameQuery({ ...gameQuery, searchText })
              }
            />
          </GridItem>
          <Show above="lg">
            <GridItem area="aside" paddingX="5px">
              <GenreList
                selectedGenre={gameQuery.genre}
                onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
              />
            </GridItem>
          </Show>
          <GridItem area="main">
            <Box paddingLeft={9}>
              <GameHeading gameQuery={gameQuery} />
              <Flex>
                <Box marginRight={5}>
                  <PlatformSelector
                    selectedPlatform={gameQuery.platform}
                    onSelectPlatform={(platform) =>
                      setGameQuery({ ...gameQuery, platform })
                    }
                  />
                </Box>
                <SortSelector
                  sortOrder={gameQuery.sortOrder}
                  onSelectSortOrder={(sortOrder) =>
                    setGameQuery({ ...gameQuery, sortOrder })
                  }
                />
              </Flex>
            </Box>
            <GameGrid gameQuery={gameQuery} />
          </GridItem>
        </Grid>
      )}
    </>
  );
}

export default App;
