import { makeStyles } from '@mui/styles'
import banner from 'assets/img/marriage-nature.jpeg'

export default makeStyles((theme) => ({
  banner: {
    backgroundImage: `url(${banner})`,
    backgroundSize: 'cover',
    backgroundPositionX: 'center',
    height: '100vh',
    minHeight: '100%',
    width: '60%',
    position: 'fixed',
  },
  content: {
    width: "40%",
    backgroundColor: theme.palette.white.main,
    position: 'absolute',
    zIndex: 100,
    right: 0,
    top: 0,
  }
}))