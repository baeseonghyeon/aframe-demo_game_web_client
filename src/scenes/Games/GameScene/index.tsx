import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './GameScene.module.scss';
import cb from 'classnames/bind';
import Indicator from '../../../components/Indicator';
import Modal from '../../../components/Modal';
import LeaderBoard from './LeaderBoard';

import * as LibStore from '../../../lib/Storage';

const cn = cb.bind(styles);

export interface GameIdMatchParams {
  game_id: string;
}

const GameScene = ({ match }: RouteComponentProps<GameIdMatchParams>) => {
  const { game_id } = match.params;
  const [loading, setLoading] = useState<boolean>(true);

  const nickname = LibStore.get();

  // useEffect(() => {
  //   if (!loading) {
  //     document.getElementById('tsparticles')?.remove();
  //   }
  // }, [loading]);

  const aframeLoad = () => {
    setLoading(false);
  };

  const gameEnd = () => {
    alert('Game Ended!');
  };

  window.addEventListener('message', (e) => {
    // 전달 된 데이터
    console.log(e.data.functionName);

    // 부모창의 함수 실행
    if (e.data.functionName === 'gameEnd') {
      setVisibility(true);
      if (e.data.userIdx) {
        alert(e.data.userIdx);
      }
    }
  });

  const [visibility, setVisibility] = useState<boolean>(false);

  useEffect(() => {
    // const timeout = setTimeout(() => {
    //   setVisibility(true);
    // }, 5000);
    // return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <iframe
        // src={`https://aframe.io/examples/showcase/anime-UI?user=${nickname}`}
        src={`https://0.0.0.0:8888/Normal?user=${nickname}`}
        className={cn('ifram__container')}
        onLoad={aframeLoad}
      />
      {loading && <Indicator />}

      <Modal isVisible={visibility}>
        <LeaderBoard id={game_id} />
      </Modal>
    </>
  );
};

export default GameScene;