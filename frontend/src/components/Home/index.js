//import { Link } from 'react-router-dom'
import './index.scss'
import { useEffect, useState } from 'react';
import AnimatedLetters from '../AnimatedLetters'
import Logo from './Icon';


export const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const healthArray = ['h', 'e', 'a', 'l', 't', 'h', ' ']
    const youArray = [' ', 'you']

    useEffect(() => {
        setTimeout(() => {
          setLetterClass('text-animate-hover')
        }, 400)
      }, [])

    return (
        <div className="container home-page">
            <div className="text-zone">
                <h1>
                <AnimatedLetters letterClass={letterClass}
                    strArray={healthArray}
                    idx={15} />
                    and  
                    <AnimatedLetters letterClass={letterClass}
                    strArray={youArray}
                    idx={15} />
                </h1>
                <h2>Tech</h2>
            </div>

            <Logo />
        </div>

    );
}

export default Home