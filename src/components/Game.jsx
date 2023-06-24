import {Setup} from './Setup'
import { Grid } from './Grid';
import { Scores } from './Scores';
import { Search } from './Search';
import { Testing } from './Testing';
import { Finish } from './Finish';
import { useSelector } from 'react-redux'

export const Game = () => {
    let currentScreen = useSelector((state) => state.game.currentScreen);
    return (
        <>
          {currentScreen === 'setup' ? (
            <Setup />
          ) : (
            <>
              {currentScreen === 'search' ? (
                <Search />
              ) : (
                <>
                  <Scores />
                  {currentScreen === 'grid' ? (
                    <Grid />
                  ) : (
                    <>
                      {currentScreen === 'finish' ? (
                        <Finish />
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      );
}