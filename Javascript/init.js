import { css } from 'linaria'
import waveAnalyzer from './analyze/wave'
import sphereVisualizer from './visualize/sphere'

export default () => {
  const startRoot = document.createElement('div')
  startRoot.className = css`
    transition: filter 0.3s, opacity 0.3s;
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    overflow: hidden;
    display: grid;
    grid-template-rows: 20% 50% 30%;
    grid-template-columns: 70% 30%;
    grid-template-areas:
      ". ."
      "text-root start"
      "mobile-start mobile-start";
  `
  const rootDarkClass = css`
    filter: saturate(0.6);
    opacity: 0.2;
    pointer-events: none;
  `
  const background = document.createElement('img')
  background.src = '/img/background.svg'
  background.className = css`
    position: absolute;
    width: 100vw;
    height: 100vh;
    filter: brightness(0.7);
  `
  startRoot.appendChild(background)
  const textRoot = document.createElement('div')
  textRoot.className = css`
    grid-area: text-root;
    margin-left: 30px;
    z-index: 1;
    user-select: none;
  `
  const project = document.createElement('a')
  project.textContent = 'Project Ignite'
  project.href = 'https://projectignitecmu.org'
  project.target = '_blank'
  project.className = css`
    color: #bbb;
    text-decoration: none;
    &:hover {
      border-bottom: solid 2px #bbb;
    }
    font-size: calc(15px + 1.5vw);
    margin-left: 5px;
  `
  textRoot.appendChild(project)
  const title = document.createElement('h1')
  title.className = css`
    margin: auto 0;
    font-size: calc(20px + 8vw);
    opacity: 0.6;
    cursor: initial;
  `
  title.innerText = 'Music\nVisualization'
  textRoot.appendChild(title)
  startRoot.appendChild(textRoot)
  const startPad = document.createElement('div')
  startPad.className = css`
    grid-area: start;
    z-index: 1;
  `
  startRoot.appendChild(startPad)
  const start = document.createElement('div')
  start.className = css`
    grid-area: start;
    z-index: 1;
    margin: auto;

    @media (max-width: 1200px) {
      grid-area: mobile-start;
      margin: 0 auto;
    }
  `
  const startButton = document.createElement('button')
  startButton.innerText = 'START'
  startButton.className = css`
    cursor: pointer;
    font-size: 20px;
    border: 0;
    border-radius: 3px;
    height: 70px;
    width: calc(100vw - 30px);
    max-width: 300px;
    background: #fff;
    opacity: 0.7;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s, transform 0.3s;
    &:hover {
      opacity: 1;
      transform: scale(1.2);
    }
  `
  const startImage = document.createElement('img')
  startImage.src = '/img/start.svg'
  startButton.appendChild(startImage)
  startButton.addEventListener('click', async () => {
    startRoot.classList.add(rootDarkClass)
    let mediaStream = null
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch (e) {}
    startRoot.classList.remove(rootDarkClass)
    if (mediaStream === null) {
      return
    }
    document.body.removeChild(startRoot)
    const canvasRoot = document.createElement('div')
    canvasRoot.className = css`
      position: absolute;
      top: 0;
      left: 0;
    `
    document.body.appendChild(canvasRoot)
    sphereVisualizer({
      canvasRoot,
      analyzer: waveAnalyzer({ mediaStream }),
    })
  })
  start.appendChild(startButton)
  startRoot.appendChild(start)
  document.body.appendChild(startRoot)
}
