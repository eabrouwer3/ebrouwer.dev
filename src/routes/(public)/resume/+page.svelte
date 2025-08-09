<script lang="ts">
  import { Briefcase, GraduationCap, Handshake } from "$lib/icons";
  import { ExternalLink } from "$lib/components";

  import CenteredLogoLink from "./CenteredLogoLink.svelte";
  import Event from "./Event.svelte";
  import Section from "./Section.svelte";

  import taxbitLogo from "$lib/assets/images/taxbit_full_logo.png";
  import learningbridgeLogo from "$lib/assets/images/LearningBridge_logo_rgb.jpg";
  import perfectPitchLogo from "$lib/assets/images/perfectpitch-logo.png";
  import byuLogo from "$lib/assets/images/byu-logo-blue.png";

  import resumePDF from "$lib/assets/documents/resume.pdf";
</script>

<div class="flex pb-6 pt-12">
  <div class="flex flex-col justify-center grow">
    <h1 class="font-header text-4xl tracking-widest block">Resume</h1>
  </div>
  <div class="shrink text-right">
    <a
      class="text-skalex py-4 px-6 uppercase font-bold border border-transparent border-solid no-underline block visited:text-skalex focus:text-skalex hover:text-skalex hover:border-skalex"
      href={resumePDF}>
      Download PDF
    </a>
  </div>
</div>
<Section IconComponent={Briefcase} title={'Work History'}>
  <Event
    startDate={'April 2019'}
    current
    title={'TaxBit'}
  >
    {#snippet logo()}
      <CenteredLogoLink href={'https://taxbit.com/'} img={taxbitLogo} alt={'TaxBit Logo'}/>
    {/snippet}
    As employee number 2 at <ExternalLink href={'https://taxbit.com/'}>TaxBit</ExternalLink>, I've
    helped take the company from two to over 200 employees. From a couple thousand in sales to millions.
    TaxBit builds cryptocurrency tax and accounting solutions for enterprises, consumers, and the
    government.
    <br/><br/>
    While here, I've headed numerous impactful efforts.
    <ul class="list-disc ml-8">
      <li>
        I completely rebuilt our frontend app, taking our old Angular 1 MVP and turning it into a
        scalable, responsive, and modern React web app. And I did that in less than 6 months
        without ever having written in React in my life.
      </li>
      <li>
        I built our Public facing API from scratch, using AWS serverless services such as Lambda
        and API Gateway. And this API still exists and handles millions of calls a day from our
        enterprise clients.
      </li>
      <li>
        I built an end-to-end ETL pipeline for ingesting, parsing, and transforming cryptocurrency
        trading data from numerous sources. This included proper logging and monitoring, scaling to
        essentially infinite concurrent syncs, and building a scalable API layer for our consuming
        services.
      </li>
      <li>
        Implemented the first service at TaxBit with a full CI/CD pipeline with zero touch points
        from merge to deploy.
      </li>
    </ul>
    My coworkers sometimes like to call me Swiss (short for Swiss Army Knife) because there isn't much
    I can't tackle.
  </Event>
  <Event
    startDate={'March 2018'}
    endDate={'March 2019'}
    title={'LearningBridge Inc.'}
  >
    {#snippet logo()}
      <CenteredLogoLink href={'https://www2.learningbridge.com/'} img={learningbridgeLogo} alt={'LearningBridge Logo'}/>
    {/snippet}
    Upon returning from my two year mission in Russia, I found a position as a developer
    at <ExternalLink href={'https://www2.learningbridge.com'}>LearningBridge</ExternalLink>.
    LearningBridge runs on <ExternalLink href={'https://coldfusion.adobe.com/'}>Adobe ColdFusion</ExternalLink>.
    I had never written in ColdFusion before, so I took the challenge head on, excited to learn
    a new language.
    <br/><br/>
    I was tasked with updating a large portion of the older UI to be responsive. I was also tasked
    with updating a number of the PDF generators to be much quicker and easier to modify.
  </Event>
  <Event
    startDate={'March 2015'}
    endDate={'December 2015'}
    title={'Perfect Pitch Tech'}
  >
    {#snippet logo()}
      <CenteredLogoLink href={'https://perfectpitchtech.com/'} img={perfectPitchLogo} alt={'Perfect Pitch Logo'}/>
    {/snippet}
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
<Section IconComponent={GraduationCap} title={'Education'}>
  <Event
    startDate={'2018'}
    endDate={'2022'}
    title={'Brigham Young University (BYU)'}
  >
    {#snippet logo()}
      <CenteredLogoLink href={'https://byu.edu/'} img={byuLogo} alt={'BYU Logo'}/>
    {/snippet}
    I graduated from Brigham Young University (Provo) in 2022 with a BS in Applied and Computational
    Mathematics with a concentration in Computer Science.
  </Event>
  <Event startDate={'2012'} endDate={'2014'} title={'International Baccalaureate (IB) Diploma'}>
    I went to high school in Brisbane, Australia at Queensland Academy of Science Mathematics and
    Technology (QASMT). I graduated with an International Baccalaureate (IB) Diploma in 2014.
  </Event>
</Section>
<Section IconComponent={Handshake} title={'Volunteer Experience'}>
  <Event startDate={'January 2016'} endDate={'January 2018'} title={'Church Missionary Service'}>
    I served a mission for the Church of Jesus Christ of Latter-Day Saints for two years in Russia.
    I served in the beautiful Russian cities of Novosibirsk, Omsk, and Barnaul, but also spend
    a few days in Tomsk, Novokuznetsk, and Ulan-Ude. I love the Russian people and the Russian
    language.
  </Event>
</Section>
