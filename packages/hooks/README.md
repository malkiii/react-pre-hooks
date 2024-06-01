<div align=center>

<img alt="Logo" src="https://raw.githubusercontent.com/malkiii/react-pre-hooks/master/docs/public/logo.svg" width="200"><br/>

# react-pre-hooks

Simplify and clean up your components with this react hooks collection.

<a href="https://www.npmjs.com/package/react-pre-hooks"><img alt="version" src="https://img.shields.io/npm/v/react-pre-hooks?label=latest%20version&color=0086E0" /></a>
<a href="https://malkiii.github.io/react-pre-hooks"><img alt="Documentation" src="https://img.shields.io/badge/documentation-website-0086E0" /></a>
<a href="https://www.npmjs.com/package/react-pre-hooks"><img alt="Downloads" src="https://img.shields.io/npm/dm/react-pre-hooks?color=0086E0" /></a>
<a href="https://github.com/malkiii/react-pre-hooks/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/github/license/malkiii/react-pre-hooks?color=0086E0" /></a>
<a href="https://github.com/malkiii/react-pre-hooks/actions/workflows/ci.yml"><img alt="Workflow" src="https://github.com/malkiii/react-pre-hooks/actions/workflows/ci.yml/badge.svg" /></a>

</div><br/>

## List Of Hooks

<!-- run pnpm generate:readme -->
<table id="hooks" align=center>
  <tr align=left><th>Name</th><th>Description</th></tr>
  <tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useAnimationFrame">useAnimationFrame</a></td><td><p>Handle the <a href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame">requestAnimationFrame</a>
API to call a function on every frame render.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useArray">useArray</a></td><td><p>Use an array state with some common and simple array methods.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useAsyncCallback">useAsyncCallback</a></td><td><p>Handle the execution of an async function with return data, error, and pending states.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useAudioAnalyser">useAudioAnalyser</a></td><td><p>Use the <a href="https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode">AnalyserNode</a> API to analyze audio data.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useBoolean">useBoolean</a></td><td><p>Toggle between <code>true</code> and <code>false</code> using a boolean state.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useClickAway">useClickAway</a></td><td><p>Execute a function when the user clicks outside a target element.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useClipboard">useClipboard</a></td><td><p>Copy and paste text using the clipboard with a <strong>copied</strong> state.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useClock">useClock</a></td><td><p>Get the current time with an updated Date state.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useCounter">useCounter</a></td><td><p>Use simple counter methods to update a number state.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useDebouncedState">useDebouncedState</a></td><td><p>Update a state after a specified delay.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useDragAndDrop">useDragAndDrop</a></td><td><p>Handle the user <strong>drag</strong> actions on a container element.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useEventListener">useEventListener</a></td><td><p>Add an event listener with one or multiple events to an HTML element, <code>window</code>, or <code>document</code> object.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useFileDropArea">useFileDropArea</a></td><td><p>Handle the user file dropping and uploading to an area element.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useFormData">useFormData</a></td><td><p>Handle your form data using some methods with
the <a href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">FormData</a> API.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useFullscreen">useFullscreen</a></td><td><p>Toggle the fullscreen mode on a target element.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useGamepad">useGamepad</a></td><td><p>Handle the user gamepad connections and changes.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useGeolocation">useGeolocation</a></td><td><p>Track the current geolocation of the client
using the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation">Geolocation</a> API.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useGridLayout">useGridLayout</a></td><td><p>Track the number of rows and columns of an element with a <strong>grid</strong> layout.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useInView">useInView</a></td><td><p>Track the visibility of a target element using <a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useIntersectionObserver">useIntersectionObserver</a> hook.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useIntersectionObserver">useIntersectionObserver</a></td><td><p>Handle the <a href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver">IntersectionObserver</a> API.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useInterval">useInterval</a></td><td><p>Use a <a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval">setInterval</a>
state with some methods to control it.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useIsomorphicEffect">useIsomorphicEffect</a></td><td><p>A replacement for <a href="https://react.dev/reference/react/useLayoutEffect">useLayoutEffect</a> that works on the browser and the server.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useKeyboard">useKeyboard</a></td><td><p>Bind any keyboard <strong>keys</strong> or <strong>hotkeys</strong> with handlers in a very simple way.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useLocalStorage">useLocalStorage</a></td><td><p>Get and Set a specific value in the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">local storage</a>.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useMap">useMap</a></td><td><p>Use a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map">Map</a>
state with some common and simple map methods.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useMediaDevices">useMediaDevices</a></td><td><p>Use the user media devices (<strong>camera</strong> and <strong>microphone</strong>) with
their <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaStream">MediaStream</a> object.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useMediaQuery">useMediaQuery</a></td><td><p>Track the user media query changes using a boolean state.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useMousePosition">useMousePosition</a></td><td><p>Track the user&#39;s mouse cursor position on the window or a target element.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useMutationObserver">useMutationObserver</a></td><td><p>Handle the <a href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver">MutationObserver</a>
to track changes being made to the DOM tree.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useNetworkState">useNetworkState</a></td><td><p>Handle the <a href="https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation">NetworkInformation</a> API
and the user network connection changes.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useOrientation">useOrientation</a></td><td><p>Track the device&#39;s orientation state and its changes.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/usePageVisibility">usePageVisibility</a></td><td><p>Check if the current tab is visible or hidden to the user.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/usePointers">usePointers</a></td><td><p>Handle all the user <a href="https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events">pointer events</a> at once.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/usePreferredLanguage">usePreferredLanguage</a></td><td><p>Get the user&#39;s preferred language from the browser.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useRect">useRect</a></td><td><p>Track the bounding <a href="https://developer.mozilla.org/en-US/docs/Web/API/DOMRect">DOMRect</a> of a target element.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useResizeObserver">useResizeObserver</a></td><td><p>Handle the <a href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver">ResizeObserver</a> API.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useScreenCapture">useScreenCapture</a></td><td><p>Use the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API">Screen Capture</a> API
to capture the screen, window, or browser tab.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useScrollDirection">useScrollDirection</a></td><td><p>Detect the user scroll direction on the window or a target element.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useScrollPosition">useScrollPosition</a></td><td><p>Track the scroll <strong>position</strong> or <strong>progress</strong> of the window or a target element.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useScrollThreshold">useScrollThreshold</a></td><td><p>Check if the user has scrolled past a certain threshold using a given offset or handler.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useSelection">useSelection</a></td><td><p>Get the current selected text with its position on the window or a target element.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useSessionStorage">useSessionStorage</a></td><td><p>Get and Set a specific value
in the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage">session storage</a>.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useSet">useSet</a></td><td><p>Use a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set">Set</a>
state with some common and simple set methods.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useSwiping">useSwiping</a></td><td><p>Handle the user <strong>swipe</strong> actions on a container element.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useTimeout">useTimeout</a></td><td><p>Use a <a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout">setTimeout</a>
state with some methods to control it.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useToggle">useToggle</a></td><td><p>Toggle a state between a given array of values.</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useViewport">useViewport</a></td><td><p>Track the current screen viewport (width and height).</p></td></tr>
<tr><td><a href="https://malkiii.github.io/react-pre-hooks/docs/hooks/useWorker">useWorker</a></td><td><p>Use the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Worker">Worker</a> API to run a script in the background.</p></td></tr>
</table>

## Contributing

Please read <a href="https://github.com/malkiii/react-pre-hooks/blob/master/.github/CONTRIBUTING.md">CONTRIBUTING.md</a> for details on our code of conduct, and the process for submitting pull requests.
