import { css } from 'emotion';
import styled from 'react-emotion';

export const ButtonWrap = styled.div`
  position: fixed;
  bottom: 20px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  z-index: 150;
`;

export const PlayButtons = styled.div`
  position: fixed;
  bottom: 50%;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  z-index: 150;
`;

export const Button = styled.a`
  font-family: 'nyt-franklin', arial, serif;
  display: inline-block;
  color: #fff;
  padding: 8px 20px;
  background: #128265;
  border-radius: 3px;
  margin: 10px;
  cursor: pointer;
  vertical-align: middle;
  font-size: 16px;
  line-height: 20px;

  &:hover {
    background: #036154;
  }
`;

export const playButton = css`
  background: #036154;
`;

export const Text = styled.span`
  display: inline-block;
  font-size: 16px;
  line-height: 20px;
  vertical-align: middle;
`;

export const Icon = styled.i`
  font-size: 16px;
  line-height: 20px;
  vertical-align: middle;
`;
