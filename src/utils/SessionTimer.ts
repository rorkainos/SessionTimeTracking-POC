// useSessionTimer.ts
import { useEffect, useState }  from 'react';
import { useIdleTimer, IIdleTimer } from 'react-idle-timer';
import { useNavigate } from 'react-router-dom';

const lengthOfSession = 9_000
const promptDurationBeforeIdle = 4_000
const rateAtWhichUseEffectCalled = 500
const homePagePath = "/"

export type SessionStateConfiguration = {
    redirectAfterIdle?: string;
    onIdle?: () => void;
    onActive?: () => void;
    onPrompt?: () => void;
}

const useSessionTimer = (sessionStateConfiguration?: SessionStateConfiguration) => {
    const [state, setState] = useState<string>('Active')
    const [open, setOpen] = useState<boolean>(false)    
    const [remainingTime, setRemainingTime] = useState<number>(lengthOfSession)
    const navigate = useNavigate();

    const onIdle = () => {

        if(sessionStateConfiguration?.onIdle)
            sessionStateConfiguration.onIdle();

        const redirectPage = sessionStateConfiguration?.redirectAfterIdle ? sessionStateConfiguration.redirectAfterIdle : homePagePath
        setOpen(false)
        navigate(redirectPage)
    }
    
    const onActive = () => {
        if(sessionStateConfiguration?.onActive)
            sessionStateConfiguration.onActive();

        setState("Active")
        setOpen(false)
    }
    
    const onPrompt = () => {

        if(sessionStateConfiguration?.onPrompt)
            sessionStateConfiguration.onPrompt();

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
