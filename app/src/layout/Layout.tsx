import Header from "../components/ordinary/header/Header";

export default function Layout( { children } ) {
    return (
        <>
            <Header/>
            <main>
                {children}
            </main>
        </>
    );
}