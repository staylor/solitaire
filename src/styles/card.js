export default {
  card: {
    borderRadius: 10,
    marginTop: -75,
    width: 75,
    height: 105,
    userSelect: 'none',
    position: 'relative',
    background: '#fff',
    border: '5px solid #fafafa',
    boxShadow: '4px 4px 2px rgba(0, 0, 0, 0.4)',
    zIndex: 1,
    ':first-child': {
      marginTop: 0,
    },
  },
  back: {
    background: '#2196f3',
  },
  backImage: {
    position: 'absolute',
    top: 23,
    left: 15,
    height: 60,
    opacity: 0.2,
  },
  front: {
    cursor: 'grab',
  },
  red: {
    color: '#fc471d',
  },
  black: {
    color: '#333',
  },
  suit: {
    position: 'absolute',
    top: 5,
    right: 5,
    fontWeight: 800,
    fontSize: 24,
  },
  suitImage: {
    width: 26,
    marginTop: 3,
  },
  center: {
    position: 'absolute',
    fontWeight: 800,
    fontSize: 48,
    textAlign: 'center',
    top: 40,
    left: 0,
    width: '100%',
  },
  centerImage: {
    width: 48,
  },
  value: {
    position: 'absolute',
    top: 5,
    fontSize: 24,
    fontWeight: 800,
    left: 5,
    fontFamily: '"nyt-franklin", arial, serif',
  },
};
