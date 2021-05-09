import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PolicyIcon from '@material-ui/icons/Policy';
import GroupAddSharpIcon from '@material-ui/icons/GroupAddSharp';
import FilterDramaOutlinedIcon from '@material-ui/icons/FilterDramaOutlined';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Tooltip from '@material-ui/core/Tooltip';
import { AccountCircle } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useHistory } from 'react-router-dom';
import { useLoginContext } from '../login/loginContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: '0px 0px 0px 0px',
  },
  growNoPadding: {
    flexGrow: 1,
    padding: '0px 0px 0px 0px',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  workspace: {
    marginLeft: theme.spacing(10),
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': {
      backgroundColor: '#d3d3d3',
      color: '#0058A3',
      borderRadius: '3px',
    },
  },
  linkClassCustomStyle: {
    '&:focus, &.linkClass': { outline: 'none' },
  },
  toolIconsRight: {
    marginLeft: 'auto',
  },
  box: {
    marginRight: theme.spacing(13),
  },
  MuiDrawer: {
    backgroundColor: '#0058a3',
    color: 'white',
    padding: '0px 0px 0px 0px',
  },
  icon: {
    color: 'white',
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const loginContext = useLoginContext();
  const history = useHistory();
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    loginContext.login();
  }, []);
  function gettingStarted() {
    history.push('/');
  }
  const handleRedirect = () => {
    history.push('/');
    setAnchorEl2(null);
  };
  const handleClose = () => {
    setAnchorEl2(null);
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          'Getting Started',
          'API Validation',
          'User Management',
          'Manage API',
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon className={classes.icon}>
              {index === 0 ? <MailIcon /> : <span> </span>}

              {index === 1 ? <PolicyIcon /> : <span> </span>}

              {index === 2 ? <GroupAddSharpIcon /> : <span> </span>}

              {index === 3 ? (
                <FilterDramaOutlinedIcon />
              ) : (
                <span> </span>
              )}
            </ListItemIcon>
            <Typography variant="h8">
              <ListItemText primary={text} onClick={gettingStarted} />
            </Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <>
      <React.Fragment key="top">
        <Drawer
          anchor="left"
          open={state.left}
          onClose={toggleDrawer('left', false)}
          classes={{ paper: classes.MuiDrawer }}
        >
          {list('left')}
        </Drawer>
      </React.Fragment>

      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon onClick={toggleDrawer('left', true)} />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <strong> Hantera</strong>
            </Typography>
            <Typography
              variant="h8"
              className={classes.workspace}
              id="workspace_id"
            >
              {loginContext.name}
            </Typography>
            <span
              className={classes.toolIconsRight}
              id="toolIconsRight"
            >
              {loginContext.email !== null ? (
                <Tooltip title="Profile">
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={e => setAnchorEl2(e.currentTarget)}
                    color="inherit"
                  >
                    <AccountCircle id="profile" />
                  </IconButton>
                </Tooltip>
              ) : (
                <span />
              )}

              <Menu
                id="menu-appbar-question"
                anchorEl={anchorEl2}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl2)}
                onClose={handleClose}
              >
                {loginContext.isOnboarded === 'true' ||
                loginContext.email != null ? (
                  <div>
                    <MenuItem onClick={handleRedirect}>
                      {loginContext.userName}
                    </MenuItem>

                    <MenuItem onClick={loginContext.logout}>
                      Log out
                    </MenuItem>
                  </div>
                ) : (
                  <MenuItem onClick={loginContext.login}>
                    Log in
                  </MenuItem>
                )}
              </Menu>
            </span>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

module.hot.accept();
export default NavBar;
