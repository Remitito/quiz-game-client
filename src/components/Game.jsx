import {Setup} from './Setup'
import { Grid } from './Grid';
import { Scores } from './Scores';
import { Search } from './Search';
import { Testing } from './Testing';
import { Finish } from './Finish';
import {Col, Row} from 'antd'
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
                <Row>
                  <Col span={4}>
                    <Scores />
                  </Col>
                  <Col span={20}>
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
                  </Col>
                </Row>
              )}
            </>
          )}
        </>
      );
}