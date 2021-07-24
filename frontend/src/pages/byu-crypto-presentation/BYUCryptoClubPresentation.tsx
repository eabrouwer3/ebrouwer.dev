import * as React from "react";
import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/reveal.css';
// @ts-ignore
import Reveal from 'reveal.js';
// @ts-ignore
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown.esm';
import img1099b from './1099b.png';
import img1099misc from './1099misc.png';
import img8949 from './8949.png';
import tax_optimizer from './tax_optimizer.png';
import taxbit_team from './taxbit_team.jpeg';
import './taxbit.css';
import {useEffect} from "react";

const BYUCryptoClubPresentation: React.FC = () => {
    useEffect(() => {
        // More info about initialization & config:
        // - https://revealjs.com/initialization/
        // - https://revealjs.com/config/
        let deck = new Reveal({
            plugins: [ RevealMarkdown ]
        })
        deck.initialize();
    }, []);

    return (
        <div className="reveal">
            <div className="slides">
                <section>
                    <img src="data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjQzODUiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDQzODUgMTAyNCI+Cjx0aXRsZT48L3RpdGxlPgo8ZyBpZD0iaWNvbW9vbi1pZ25vcmUiPgo8L2c+CjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMTcyLjg4NCA2LjcwMWgtNTcyLjA3NWwtOTcuMDk4IDIyNC45MjctMzM1LjIxMyA3ODcuOTg4aDI1MC4yNWwzMzUuMjEzLTc4Ny45ODhoMzIzLjIzOXoiPjwvcGF0aD4KPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyMS4wNjcgNi43MDFoMzgxLjEwNGwtOTUuMTc2IDIyNC45MjctMzM4LjM4MiA3ODcuOTg4aC01OS4yNzhsMzM4LjM4Mi03ODcuOTg4aC0zMjMuMjM5eiI+PC9wYXRoPgo8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTk1MS43MTMgNzc5LjI2MWwxODMuODc3LTI2NC44NTItMjE2LjUzNy01MDcuNzA4aDI2Ny4zNjFsMTE0Ljc5NSAyNjkuMTU2IDE4Ni44NjYtMjY5LjE1NmgyNjcuMzYxbC0zNTIuNDg0IDUwNy43MDggMjE1LjE0NCA1MDQuNDQzaC0yNjcuMzYxbC0xMTMuNDAyLTI2NS44OTEtMTg0LjE3NyAyNjUuMjgzLTEwMS40NDMtMjM4Ljk4NHoiPjwvcGF0aD4KPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE2ODIuMjg3IDEwMTkuNjE2bC02OC41MjEtMTc0LjI4MWgtNDI4Ljk5OWwtNjcuMDMxIDE3NC4yODFoLTI2OC4xMjVsNDMwLjQ4OS0xMDEyLjkxNWgyNDEuMzEybDQyOC45OTkgMTAxMi45MTVoLTI2OC4xMjV6TTEyNjYuNjk0IDYzNS4zMDRoMjY1LjE0NWwtMTMyLjU3My0zNDEuMTE0LTEzMi41NzMgMzQxLjExNHoiPjwvcGF0aD4KPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTMwMDkuMSA5NTUuNjh2NjEuNTQxaC0xNDcuOTkydi0zNTUuMDcyYzAuMDAyLTAuODY0IDAtMS43MjkgMC0yLjU5NnYtNjUzLjE5M2gxNTIuNDc2djQwOC4wMzVjMjcuOTA0LTMwLjg5NCA2MS41MzgtNTUuMDYxIDEwMC45MDMtNzIuNTAxczgxLjk2OC0yNi4xNiAxMjcuODExLTI2LjE2YzYyLjc4NSAwIDEyMC41ODYgMTUuMTk4IDE3My40MDQgNDUuNTkzczk0LjQyNiA3Mi4yNTIgMTI0LjgyMSAxMjUuNTY5YzMwLjM5NiA1My4zMTcgNDUuNTkzIDExMi4zNjQgNDUuNTkzIDE3Ny4xNDIgMCA2Ni43NzEtMTUuOTQ1IDEyNy4wNjMtNDcuODM2IDE4MC44NzlzLTc1Ljc0IDk1LjkyLTEzMS41NDggMTI2LjMxNmMtNTUuODA5IDMwLjM5Ni0xMTguMDk0IDQ1LjU5My0xODYuODU4IDQ1LjU5My02Ny43NjggMC0xMjkuMDU3LTE0Ljk0OS0xODMuODY5LTQ0Ljg0Ni05LjMxNS01LjA4MS0xOC4yODQtMTAuNTE0LTI2LjkwOC0xNi4zek0zMzMxLjk5MSA4NTUuMzhjMzIuODg3LTE4LjkzNSA1OC43OTgtNDUuMDk1IDc3LjczMy03OC40OHMyOC40MDItNzAuNTA4IDI4LjQwMi0xMTEuMzY4YzAtMzkuODYzLTkuMjE4LTc2LjQ4Ny0yNy42NTUtMTA5Ljg3M3MtNDMuODQ5LTU5LjU0NS03Ni4yMzgtNzguNDhjLTMyLjM4OS0xOC45MzUtNjguNTE0LTI4LjQwMi0xMDguMzc4LTI4LjQwMnMtNzYuNDg3IDkuNDY3LTEwOS44NzMgMjguNDAyYy0zMy4zODYgMTguOTM1LTU5LjU0NSA0NS4zNDQtNzguNDggNzkuMjI4cy0yOC40MDIgNzEuMjU1LTI4LjQwMiAxMTIuMTE1YzAgMzkuODYzIDkuMjE4IDc2LjIzOCAyNy42NTUgMTA5LjEyNXM0My44NDkgNTguNzk4IDc2LjIzOCA3Ny43MzNjMzIuMzg5IDE4LjkzNSA2OC41MTQgMjguNDAyIDEwOC4zNzggMjguNDAyIDQwLjg2IDAgNzcuNzMzLTkuNDY3IDExMC42Mi0yOC40MDJ6Ij48L3BhdGg+CjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zNzA1LjMwMSAzMTUuODM3bDE1MC45ODEgMC4wNDd2Njk0LjEyOGgtMTUwLjk4MXoiPjwvcGF0aD4KPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTM3MDUuMzc3IDYuMzZoMTUwLjkwNnYxNTAuOTA2aC0xNTAuOTA2di0xNTAuOTA2eiI+PC9wYXRoPgo8cGF0aCBmaWxsPSIjZmZmIiBkPSJNNDE5OC4wNjUgNDQzLjEwM3YzNDAuOTE5YzAgMzAuODk0IDguMjIyIDU1LjA2MSAyNC42NjUgNzIuNTAxczM5LjExNiAyNi4xNiA2OC4wMTYgMjYuMTZjMTMuOTUyIDAgNzguNjM5IDAuMjkzIDkxLjE4NyAwLjI5M3YxMzQuMjQ1Yy0xNS4yOTUgMC05Ni42NjggMC0xMTkuNTg5IDAtNjcuNzY4IDAtMTIwLjU4Ni0xOS40MzMtMTU4LjQ1Ni01OC4zcy01Ni44MDUtOTIuMTgzLTU2LjgwNS0xNTkuOTUxdi0zNTUuODY3aC03My4zODl2LTEyOC41NThoNzMuMzg5di0zMDcuOTQyaDE1MC45ODF2MzA3Ljk0MmgxODMuODY5djEyOC41NThoLTE4My44Njl6Ij48L3BhdGg+Cjwvc3ZnPgo="
                         alt="TaxBit Logo"/>
                </section>
                <section>
                    <h2>About Me</h2>
                    <ul>
                        <li>Ethan Brouwer</li>
                        <li><a target="_blank" href="ebrouwer.dev">Personal Website - ebrouwer.dev</a></li>
                        <li><a target="_blank" href="https://www.linkedin.com/in/eabrouwer3/">LinkedIn -
                            linkedin.com/in/eabrouwer3</a></li>
                        <li><a target="_blank" href="https://twitter.com/ebrouwerdev">Twitter - @ebrouwerdev</a></li>
                        <li><a target="_blank" href="https://github.com/eabrouwer3">GitHub - github.com/eabrouwer3</a>
                        </li>
                    </ul>
                </section>
                <section data-markdown>
					<textarea data-template>
						## My Role at TaxBit
						### Software Engineer
						Projects I've worked on:
						- Form Generation
						- Public API
						- Data Ingestion
						- Frontend Work
						- Basically, whatever they need me to do
					</textarea>
                </section>
                <section>
                    <img src={taxbit_team}/>
                </section>
                <section>
                    <h1><a style={{color: 'white'}} target="_blank"
                           href="https://www.forbes.com/sites/alexkonrad/2021/03/02/utah-startup-taxbit-raises-100-million-to-solve-cryptocurrency-tax-problem">100M
                        Series A!!!!</a></h1>
                </section>
                <section>
                    <iframe width="650" height="400" src="https://www.youtube.com/embed/OmFfHjoRvX0"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </section>
                <section data-markdown>
					<textarea data-template>
						## Our Mission

						We want to enable the regulatory infrastructure of an entire asset class
					</textarea>
                </section>
                <section data-markdown>
					<textarea data-template>
						## Market Verticals

						- Consumer Tax
						- Enterprise Tax
						- Enterprise Accounting
						- Government Tax
					</textarea>
                </section>
                <section data-markdown>
					<textarea data-template>
						## What's Taxable?

						- Dispositions:
						  - Sells
						  - Expenses
						  - Trades
					</textarea>
                </section>
                <section>
                    <h2>US Tax Engine</h2>
                    <p>Long-term vs Short-Term</p>
                    <ul>
                        <li className="fragment">FIFO</li>
                        <li className="fragment"><span className="fragment strike">LIFO</span></li>
                        <li className="fragment"><span className="fragment highlight-green">HIFO</span></li>
                    </ul>
                </section>
                <section>
                    <h2>8949</h2>
                    <img src={img8949}/>
                </section>
                <section>
                    <h2>1099-B</h2>
                    <img src={img1099b}/>
                </section>
                <section>
                    <h2>1099-MISC</h2>
                    <img src={img1099misc}/>
                </section>
                <section>
                    <h2>Tax Optimizer</h2>
                    <img src={tax_optimizer}/>
                </section>
                <section>
                    <h2>Tax Optimizer</h2>
                    <p>What about...</p>
                    <ul>
                        <li className="fragment">Tax Optimization</li>
                        <li className="fragment">Spend Optimization</li>
                        <li className="fragment">Donation Optimization</li>
                        <li className="fragment">More!</li>
                    </ul>
                </section>
                <section data-markdown>
					<textarea data-template>
						## What about...
						- Staking
						- Interest Accounts
						- Margin Trading
						- DeFi
						- NFTs
					</textarea>
                </section>
                <section data-markdown>
					<textarea data-template>
						## Careers/Employment
						- Engineers
						- Subject Matter Experts
						- Recruiting
						- Product team
					</textarea>
                </section>
                <section>
                    <h1>Questions?</h1>
                </section>
            </div>
        </div>
    )
};

export default BYUCryptoClubPresentation;