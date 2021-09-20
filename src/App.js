import React, { useState, useEffect } from 'react';
import SetTimer from './components/SetTimer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSync, faPause } from '@fortawesome/free-solid-svg-icons';
import sax from './assets/epicSax.mp3';

function App() {
  const [breakCount, setBreakCount] = useState(5);
  const [sessionCount, setSessionCount] = useState(3);
  const [clockCount, setClockCount] = useState(25 * 60);
  const [currentTimer, setCurrentTimer] = useState('Session');
  const [loop, setLoop] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  const saxSound = document.getElementById('beep');

  const convertTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return `${minutes}:${seconds}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      clearInterval(loop);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setLoop(
        setInterval(() => {
          if (clockCount <= 0) {
            setCurrentTimer(currentTimer === 'Session' ? 'Break' : 'Session');
            setClockCount(
              currentTimer === 'Session' ? breakCount * 60 : sessionCount * 60
            );
          } else {
            setClockCount((prevClockCount) => prevClockCount - 1);
          }
        }, 1000)
      );
    }
  };

  useEffect(() => {
    if (clockCount === 0) {
      setCurrentTimer(currentTimer === 'Session' ? 'Break' : 'Session');
      setClockCount(
        currentTimer === 'Session' ? breakCount * 60 : sessionCount * 60,
        saxSound.play()
      );
    }
  }, [clockCount, breakCount, currentTimer, saxSound, sessionCount]);

  const handleReset = () => {
    setBreakCount(5);
    setSessionCount(25);
    setClockCount(25 * 60);
    setCurrentTimer('Session');
    setIsPlaying(false);
    clearInterval(loop);
    try {
      saxSound.pause();
      saxSound.currentTime = 0;
    } catch (error) {
      console.log('dont press');
    }
  };

  const handleDecrease = (type) => {
    if (type === 'Session') {
      if (sessionCount > 1) {
        if (!isPlaying && currentTimer === 'Session') {
          setSessionCount(sessionCount - 1);
          setClockCount((sessionCount - 1) * 60);
        } else if (!isPlaying) {
          setSessionCount(sessionCount - 1);
        } else if (currentTimer === 'Break') {
          setSessionCount(sessionCount - 1);
        }
      }
    } else if (type === 'Break') {
      if (breakCount > 1) {
        if (!isPlaying && currentTimer === 'Break') {
          setBreakCount(breakCount - 1);
          setClockCount((breakCount - 1) * 60);
        } else if (!isPlaying) {
          setBreakCount(breakCount - 1);
        } else if (currentTimer === 'Session') {
          setBreakCount(breakCount - 1);
        }
      }
    }
  };

  const handleIncrease = (type) => {
    if (type === 'Session') {
      if (sessionCount < 60) {
        if (!isPlaying && currentTimer === 'Session') {
          setSessionCount(sessionCount + 1);
          setClockCount((sessionCount + 1) * 60);
        } else if (!isPlaying) {
          setSessionCount(sessionCount + 1);
        } else if (currentTimer === 'Break') {
          setSessionCount(sessionCount + 1);
        }
      }
    } else if (type === 'Break') {
      if (breakCount < 60) {
        if (!isPlaying && currentTimer === 'Break') {
          setBreakCount(breakCount + 1);
          setClockCount((breakCount + 1) * 60);
        } else if (!isPlaying) {
          setBreakCount(breakCount + 1);
        } else if (currentTimer === 'Session') {
          setBreakCount(breakCount + 1);
        }
      }
    }
  };

  const breakTimer = {
    title: 'Break Lenght',
    count: breakCount,
    type: 'Break',
    handleIncrease,
    handleDecrease,
  };

  const sessionTimer = {
    title: 'Session Lenght',
    count: sessionCount,
    type: 'Session',
    handleIncrease,
    handleDecrease,
  };

  return (
    <div className="App">
      <div className="flex">
        <SetTimer {...breakTimer} />
        <SetTimer {...sessionTimer} />
      </div>
      <div className="clock-container">
        <h1>{currentTimer}</h1>
        <span>{convertTime(clockCount)}</span>
        <div className="flex">
          <button onClick={handlePlayPause}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button onClick={handleReset}>
            <FontAwesomeIcon icon={faSync} />
          </button>
        </div>
        <audio src={`${sax}`} id="beep" type="audio/mpeg"></audio>
      </div>
    </div>
  );
}

export default App;
