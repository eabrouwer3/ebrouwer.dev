import * as React from "react";
import {faCircle, faGraduationCap, faBriefcase, faHandsHelping} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Body, Row} from "../styles/grid";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import styled from "styled-components";
import taxbitLogo from '../images/taxbit-logo-gradient.png';
import perfectPitchLogo from '../images/perfectpitch-logo.png';
import byuLogo from '../images/byu-logo-blue.png';
import uvuLogo from '../images/uvu-logo.png';
import ExternalLink from "../components/ExternalLink";
import CenteredLogoLink from "../components/CenteredLogoLink";

const EventDiv = styled.div`
  margin-left: 28px;
  padding-left: 48px;
  padding-top: 30px;
  padding-bottom: 30px;
  border-left: #cccccc 4px solid;
  
  &:last-child {
    padding-bottom: 0;
  }
`;

const EventDates = styled.div`
  text-transform: uppercase;
  color: rgba(0,0,0,.5);
  font-size: .8rem;
  padding-bottom: 10px;
`;

const EventTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
`;

interface EventProps {
    current?: boolean,
    startDate: string,
    endDate?: string,
    title: string
}

const Event: React.FC<EventProps> = ({current = false, startDate, endDate, children, title}) => {
    return (
        <EventDiv>
            <FontAwesomeIcon style={{color: current ? '#32a852' : '#cccccc', position: 'relative', left: '-60px'}} icon={faCircle} size={'lg'} />
            <div style={{position: 'relative', left: '-20px', top: '-20px'}}>
                <EventTitle className='header'>{title}</EventTitle>
                <EventDates>
                    {startDate} {endDate || current ? <>&mdash;</> : ''} {endDate || (current && 'Present')}
                </EventDates>
                <div>{children}</div>
            </div>
        </EventDiv>
    );
};

interface SectionProps {
    icon: IconDefinition,
    title: string
}

const Section: React.FC<SectionProps> = ({icon, title, children}) => {
    return (
        <>
            <div style={{paddingTop: '30px'}}>
                <span className="fa-layers fa-fw">
                    <FontAwesomeIcon style={{color: '#32a852'}} icon={faCircle} size={'3x'} fixedWidth />
                    <FontAwesomeIcon icon={icon} size={'3x'} inverse transform="shrink-8" fixedWidth />
                </span>
                <span className='header' style={{paddingLeft: '60px', textTransform: 'uppercase', fontSize: '1.5rem'}}>{title}</span>
            </div>
            <div>
                {children}
            </div>
        </>
    );
};

const Resume: React.FC = () => {
    return (
        <>
            <Row style={{justifyContent: 'center'}}>
                <Body>
                    <h1>Resume</h1>
                    <Section icon={faBriefcase} title={'Work History'}>
                        <Event startDate={'April 2019'} current title={'TaxBit'}>
                            <CenteredLogoLink href={'https://taxbit.com/'} img={taxbitLogo} alt={'TaxBit Logo'}/>
                            I currently work at <ExternalLink href={'https://taxbit.com/'}>TaxBit</ExternalLink>, where
                            we build tax related software for some of the world's largest cryptocurrency exchanges, as
                            well as your everyday crypto trader. I've worked here for almost two years now, longer than
                            all but one developer on the team. TaxBit is certainly on track in the industry to become the
                            largest provider of cryptocurrency tax forms in the world. We're partnered with Gemini,
                            BlockFi, Uphold, and many more exchanges and are actively producing full Tax Centers in many
                            of their interfaces.
                            <br/><br/>
                            While here, I've completely rebuilt our frontend app, taking our old Angular 1 MVP and turning
                            it into a scalable, responsive, and modern React web app. And I did that in less than 6 months
                            without ever having written in React in my life. I've also tackled moving a huge portion of
                            our data ingestion process to run using AWS Lambdas instead of a large Python service. My
                            coworkers sometimes like to call me Swiss (short for Swiss Army Knife) because there isn't
                            much I can't tackle.
                        </Event>
                        <Event startDate={'March 2018'} endDate={'March 2019'} title={'LearningBridge Inc.'}>
                            Upon returning from my two year mission in Russia, I found a position as a developer
                            at <ExternalLink href={'https://www2.learningbridge.com'}>LearningBridge</ExternalLink>.
                            LearningBridge runs on <ExternalLink href={'https://coldfusion.adobe.com/'}>Adobe ColdFusion</ExternalLink>.
                            I had never written in ColdFusion before, so I took the challenge head on, excited to learn
                            a new language.
                            <br/><br/>
                            I was tasked with updating a large portion of the older UI to be responsive. I was also tasked
                            with updating a number of the PDF generators to be much quicker and easier to modify.
                        </Event>
                        <Event startDate={'March 2015'} endDate={'December 2015'} title={'Perfect Pitch Tech'}>
                            <CenteredLogoLink href={'https://perfectpitchtech.com/'} img={perfectPitchLogo} alt={'Perfect Pitch Logo'}/>
                            When I was just 17 years old and just barely out of High School, a friend put me in contact
                            with <ExternalLink href={'https://perfectpitchtech.com/'}>Perfect Pitch</ExternalLink>'s CTO
                            and he took a great chance on me and hired me on the spot. I worked on
                            their <ExternalLink href={'https://www.djangoproject.com/'}>Django</ExternalLink> backend,
                            specifically working on a number of endpoints for their API
                            using <ExternalLink href={'https://www.django-rest-framework.org/'}>Django Rest Framework</ExternalLink>.
                            <br/><br/>
                            I was also tasked with speeding up our server provisioning process
                            using <ExternalLink href={'https://puppet.com/'}>Puppet</ExternalLink>. I effectively
                            reduced the time it took to provision a new server from many hours to 30 minutes, replacing
                            long running bash scripts, with a fast running puppet configuration.
                        </Event>
                    </Section>
                    <Section icon={faGraduationCap} title={'Education'}>
                        <Event startDate={'2018'} current title={'Brigham Young University (BYU)'}>
                            <CenteredLogoLink href={'https://byu.edu/'} img={byuLogo} alt={'BYU Logo'}/>
                            I now go to BYU and it is awesome.
                        </Event>
                        <Event startDate={'2015'} endDate={'2018'} title={'Utah Valley University (UVU)'}>
                            <CenteredLogoLink href={'https://uvu.edu/'} img={uvuLogo} alt={'UVU Logo'}/>
                            I went to school at UVU for a while. It was pretty cool, I guess.
                        </Event>
                        <Event startDate={'2012'} endDate={'2014'} title={'International Baccalaureate (IB) Diploma'}>
                            I went to high school at QASMT for a while. I did the IB program. I'm pretty smart.
                        </Event>
                    </Section>
                    <Section icon={faHandsHelping} title={'Volunteer Experience'}>
                        <Event startDate={'January 2016'} endDate={'January 2018'} title={'Church Missionary Service'}>
                            I served a mission for the Church of Jesus Christ of Latter-Day Saints for two years in Russia.
                            I served in the beautiful Russian cities of Novosibirsk, Omsk, and Barnaul, but also spend
                            a few days in Tomsk, Novokuznetsk, and Ulan-Ude. I love the Russian people and the Russian
                            language.
                        </Event>
                    </Section>
                </Body>
            </Row>
        </>
    );
};

export default Resume;