import styled from 'react-emotion';

export const Stats = styled.div`
  display: inline-block;
  margin-left: 20px;
  text-align: center;
`;

export const Title = styled.div`
  font-size: 10px;
  color: #9e9e9e;
`;

export const Wrap = styled.nav`
  position: relative;
  color: #fff;
  background: #128265;
  width: 100%;
  height: 100%;
  z-index: 1;

  &::after {
    content: ' ';
    display: table;
    clear: both;
  }
`;

export const Pipe = styled.div`
  border-left: 1px solid #eee;
  display: inline-block;
  float: left;
  height: 22px;
  margin-top: 9px;
  margin-left: 2px;
  margin-right: 2px;
  padding: 0 2px;
  vertical-align: middle;
`;

export const TimesIcon = styled.div`
  float: left;
  display: inline-block;
  vertical-align: middle;
  margin-top: 8px;
  margin-left: 20px;
  width: 23px;
  height: 25px;
`;

export const TimesIconImage = styled.img`
  display: block;
  width: 23px;
  height: 25px;
`;

export const Settings = styled.i`
  font-size: 24px;
  padding-right: 20px;
  padding-top: 10px;
`;

export const NavTitle = styled.div`
  float: left;
  display: inline-block;
  vertical-align: middle;
  font-family: 'nyt-karnak-display-130124', georgia, 'times new roman', times, serif;
  font-size: 25px;
  font-weight: 400;
  padding-top: 12px;
  padding-bottom: 10px;
`;

export const NavInfo = styled.div`
  float: right;
  text-align: right;
  font-family: 'nyt-franklin', arial, serif;
  vertical-align: middle;
`;
