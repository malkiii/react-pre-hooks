<div align=center>

<img alt="Logo" src="https://raw.githubusercontent.com/malkiii/react-pre-hooks/master/docs/public/logo.svg" width="200"><br/>

# react-pre-hooks

Simplify and clean up your components with this react hooks collection.

<a href="https://www.npmjs.com/package/react-pre-hooks"><img alt="npm" src="https://img.shields.io/npm/v/react-pre-hooks?label=latest%20version&logo=npm" /></a>
<a href="https://github.com/malkiii/react-pre-hooks/actions/workflows/release.yml"><img alt="Workflow" src="https://github.com/malkiii/react-pre-hooks/actions/workflows/ci.yml/badge.svg" /></a>
<a href="https://malkiii.github.io/react-pre-hooks"><img alt="Documentation" src="https://img.shields.io/badge/-Documentation-0086E0" /></a>
<a href="https://github.com/malkiii/react-pre-hooks/blob/master/.github/CONTRIBUTING.md"><img alt="Contribution" src="https://img.shields.io/badge/-Contribution-8957e5" /></a>
<a href="https://github.com/malkiii/react-pre-hooks/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/github/license/malkiii/react-pre-hooks" /></a>

</div><br/>

## List Of Hooks

<!-- pnpm generate:readme -->
<table align=center>
<tr align=left><th>Name</th><th>Description</th></tr><tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useAnimationFrame">useAnimationFrame</a></td><td><p>Handle the <a href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame">requestAnimationFrame</a> method of the <code>window</code> object.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useArray">useArray</a></td><td><p>This hook returns an array with with some common and useful array methods making the code minimal and maintainable.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useAsync">useAsync</a></td><td><p>This hook simplifies the execution of an <code>async</code> function by returning its states and results.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useAudioAnalyser">useAudioAnalyser</a></td><td><p>This hook uses and audio analyser to create and an <strong>audio visualizer</strong> from a media element (audio/video) or the user microphone.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useBeforeUnload">useBeforeUnload</a></td><td><p>Stop the user before closing the window using this hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useBoolean">useBoolean</a></td><td><p>A hook that toggles between <code>true</code> and <code>false</code>.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useClickAway">useClickAway</a></td><td><p>Execute a function when the user clicks outside a target element.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useClient">useClient</a></td><td><p>A solution to fix the <a href="https://nextjs.org/docs/messages/react-hydration-error">hydration error</a> in <a href="https://nextjs.org/docs#what-is-nextjs">Next.js</a>.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useClipboard">useClipboard</a></td><td><p>Copy to the clipboard and return a temporary <code>copied</code> state.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useClock">useClock</a></td><td><p>This hook returns the current date time every second or a <code>timeout</code> value.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useContextMenu">useContextMenu</a></td><td><p>Handle the user right clicks on a target element with this hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useCounter">useCounter</a></td><td><p>Use a simple counter with <code>min</code> and <code>max</code> values, and some methods to minimalize the component.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useDebouncedState">useDebouncedState</a></td><td><p>This hook returns a state that Updates its value after a specific delay to handle fast updated values.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useDevice">useDevice</a></td><td><p>Detect the device type with some boolean values.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useDragAndDrop">useDragAndDrop</a></td><td><p>You can handle the user <strong>drag</strong> actions on a container element using this hook, and it can also handle the mobile touches.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useEasing">useEasing</a></td><td><p>Change a value from a <strong>start</strong> to an <strong>end</strong> value using an <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function">animation timing function</a>.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useEventListener">useEventListener</a></td><td><p>Add one or multiple event listeners to a specific target element, <code>window</code>, or <code>document</code> object, if you&#39;re using <a href="https://www.typescriptlang.org/">typescript</a> you will get <strong>auto-completion</strong> for the event listeners.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useFetch">useFetch</a></td><td><p>Fetch data with a URL and search parameters using <a href="./useAsync">useAsync</a> hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useFileDropArea">useFileDropArea</a></td><td><p>Build a <strong>file drop area</strong> component easily with this hook, it handles file dropping to a label of a file input.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useFullscreen">useFullscreen</a></td><td><p>Toggle the fullscreen mode on a target element using this hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useGeolocation">useGeolocation</a></td><td><p>Track the current geolocation of the client using this hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useGridLayout">useGridLayout</a></td><td><p>Track the number of <strong>rows</strong> and <strong>columns</strong> of a grid layout using this hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useHash">useHash</a></td><td><p>Track and update the window location <a href="https://developer.mozilla.org/en-US/docs/Web/API/Location/hash">hash</a> value using this hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useHover">useHover</a></td><td><p>This hook returns whether the target element is hovered or not, and it can use a <code>delay</code> value as well for both hover and unhover events.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useImageLoader">useImageLoader</a></td><td><p>Use this hook to load an image in the <strong>background</strong> using its URL, and returns its loading state.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useInView">useInView</a></td><td><p>This hook uses <a href="./useIntersectionObserver">useIntersectionObserver</a> hook and returns the intersecting state.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useIntersectionObserver">useIntersectionObserver</a></td><td><p>Handle the <a href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver">IntersectionObserver</a> using this hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useInterval">useInterval</a></td><td><p>This hook makes <a href="https://developer.mozilla.org/en-US/docs/Web/API/setInterval"><code>setInterval</code></a> easy to use and control with some useful methods.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useIsomorphicEffect">useIsomorphicEffect</a></td><td><p>This hook is a replacement for <a href="https://react.dev/reference/react/useEffect">useEffect</a> that works in both browser and server.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useKeyboard">useKeyboard</a></td><td><p>Bind any keyboard <strong><code>keys</code></strong> or <strong><code>hotkeys</code></strong> with handlers in a very simple way.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useLocalStorage">useLocalStorage</a></td><td><p>Get and Set a specific value in the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">local storage</a>.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useMap">useMap</a></td><td><p>This hook returns a map object with with its props and methods to make the code minimal and maintainable.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useMediaDevices">useMediaDevices</a></td><td><p>This hook uses the user media devices (<strong>camera</strong> and <strong>microphone</strong>) and returns their states and controls as well as their stream object.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useMediaQuery">useMediaQuery</a></td><td><p>Track the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia">matchMedia</a> changes of a media query using this hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useMediaRecorder">useMediaRecorder</a></td><td><p>Generate a recorded (video/audio) from a media <strong>stream</strong> object using the media recorder with its state and controller methods.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useMousePosition">useMousePosition</a></td><td><p>This hook tracks the mouse cursor <code>position</code> of a target element.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useMutationObserver">useMutationObserver</a></td><td><p>Handles the <a href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver">MutationObserver</a> and tracks changes being made to the DOM tree.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useNetworkState">useNetworkState</a></td><td><p>This hook can track the user connection changes and return whether is <strong>online</strong> or <strong>offline</strong> with some of the user network informations.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useOrientation">useOrientation</a></td><td><p>Track the screen orientation type using this hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/usePageVisibility">usePageVisibility</a></td><td><p>Check if the tab contents is visible or hidden using this hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/usePointerLock">usePointerLock</a></td><td><p>Toggle the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API">pointer lock</a> mode on a target element using this hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/usePointers">usePointers</a></td><td><p>Handle all the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events">pointer events</a> at once using this hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/usePreferredLanguage">usePreferredLanguage</a></td><td><p>Track the current user preferred language using this hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useResizeObserver">useResizeObserver</a></td><td><p>Handle the <a href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver">ResizeObserver</a> using this hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useScreenCapture">useScreenCapture</a></td><td><p>This hook uses the user <strong>screen capture</strong> and returns its states and controls as well as the media stream object.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useScrollDirection">useScrollDirection</a></td><td><p>This hook detects the scroll <strong>direction</strong> of the window or a target element.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useScrollPosition">useScrollPosition</a></td><td><p>This hook tracks the scroll <code>position</code> and <code>progress</code> of a target element.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useScrollThreshold">useScrollThreshold</a></td><td><p>Returns a boolean state that indicates if the user has <strong>passed</strong> a specified scroll threshold.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useSelection">useSelection</a></td><td><p>This hook returns the current selected text on the window or a specific element, and other things.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useSessionStorage">useSessionStorage</a></td><td><p>Get and Set a specific value in the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage">session storage</a>.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useSet">useSet</a></td><td><p>This hook returns an set with with some common and useful set methods making the code minimal and maintainable.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useSize">useSize</a></td><td><p>Track the element size easily using <a href="./useResizeObserver">useResizeObserver</a>.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useSpeech">useSpeech</a></td><td><p>This hook uses a text speaker with available voices as well as its state and controller methods.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useStateHistory">useStateHistory</a></td><td><p>This hook stores a specific number of the previous state values and uses a <strong>pointer</strong> to switch between them.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useStateStatus">useStateStatus</a></td><td><p>This hook returns the state and its current <strong>status</strong> using a state handler.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useSwiping">useSwiping</a></td><td><p>You can handle the user <strong>swipe</strong> actions using this hook, and it can also handle the mouse swipes.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useTimeout">useTimeout</a></td><td><p>This hook makes <a href="https://developer.mozilla.org/en-US/docs/Web/API/setTimeout"><code>setTimeout</code></a> easy to use and control with some useful methods.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useTimer">useTimer</a></td><td><p>You can create a <strong>timer</strong> or a <strong>countdown</strong> with many options using this hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useToggle">useToggle</a></td><td><p>Toggles a state between an array of values.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useUnmount">useUnmount</a></td><td><p>Execute a callback function <strong>before</strong> the component is unmounted (leaves the DOM).</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/guide/useViewport">useViewport</a></td><td><p>Track the screen <strong>viewport</strong> (screen width and height).</p></td></tr>
</table>

## Contributing

Please read <a href="https://github.com/malkiii/react-pre-hooks/blob/master/.github/CONTRIBUTING.md">CONTRIBUTING.md</a> for details on our code of conduct, and the process for submitting pull requests.
