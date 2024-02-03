import woman_1 from './woman_1.png';
import './index.scss';

const Logo = () => {

    return (
        <div className='logo-container'>
            <img className='logo-img' src={woman_1} alt='woman at peace'/>
        </div>
    )
}

export default Logo
