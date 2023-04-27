import {Setup} from './Setup'
import { Grid } from './Grid';
import { useSelector } from 'react-redux'

export const Game = () => {
    let currentScreen = useSelector((state) => state.game.currentScreen);
    return (
        <>
            {currentScreen == 'setup' ?
            <Setup/>
            :
            <>
                {currentScreen == 'grid' ? 
                <Grid/>
                : <></>
                }    
            </> 
            }
        </>
    )
}