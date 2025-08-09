<script lang="ts">
  import { ExternalLink } from "$lib/components";
  import GitHubCard from "./GitHubCard.svelte";
  import SummaryCard from "./SummaryCard.svelte";

  import adventImg from "$lib/assets/images/advent-of-code.webp";
</script>

<div class="flex pb-6 pt-12">
  <div class="flex flex-col justify-center grow">
    <h1 class="font-header text-4xl tracking-widest block">Portfolio</h1>
  </div>
</div>
<div class="flex justify-center">
  <div class="grow">
    <GitHubCard name={'This Website!'} repo={'eabrouwer3/ebrouwer.dev'}>
      Recently I rewrote this website using <ExternalLink href={'https://remix.run'}>Remix</ExternalLink> and
      absolutely loved it. Some other technologies I learned about and worked with include:
      <ul class="list-disc list-inside">
        <li><ExternalLink href={'https://tailwindcss.com/'}>TailwindCSS</ExternalLink> for Styling</li>
        <li><ExternalLink href={'https://fly.io'}>Fly.io</ExternalLink> for Hosting</li>
        <li><ExternalLink href={'https://resend.com'}>Resend</ExternalLink> for sending Emails</li>
        <li><ExternalLink href={'https://cloud.google.com/firestore'}>GCP Firestore</ExternalLink> for storing TOTP codes</li>
        <li><ExternalLink href={'https://cloud.google.com/products/compute'}>GCP Compute</ExternalLink> for running Minecraft servers</li>
      </ul>
    </GitHubCard>
    <GitHubCard name={'Airbyte Terraform Provider'} repo={'eabrouwer3/terraform-provider-airbyte'}>
      While working at TaxBit, we were looking at potential providers for pulling down data from various
      blockchains and crypto data sources. One option we investigated was <ExternalLink href={'https://airbyte.io/'}>Airbyte</ExternalLink>.
      I learned a lot about <ExternalLink href={'https://kubernetes.io/'}>Kubernetes</ExternalLink> and <ExternalLink href={'https://helm.sh/'}>Helm Charts</ExternalLink> and
      how to manage k8s with <ExternalLink href={'https://www.terraform.io/'}>Terraform</ExternalLink>.
      <br/>
      <br/>
      One of the challenges with managing Airbyte is managing connectors and connections with IaC. At the time,
      Airbyte had a home grown solution for managing connectors and connections, but it didn't have all the
      features we needed because we had custom connectors that weren't supported.
      <br/>
      <br/>
      So, I decided to try my hand at <ExternalLink href={'https://go.dev/'}>Go</ExternalLink> and spent a week
      and a half learning Go and building a Terraform provider to manage our connections/connectors alongside
      our IaC. It quickly gained popularity, and pretty quickly the Airbyte team realized it's usefulness and
      took over with building their own terraform provider.
    </GitHubCard>
    <GitHubCard name={'ebrouwer.dev v1'} repo={'eabrouwer3/ebrouwer.dev/tree/static-react'}>
      I've gone through a number of websites over the years. Before this iteration, I built it with Wordpress
      on a virtual private server. In 2021, however, I taught
      myself <ExternalLink href={'https://reactjs.org/'}>React</ExternalLink> to rebuild the
      old <ExternalLink href={'https://taxbit.com/'}>TaxBit</ExternalLink> consumer web app and I grew in
      familiarity with <ExternalLink href={'https://aws.amazon.com/'}>AWS</ExternalLink>. So, this whole website
      was designed and created by me in React with any important backend function running in Lambdas accessible
      through API Gateway in AWS. I even used Route 53 to manage my DNS and Certificate Manager to handle
      SSL.
    </GitHubCard>
    <GitHubCard name={'Advent of Code 2020'} repo={'eabrouwer3/advent-of-code-2020'} img={adventImg}>
      2020 was the first year I found out about and participated in
      the <ExternalLink href={'https://adventofcode.com/'}>Advent of Code</ExternalLink>. Because I just
      wanted to have some fun with it, I decided it would be an awesome opportunity to figure out
      how to use <ExternalLink href={'https://deno.land/'}>Deno</ExternalLink>,
      a TypeScript ready secure alternative runtime for JavaScript.
    </GitHubCard>
    <GitHubCard name={'Advent of Code (Other Years)'} repo={'eabrouwer3/advent-of-code'} img={adventImg}>
      In 2021, 2022, and 2023, I attempted
      the <ExternalLink href={'https://adventofcode.com/'}>Advent of Code</ExternalLink> again.
      I didn't have as much time to dedicate to it as I did in 2020, but I still had a lot of fun. I
      used a few new languages
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
  </div>
</div>
