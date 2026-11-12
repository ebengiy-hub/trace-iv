

<pasted_content id="ea1d">
TRACE IV — Interactive Mobile Web Prototype & QR Experience
Act as a Senior UX/UI Designer, Creative Front-End Developer, and Interaction Design Engineer, specializing in premium interactive digital experiences, futuristic interfaces, and high-fidelity mobile prototypes.
PROJECT OBJECTIVE
Transform my existing TRACE IV — Augmented Heritage mobile application designs into a fully functional, interactive, mobile-first web prototype.
The prototype must be accessible through a public website URL and a scannable QR code, allowing anyone to scan the code with their phone and immediately experience the application in their mobile browser.
This prototype will be presented in my industrial and interaction design portfolio and university project exhibition.
It must feel like a polished, professionally developed application rather than a static mockup.
1. MOST IMPORTANT RULE: PRESERVE MY DESIGNS
I will provide five existing application screen designs as visual references.
You must:

* Recreate all five screens as faithfully as possible.
* Preserve their original layouts, typography, spacing, proportions, colors, icons, artwork imagery, buttons, and information hierarchy.
* Maintain the existing cool-white, silver, frosted-glass, and electric-blue visual language.
* Preserve the TRACE IV identity, logo, and overall futuristic aesthetic.
* Do not redesign, reinterpret, simplify, or replace my UI.
* Ensure all five screens use a consistent mobile viewport and alignment.
* Use the uploaded references as the primary visual source of truth.

This is a high-fidelity implementation task, NOT a redesign task.
2. APPLICATION STRUCTURE
Build five fully interactive screens.
SCREEN 01 — Visit Overview
Title: "YOUR VISIT IS READY"
Include:

* Archaeology Museum
* Estimated visit duration
* Interactive museum route visualization
* Seven saved artifacts indicator
* "OPEN MY COLLECTION" button

Interaction:
The route should feature subtle animated progress indicators.
Clicking an artifact or navigation element should take the user to the appropriate screen.
SCREEN 02 — Artifact Exploration
Title: "AMPHORA"
Include:

* Large amphora image
* Close-up image showing the actual ceramic texture
* Historical period and museum details
* Material, region, and period information
* Description and historical context
* "LISTEN AGAIN" button centered at the bottom

Interaction:

* Tapping the amphora reveals additional details.
* "VIEW DETAILS" opens the relevant artifact information.
* "LISTEN AGAIN" triggers functional audio narration using a supplied recording or browser-supported speech synthesis.

SCREEN 03 — Contextual Q&A
Display the existing question:
"Why is it made of clay?"
And the answer:
"Clay was abundant, easy to shape, and became durable after firing—ideal for storage and transport."
Include:

* Original conversation UI
* Source: Museum Archive
* Message input field
* Microphone button

Interaction:

* Display the existing example answer.
* Allow users to type questions.
* Provide functional responses using predefined artifact knowledge or a properly configured AI backend.
* Do not fabricate museum citations or historical facts.
* If voice recognition is supported by the browser, allow microphone input; otherwise provide a graceful fallback.

SCREEN 04 — Saved Collection
Include:

* "This Visit" filter
* Large amphora preview
* Six additional archaeological artifacts:
   * Ancient sculpted head
   * Historical coin
   * Small archaeological figurine
   * Ceramic bowl
   * Carved stone relief
   * Ancient bracelet

Preserve the exact visual structure of my existing collection screen.
Interaction:

* Each artifact must be selectable.
* Selecting an artifact reveals its own information.
* The "SHARE COLLECTION" button navigates to Screen 05.

SCREEN 05 — Save & Share
Title: "SAVE YOUR COLLECTION"
Include:

* PDF collection preview
* "Save as PDF"
* "Send to My Email"

Interaction:
Save as PDF
Generate a real downloadable PDF containing the user's saved artworks, artifact images, and available information.
Send to My Email
Allow users to enter their email address and receive the PDF through a properly configured email service. If no email backend is available, use an honest email-compose fallback rather than pretending an email was sent.
Both actions must work, not merely display animations.
3. INTERACTIONS & ANIMATIONS
Create a premium interaction experience inspired by high-end digital product showcases.
Use:

