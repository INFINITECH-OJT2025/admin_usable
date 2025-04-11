import React, { useState } from 'react';

const CapsuleInput: React.FC = () => {
    const [cc, setCc] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue) {
            if (validateEmail(inputValue)) {
                setCc([...cc, inputValue]);
                setInputValue('');
            }
        }
    };

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const removeEmail = (email: string) => {
        setCc(cc.filter((item) => item !== email));
    };

    return (
        <div className="flex flex-wrap border rounded p-2">
            {cc.map((email, index) => (
                <div key={index} className="bg-blue-200 rounded-full px-3 py-1 mr-2 mb-2 flex items-center">
                    <span>{email}</span>
                    <button onClick={() => removeEmail(email)} className="ml-2 text-red-500">x</button>
                </div>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add CC email"
                className="flex-1 border-none outline-none"
            />
        </div>
    );
};

export default CapsuleInput;