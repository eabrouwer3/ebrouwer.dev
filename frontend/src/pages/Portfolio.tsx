import * as React from "react";
import {Body, Row} from "../styles/grid";
import {CardDiv, CardBody, CardHeader, CardImage, CardSubHeader} from "../styles/card";
import {faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";
import adventImg from '../images/advent-of-code.webp';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ExternalLink from "../components/ExternalLink";
import {Link} from "react-router-dom";
import {CustomLink} from "../styles/misc";

interface GitHubProps {
    repo: string,
    name: string,
    img?: string
}

const GitHubCard: React.FC<GitHubProps> = ({repo, name, img, children}) => {
    return (
        <CardDiv>
            {img && <CardImage><img src={img} alt={name}/></CardImage>}
            <CardBody>
                <CardHeader className='header'>{name}</CardHeader>
                <br/>
                <CardSubHeader className='header' href={`https://github.com/${repo}`} rel="noopener noreferrer" target={'_blank'}>
                    {repo} <sup><FontAwesomeIcon style={{fontSize: '.7em'}} icon={faExternalLinkAlt}/></sup>
                </CardSubHeader>
                <p>{children}</p>
            </CardBody>
        </CardDiv>
    );
}

interface SummaryProps {
    page: string,
    name: string,
    img?: string
}

const SummaryCard: React.FC<SummaryProps> = ({page, name, img, children}) => {
    return (
        <CardDiv>
            {img && <CardImage><img src={img} alt={name}/></CardImage>}
            <CardBody>
                <CardHeader className='header'>{name}</CardHeader>
                <br/>
                <Link to={page}><CardSubHeader className='header'>{page}</CardSubHeader></Link>
                <p>{children} <Link to={page}><CustomLink>Read More...</CustomLink></Link></p>
            </CardBody>
        </CardDiv>
    );
}

const Portfolio: React.FC = () => {
    return (
        <>
            <Row style={{justifyContent: 'center'}}>
                <Body>
                    <h1 className='header'>Portfolio</h1>
                    <GitHubCard name={'This Website!'} repo={'eabrouwer3/ebrouwer.dev'}>
                        I've gone through a number of websites over the years, most recently just building with Wordpress
                        on a virtual private server. Over the last two years or so, however, I've taught
                        myself <ExternalLink href={'https://reactjs.org/'}>React</ExternalLink> to rebuild
                        the <ExternalLink href={'https://taxbit.com/'}>TaxBit</ExternalLink> web app and gotten much more
                        familiar with <ExternalLink href={'https://aws.amazon.com/'}>AWS</ExternalLink>. So, this whole website was
                        designed and created by me in React with any important backend function running in Lambdas accessible
                        through API Gateway in AWS. I even use Route 53 to manage my DNS and Certificate Manager to handle
                        SSL. And I've made pretty much everything available on GitHub.
                    </GitHubCard>
                    <GitHubCard name={'Advent of Code 2020'} repo={'eabrouwer3/advent-of-code-2020'} img={adventImg}>
                        2020 was the first year I found out about and participated in
                        the <ExternalLink href={'https://adventofcode.com/'}>Advent of Code</ExternalLink>. Because I just
                        wanted to have some fun with it, I decided it would be an awesome opportunity to figure out
                        how to use <ExternalLink href={'https://deno.land/'}>Deno</ExternalLink>,
                        a TypeScript ready secure alternative runtime for JavaScript.
                    </GitHubCard>
                    <SummaryCard page={'/portfolio/traffic'} name={'Modeling Traffic Flow'}>
                        In my senior year in the Applied and Computational Math program at BYU, I worked with a group of 5
                        other students to study a number of models for the flow of traffic under certain conditions. We
                        used Partial Differential Equations (PDEs) and the Law of Conservation to model traffic density
                        in a given area, and Ordinary Differential Euqations (ODEs) to model individual cars based on
                        near-neighbor interactions.
                    </SummaryCard>
                    <SummaryCard page={'/portfolio/climbing'} name={'Predicting Climbing Champions'}>
                        Also in my senior year in the Applied and Computational Math program at BYU, I worked with another 2
                        students to try and predict climbing champions in IFSC competitions. We used a number of different
                        machine learning techniques trained on data from IFSC world cup climbers to predict ranks in later
                        years.
                    </SummaryCard>
                    <SummaryCard page={'/portfolio/blockchain'} name={'Slide Deck about the Blockchain'}>
                        Working at TaxBit, we sometimes do presentations during lunch about different technical things.
                        We like to call it our "Lunch and Learn". I was tasked with one of the first presentations, and
                        because we work so closely with Blockchain technology, I decided to help out some of the company
                        with understanding the Blockchain a little better.
                    </SummaryCard>
                    <SummaryCard page={'/portfolio/react-useeffect'} name={'Slide Deck about React\'s useEffect()'}>
                        At one of our dev lunches, I gave a short presentation on React's usEffect() hook, trying to
                        help people understand what its use is and what some common gotchas are.
                    </SummaryCard>
                </Body>
            </Row>
        </>
    );
};

export default Portfolio;