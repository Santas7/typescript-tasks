import { useState } from "react"
import Input from "../../common/Input/Input"

export default function Signup( { onSubmit } ) {
    const [formData, setFormData] = useState({
        name: '',
        nick: '',
        email: '',
        gender: 'male',
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
            <h2>Раздел Signup</h2>
            <form 
                onChange={handleChange}
                onSubmit={handleSubmit}
            >
                <Input
                    name="name"
                    type="text"
                    value={formData.name}
                    placeholder="Введите имя"
                    required
                />
                <Input
                    name="nick"
                    type="text"
                    value={formData.nick}
                    placeholder="Введите ник"
                    required
                />
                <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    placeholder="Введите Email"
                    required
                />
                <span>Пол:</span>
                <label  >
                    <Input
                        name="gender"
                        type="radio"
                        value="male"
                        required
                    />
                    <span >Мужской</span>
                </label>
                <label  >
                    <Input
                        name="gender"
                        type="radio"
                        value="female"
                        required
                    />
                    <span>Женский</span>
                </label>
                
                <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    placeholder="Введите пароль"
                    required
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    )
}