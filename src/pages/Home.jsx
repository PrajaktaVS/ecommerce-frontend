import { useAuth } from "../store/auth";


export const Home = () => {
    const { user } = useAuth();

    return (
        <>
            <main>
                <section className="section-hero">
                        <div className="hero-content">
                            <p>Hey
                                { user ? ` ${user.username}` : ","}
                            </p>
                            <h1>Welcome to Shopi</h1>
                            <p>
                            Discover amazing deals and shop your favorite products at the best prices. Dive into a seamless shopping experience today!
                            </p>
                        </div>
                        <div className="hero-image">
                            <img src="/images/mobile-shopping.png" alt="online shopping"/>
                        </div>
                </section>
            </main>
        </>
    )
}