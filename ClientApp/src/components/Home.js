import React, { Component } from 'react';
import './Home.css';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="home-container">
                <header className="home-header">
                    <h1>Ranking Tier</h1>
                    <p>Rank everything!</p>
                </header>

                <section className="home-section">
                    <h2>What We Offer</h2>
                    <p>Create, share, and discover amazing tier lists for any topic!</p>
                </section>

                <section className="home-section">
                    <h2>Get Started</h2>
                    <p>Click below to start crafting your own lists or explore lists made by others.</p>
                    <button className="cta-button">Start Now</button>
                </section>

                <footer className="home-footer">
                    <p>Powered by React, ASP.NET Core, and Bootstrap</p>
                </footer>
            </div>
        );
    }
}
