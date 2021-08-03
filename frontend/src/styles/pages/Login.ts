import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`

export const Background = styled.div`
  position: absolute;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background-color: #e5e5f7;
  opacity: 0.05;
  background: linear-gradient(135deg, #32323255 25%, transparent 25%) -10px 0/
      20px 20px,
    linear-gradient(225deg, #323232 25%, transparent 25%) -10px 0/ 20px 20px,
    linear-gradient(315deg, #32323255 25%, transparent 25%) 0px 0/ 20px 20px,
    linear-gradient(45deg, #323232 25%, #e5e5f7 25%) 0px 0/ 20px 20px;
`
