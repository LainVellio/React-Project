import React from 'react';
import cl from './Sidebar.module.css';
import userPhoto from '../../assets/images/1.png';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ friends, getUserProfile }) => {
  const sidebarElements = friends.map((friend) => {
    const onUserProfile = () => getUserProfile(friend.id);
    return (
      <NavLink
        key={friend.id}
        to={`/profile/${friend.id}`}
        onClick={onUserProfile}
      >
        <div className={cl.sidebarFriend}>
          <img
            className={cl.avatar}
            src={friend.photos.small || userPhoto}
            alt="ava"
          />
          <div className={cl.friendName}>{friend.name}</div>
        </div>
      </NavLink>
    );
  });
  return (
    <div
      className={`${cl.sidebar} ${'block'} ${
        friends.length === 0 ? cl.hidden : ''
      }`}
    >
      <div className={cl.heading}>Friends</div>
      {sidebarElements}
    </div>
  );
};

export default Sidebar;
