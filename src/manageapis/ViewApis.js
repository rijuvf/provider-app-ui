import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CardHeader from '@material-ui/core/CardHeader';
// eslint-disable-next-line no-unused-vars
import corejs from 'core-js/stable';
// eslint-disable-next-line no-unused-vars
import runtime from 'regenerator-runtime/runtime';

const useStyles = makeStyles(theme => ({
  root: {
    width: '50%',
    minheight: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10%',
  },
  tablecontainer: {
    width: '95%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(7),
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
  },
}));

export default function ViewApis() {
  // const idleTimerRef = useRef(null);
  const classes = useStyles();
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

  function createData(Name, Version) {
    return { Name, Version };
  }

  const rows = [
    createData('UpdateGuestUser', '10.2'),
    createData('Workbench', '1.0.2'),
    createData('Sales API', '1.0.3'),
  ];
  return (
    <>
      <Card className={classes.root} elevation={6}>
        <CardHeader
          titleTypographyProps={{ variant: 'h6' }}
          className={classes.textCenter}
          subheaderTypographyProps={{ variant: 'h8' }}
          title="Publish API"
        />
        <CardContent>
          <TableContainer className={classes.tablecontainer}>
            <Table aria-label="simple table">
              <TableHead className={classes.tablehead}>
                <TableRow>
                  <TableCell className={classes.tablecellheading}>
                    Name
                  </TableCell>
                  <TableCell
                    align="right"
                    className={classes.tablecellheading}
                  >
                    Version
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
                      {row.Name}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={classes.tablecell}
                    >
                      {row.Version}
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
