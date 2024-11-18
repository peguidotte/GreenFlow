

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="text-center mb-4">
                <p>Sobre Nós</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="ml-4">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
                </div>
                <div className="text-center">
                    <p>Green Flow</p>
                </div>
                <div className="mr-4">
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;