import { createStyles, Theme } from '@material-ui/core/styles';

export default (theme: Theme) =>
  createStyles({
      icon: {
          width: 40,
          height: 40,
          margin: '12px 0',
          borderRadius: 8,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          '&:hover': {
            backgroundColor: '#333353',
          }
      },

      container: {
          height: '90vh',
          width: '70vw',
          padding: 20,
      },

      signin: {
        position: 'absolute',
        left: 10,
        bottom: 10,
        padding: 10,
        backgroundColor: '#FFFFFFC0',
        border: '1px solid gray',
        borderRadius: 4,
      },
  });