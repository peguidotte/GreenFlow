import { useState } from 'react';
import 'tailwindcss/tailwind.css';

const SignUp = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-lg w-1/3">
                        <span className="text-black text-2xl cursor-pointer float-right" onClick={toggleModal}>&times;</span>
                        <div className="form-container mb-4">
                            <h2 className="text-2xl mb-4">Login</h2>
                            <form>
                                <label className="block mb-2">Email:</label>
                                <input className="border p-2 mb-4 w-full" type="email" required />
                                <label className="block mb-2">Password:</label>
                                <input className="border p-2 mb-4 w-full" type="password" required />
                                <button className="bg-green-500 text-white p-2 rounded w-full" type="submit">Login</button>
                            </form>
                        </div>
                        <div className="form-container">
                            <h2 className="text-2xl mb-4">Sign Up</h2>
                            <form>
                                <label className="block mb-2">Name:</label>
                                <input className="border p-2 mb-4 w-full" type="text" required />
                                <label className="block mb-2">Email:</label>
                                <input className="border p-2 mb-4 w-full" type="email" required />
                                <label className="block mb-2">Password:</label>
                                <input className="border p-2 mb-4 w-full" type="password" required />
                                <button className="bg-green-500 text-white p-2 rounded w-full" type="submit">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUp;
