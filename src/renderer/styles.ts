import { createStyles, Theme } from '@material-ui/core/styles';

export default (theme: Theme) =>
  createStyles({
      icon: {
          width: 40,
          height: 40,
          margin: '12px 0',
          borderRadius: 8,
          color: 'white',

          '&:hover': {
            backgroundColor: '#333353',
          }
      },

      container: {
          height: 500,
          padding: 20,
      }
  });