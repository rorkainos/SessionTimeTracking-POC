// useSessionTimer.ts
import React, { useEffect, useState }  from 'react';
import { useIdleTimer, IIdleTimer } from 'react-idle-timer';
import { useNavigate } from 'react-router-dom';

const lengthOfSession = 9_000
const promptDurationBeforeIdle = 4_000
const rateAtWhichUseEffectCalled = 500

type idleTimer = (event?: Event | undefined, idleTimer?: IIdleTimer | undefined) => void;
type sessionStateInterceptor = {
    onIdle?: idleTimer;
    onActive?: idleTimer;
    onPrompt?: idleTimer
}

const useSessionTimer = (sessionStateInterceptor?: sessionStateInterceptor) => {
    const [state, setState] = useState<string>('Active')
    const [open, setOpen] = useState<boolean>(false)    
    const [remainingTime, setRemainingTime] = useState<number>(lengthOfSession)
    const navigate = useNavigate();

    const onIdle = () => {

        if(sessionStateInterceptor?.onIdle)
            sessionStateInterceptor.onIdle();

        setOpen(false)
        navigate("/")
    }
    
    const onActive = () => {
        if(sessionStateInterceptor?.onActive)
            sessionStateInterceptor.onActive();

        setState("Active")
        setOpen(false)
    }
    
    const onPrompt = () => {

        if(sessionStateInterceptor?.onPrompt)
            sessionStateInterceptor.onPrompt();

        setState('Prompted')
        setOpen(true)
    }

    const { getRemainingTime, activate } = useIdleTimer({
        onIdle,
        onActive,
        onPrompt,
        timeout: lengthOfSession,
        promptBeforeIdle: promptDurationBeforeIdle
    })

    useEffect(() => {
        // Function to be called immediately
        const updateRemaining = () => {
            setRemainingTime(Math.ceil(getRemainingTime() / 1000));
        };

        updateRemaining();
        const interval = setInterval(updateRemaining, rateAtWhichUseEffectCalled);

        return () => {
            clearInterval(interval)
        }
    })

    const timeTillPrompt = Math.max(remainingTime - promptDurationBeforeIdle / 1000, 0)
  
  return {timeTillPrompt, remainingTime, open, state, activate};
};

export default useSessionTimer;
