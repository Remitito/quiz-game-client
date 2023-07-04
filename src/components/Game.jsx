import {Setup} from './Setup'
import { Grid } from './Grid';
import { Scores } from './Scores';
import { SearchOfficial } from './SearchOfficial';
import {SearchUser} from './SearchUser'
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
          {currentScreen === 'finish' ? (
            <Finish />
          ) : (
            <>
              {currentScreen === 'searchOfficial' ? (
                <>
                  <SearchOfficial />
                </>
              ) : (
                <>
                  {currentScreen === 'searchUser' ? (
                    <SearchUser />
                  ) : (
                    <Row>
                      <Col span={4}>
                        <Scores />
                      </Col>
                      <Col span={20}>
                        {currentScreen === 'grid' ? (
                          <Grid />
                        ) : (
                          <></>
                        )}
                      </Col>
                    </Row>
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