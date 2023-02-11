export type SVGFC = React.FC<React.SVGProps<SVGSVGElement>>;

export const ChevronDown: SVGFC = (props) => {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.25 10.75L12 14.25L8.75 10.75"></path>
    </svg>
  );
};

export const Hamburger: SVGFC = (props) => {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.75 5.75H19.25"></path>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.75 18.25H19.25"></path>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.75 12H19.25"></path>
    </svg>
  );
};

export const Circle: SVGFC = (props) => {
  return (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="7.25" stroke="currentColor" fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></circle>
    </svg>
  );
};

export const Briefcase: SVGFC = (props) => {
  // Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path stroke="currentColor" fill="currentColor" d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" />
    </svg>
  );
};

export const GraduationCap: SVGFC = (props) => {
  // Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" {...props}>
      <path stroke="currentColor" fill="currentColor" d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z"/>
    </svg>
  );
};

export const Handshake: SVGFC = (props) => {
  // Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" {...props}>
      <path stroke="currentColor" fill="currentColor" d="M543.9 251.4c0-1.1 .1-2.2 .1-3.4c0-48.6-39.4-88-88-88l-40 0H320l-16 0 0 0v16 72c0 22.1-17.9 40-40 40s-40-17.9-40-40V128h.4c4-36 34.5-64 71.6-64H408c2.8 0 5.6 .2 8.3 .5l40.1-40.1c21.9-21.9 57.3-21.9 79.2 0l78.1 78.1c21.9 21.9 21.9 57.3 0 79.2l-69.7 69.7zM192 128V248c0 39.8 32.2 72 72 72s72-32.2 72-72V192h80l40 0c30.9 0 56 25.1 56 56c0 27.2-19.4 49.9-45.2 55c8.2 8.6 13.2 20.2 13.2 33c0 26.5-21.5 48-48 48h-2.7c1.8 5 2.7 10.4 2.7 16c0 26.5-21.5 48-48 48H224c-.9 0-1.8 0-2.7-.1l-37.7 37.7c-21.9 21.9-57.3 21.9-79.2 0L26.3 407.6c-21.9-21.9-21.9-57.3 0-79.2L96 258.7V224c0-53 43-96 96-96z"/>
    </svg>
  );
};
