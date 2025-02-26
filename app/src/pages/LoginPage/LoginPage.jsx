import { useState } from "react"
import Input from "../../components/Input/Input"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const { signin } = useAuth()

    function handleSubmit(event) {
        event.preventDefault()
        signin(formData, () => navigate('/categories'))
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
