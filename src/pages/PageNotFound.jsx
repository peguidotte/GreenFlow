import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/greenflow');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Opa, ocorreu algum erro!</h1>
            <button onClick={handleButtonClick}>
                Clique nesse botão e volte para greenflow
            </button>
        </div>
    );
};

export default PageNotFound;