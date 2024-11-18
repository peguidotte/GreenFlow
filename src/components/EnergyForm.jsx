import { useState } from 'react';

const EnergyForm = () => {
    const [formData, setFormData] = useState({
        age: '',
        energyConsumption: '',
        state: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Idade:</label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Consumo de Energia:</label>
                <input
                    type="number"
                    name="energyConsumption"
                    value={formData.energyConsumption}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Estado:</label>
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default EnergyForm;