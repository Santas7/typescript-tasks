export function Signin({ onSubmit }) {
    return (
        <div>
            <h2>Раздел Signin</h2>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Введите Email" />
                <input type="password" placeholder="Введите пароль" />
                <button type="submit">Войти</button>
            </form>
        </div>
    )
}