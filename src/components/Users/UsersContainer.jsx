import { connect } from 'react-redux';
import {
  followAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  unfollowAC,
} from '../../redux/users-reducer';
import Users from './Users';

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followAC(userId));
    },

    unfollow: (userId) => {
      dispatch(unfollowAC(userId));
    },

    setUsers: (users) => {
      dispatch(setUsersAC(users));
    },

    setCurrentPage: (currentPage) => {
      dispatch(setCurrentPageAC(currentPage));
    },

    setTotalUsersCount: (totalUsersCount) => {
      dispatch(setTotalUsersCountAC(totalUsersCount));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
