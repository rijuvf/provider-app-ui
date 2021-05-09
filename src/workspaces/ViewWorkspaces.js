import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
// import { createBrowserHistory } from 'history';
import Typography from '@material-ui/core/Typography';
import { useLoginContext } from '../login/loginContext';
import ListItem from '@material-ui/core/ListItem';
// eslint-disable-next-line import/named

const useStyles = makeStyles(theme => ({
  root: {
    width: '50%',
    minheight: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10%',
    backgroundColor: 'white',
  },
  tablecontainer: {
    width: '95%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(10),
    overflowX: 'auto',
  },
  tablehead: {
    border: '1px solid #bbb',
    borderRadius: '4px',
    backgroundColor: 'lightgrey',
  },
  tablecell: {
    border: '1px solid #bbb',
    borderRadius: '4px',
  },
  tablecellheading: {
    border: '1px solid #bbb',
    borderRadius: '4px',
    fontWeight: 'bold',
    lineHeight: '18px',
    fontStyle: 'normal',
    color: 'black',
  },
  button: {
    marginLeft: 'auto',
    backgroundColor: 'lightgrey',
    textDecoration: 'none',
    textTransform: 'none',
  },
  a: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

export default function ViewWorkspaces() {
  // const idleTimerRef = useRef(null);
  const classes = useStyles();
  const loginContext = useLoginContext();
  // const history = createBrowserHistory();
  const history = useHistory();
  // const browseHistory = createBrowserHistory();
  /* const onIdle = () => {
    // logout
    if (
      loginContext.isOnboarded === 'true' ||
      loginContext.email != null
    ) {
      loginContext.logout();
    }

    // eslint-disable-next-line no-console
    console.log('User Is Idle');
  }; */

  function createData(Workspace, Owner, Action) {
    return { Workspace, Owner, Action };
  }

  function handleOnclick(e, data) {
    history.push('/apis');
    // browseHistory.push('/apis');
    loginContext.setWorkspaces(data);
  }
  const rows = [
    createData('API Management-Dev', 'Dervis Avdic', 'Join'),
    createData('API Management-Stage', 'Riju Francis', 'Join'),
    createData('API Management-Prod', 'Aleem', 'Join'),
  ];
  return (
    <>
      <Card className={classes.root} elevation={8}>
        <CardContent>
          <CardActions>
            <Button variant="contained" className={classes.button}>
              <Typography variant="h8"> Create Workspace</Typography>
            </Button>
          </CardActions>
          <TableContainer className={classes.tablecontainer}>
            <Table aria-label="simple table">
              <TableHead className={classes.tablehead}>
                <TableRow>
                  <TableCell className={classes.tablecellheading}>
                    Workspace
                  </TableCell>
                  <TableCell
                    align="right"
                    className={classes.tablecellheading}
                  >
                    Owner
                  </TableCell>
                  <TableCell
                    align="right"
                    className={classes.tablecellheading}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.tablecell}
                    >
                      <Typography variant="h8">
                        {row.Workspace}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      className={classes.tablecell}
                    >
                      {row.Owner}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={classes.tablecell}
                    >
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        href="#"
                        className={classes.a}
                        onClick={e => handleOnclick(e, row.Workspace)}
                      >
                        {row.Action}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
}

module.hot.accept();
