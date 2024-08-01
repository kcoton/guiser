import { Link } from 'react-router-dom';
import CustomParticles from '../components/CustomParticles';

export default function HomePage() {
    return (
        <div className='page-container'>
            <CustomParticles />
            <p>
                Hey! Welcome to Guiser. We help you be anyone, on social media. Here's how you get started:
            </p>
            <div>
                <ul className='nav'>
                    <li>
                        {' '}
                        Go to <Link to='/Personas'> Personas</Link>, create a persona and link them to social media
                        accounts. More detail is better here.
                    </li>
                    <li>
                        Go to <Link to='/Generate'> Generate</Link>, select a persona and describe a topic and/or style
                        of social media post. We'll create the content.
                    </li>
                    <li>
                        {' '}
                        Go to <Link to='/Content'> Content</Link> to view your library and publish to your personas'
                        associated social media accounts.
                    </li>
                </ul>
            </div>
            <p> You can click the menu at the top left to jump around or log out. Have fun!</p>
        </div>
    );
}
