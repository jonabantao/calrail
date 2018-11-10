import { createStyles, Theme } from '@material-ui/core/styles';

const styles = ({ spacing }: Theme) => createStyles({
  button: {
    margin: spacing.unit,
  },
  iconRight: {
    marginRight: spacing.unit,
  },
  root: {
    marginTop: spacing.unit * 3,
    overflowX: 'auto',
    width: '100%',
  },
  table: {
    minWidth: 700,
  },
});

export default styles;