* Subtle spring-based screen transitions
* Smooth navigation between screens
* Microinteractions on buttons
* Soft visual feedback after taps
* Elegant card transitions
* Refined loading animations
* Subtle glassmorphism effects consistent with my original UI

Interactions should feel futuristic, elegant, and precise.
Do not introduce unnecessary animations or change the existing visual language.
Keep movement smooth and restrained.
Respect reduced-motion accessibility preferences.
4. QR CODE OPENING EXPERIENCE
This is especially important.
The visitor will encounter a physical exhibition poster with a QR code.
When they scan it, I want a memorable opening experience.
Create the following sequence:
Step 1 — QR Scan
The visitor scans the QR code using their phone camera.
Step 2 — Branded Intro
The website opens directly in their mobile browser.
Display a short, elegant animated introduction featuring:

* TRACE IV logo
* "AUGMENTED HERITAGE"
* Clean white background
* Neon-lime accents matching the product identity
* Subtle futuristic motion graphics

Step 3 — Transition
The logo smoothly transitions into the application interface.
Step 4 — Interactive Prototype
The visitor reaches the first application screen and can explore all five screens.
The intro must:

* Feel premium and immersive.
* Be short and skippable.
* Avoid excessive loading.
* Play smoothly on iOS Safari and Android Chrome.
* Never block the user from accessing the prototype.

5. TECHNICAL REQUIREMENTS
Build the project using:

* React
* TypeScript
* Tailwind CSS
* Framer Motion / Motion for React
* Responsive mobile-first design
* Vite or Next.js, depending on the most suitable deployment approach

Requirements:

* All navigation and controls must be functional.
* Support phone touch interactions.
* Ensure compatibility with iPhone Safari and Android Chrome.
* Use safe-area insets for modern phones.
* Optimize images and loading performance.
* Maintain consistent screen dimensions and visual proportions.
* No horizontal overflow on mobile.
* No fake buttons, dead-end interactions, or placeholder screens.
* Use real HTML and CSS components, not just screenshots with invisible clickable overlays.

Use suitable icon libraries without altering the original interface.
6. WEBSITE DEPLOYMENT & QR CODE
After implementing the prototype:

1. Build and test the application.
2. Deploy it to a public HTTPS hosting service, such as Vercel or Netlify.
3. Verify that the deployed website works on a mobile browser.
4. Provide the final public website URL.
5. Generate a high-resolution QR code pointing to that exact public URL.
6. Export the QR code as PNG and SVG.
7. Ensure it remains scannable when printed on an exhibition poster.
8. Test the QR destination.

Important: Never generate the final QR code using a localhost address, development preview URL, or imaginary domain.
If deployment requires account authorization or credentials, clearly explain the required step and complete everything else that can be done first.
7. FINAL DELIVERABLES
Provide:

* Fully functional interactive mobile web prototype
* Complete source code
* Five implemented and connected screens
* Branded animated opening sequence
* Working PDF export
* Email sharing functionality or clearly identified fallback
* Responsive mobile layout
* Public HTTPS website URL after successful deployment
* Scannable QR code as PNG and SVG
* Instructions for updating and redeploying the application

8. WORKFLOW
First, carefully inspect my uploaded designs and identify every visible UI element.
Then implement the interface with maximum visual fidelity.
Do not replace the original screens with new designs.
Build the interactions, navigation, animations, and export functionality.
Test the application, fix errors, deploy it, and generate the QR code.
Where a detail is unspecified, make a technically sound decision that preserves the original design.
Do not stop after producing a plan or describing how the application could be built. Implement and deliver the working prototype using the tools available to you.
FINAL DESIGN PRINCIPLE
TRACE IV is a seamless bridge between physical heritage and digital interaction.
The prototype should communicate precision, immersion, simplicity, and technological sophistication while preserving the existing application design exactly.
</pasted_content id="ea1d">
