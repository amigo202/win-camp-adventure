
import React from 'react';
import { isGuide, isAdmin, getCurrentUser } from '../utils/authUtils';

const GuideNavigation: React.FC = () => {
  const isUserGuide = isGuide();
  const isUserAdmin = isAdmin();
  const user = getCurrentUser();

  if (!isUserGuide && !isUserAdmin) {
    return null;
  }

  return null; // We're removing this component's visual representation
};

export default GuideNavigation;
