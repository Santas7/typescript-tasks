import { useState } from "react"
import Input from "../../common/Input/Input"

export default function Signin({ onSubmit }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    function handleSubmit(event) {
        event.preventDefault()
        onSubmit(formData)
    }

    function handleChange(event) {
        if (event.target.name !== '') {
            setFormData((prevState) => {
                return {
                    ...prevState,
                    [event.target.name]: event.target.value
                }
            })
        }
        
    }

    return (
        <div>
            <h2>Раздел Signin</h2>
            <form 
                onChange={handleChange}
                onSubmit={handleSubmit}
            >
                <Input 
                    name="email"
                    type="email"
                    value={formData.email} 
                    placeholder="Введите Email"
                    required
                />
                <Input 
                    name="password"
                    type="password" 
                    value={formData.password} 
                    placeholder="Введите пароль" 
                    required
                />
                <button type="submit">Войти</button>
            </form>
        </div>
    )
}
