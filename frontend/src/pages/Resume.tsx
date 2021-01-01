import * as React from "react";
import {faCircle, faGraduationCap, faBriefcase, faHandsHelping} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Body, Row} from "../styles/grid";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import styled from "styled-components";

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
            <div style={{position: 'relative', display: 'inline-block', left: '-20px', top: '-20px'}}>
                <EventTitle>{title}</EventTitle>
                <EventDates>
                    {startDate} {endDate || current ? <>&mdash;</> : ''} {endDate || (current && 'Present')}
                </EventDates>
                <div>
                    {children}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
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
                        <Event startDate={'April 2019'} current title={'TaxBit'}>I now work at TaxBit and it's a ton of fun. I love it. I do tons of cool stuff. </Event>
                        <Event startDate={'March 2018'} endDate={'March 2019'} title={'LearningBridge Inc.'}>I worked at LearningBridge Inc. for a while too. And that was also pretty cool.</Event>
                        <Event startDate={'March 2015'} endDate={'December 2015'} title={'Perfect Pitch Tech'}>I worked at Perfect Pitch for a while. And it was really cool</Event>
                    </Section>
                    <Section icon={faGraduationCap} title={'Education'}>
                        <Event startDate={'2018'} current title={'Brigham Young University (BYU)'}>I now go to BYU and it is awesome.</Event>
                        <Event startDate={'2015'} endDate={'2018'} title={'Utah Valley University (UVU)'}>I went to school at UVU for a while. It was pretty cool, I guess.</Event>
                        <Event startDate={'2012'} endDate={'2014'} title={'International Baccalaureate (IB) Diploma'}>I went to high school at QASMT for a while. I did the IB program. I'm pretty smart.</Event>
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