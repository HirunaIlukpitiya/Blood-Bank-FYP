import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)}>
      <FeatherIcon icon='arrow-left-circle' className='text-Ash'/>
    </button>
  );
}

export default BackButton;