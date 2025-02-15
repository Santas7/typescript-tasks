export function Signup( { onSubmit } ) {
    return (
        <div>
            <h2>Раздел Signup</h2>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Введите имя" />
                <input type="text" placeholder="Введите ник"/>
                <input type="email" placeholder="Введите Email" />
                <span>Пол:</span>
                <label>
                    <input type="radio" required />
                    <span>Мужской</span>
                </label>
                <label>
                    <input type="radio" required />
                    <span>Женский</span>
                </label>

                <input type="password" placeholder="Введите пароль" />
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    )
}